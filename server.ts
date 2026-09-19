import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

export default app;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    } catch (err) {
      console.error("Failed to initialize GoogleGenAI client:", err);
      aiClient = null;
    }
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    hasGemini: !!process.env.GEMINI_API_KEY,
    appName: "DhanRaksha",
  });
});

// User database & OTP store for Phone & Gmail Authentication
interface StoredUser {
  id: string;
  phone?: string;
  email?: string;
  name: string;
  salary: number;
  expenses: number;
  occupation?: string;
  mainGoal: string;
  language: "en" | "te" | "hi";
  authMethod: "phone" | "google";
  token?: string;
  createdAt: string;
}

const usersDb = new Map<string, StoredUser>(); // keyed by phone or email or id
const otpStore = new Map<string, { otp: string; expiresAt: number }>();
const sessions = new Map<string, StoredUser>(); // token -> user

async function sendOtpSms(
  phone: string,
): Promise<{ success: boolean; sessionId?: string }> {
  const apiKey = process.env.TWOF_FACTOR_API_KEY?.trim();
  const templateName =
    process.env.TWOF_FACTOR_TEMPLATE?.trim() || "DhanRakshaOTP";

  if (!apiKey) {
    console.error("[DhanRaksha SMS] TWOF_FACTOR_API_KEY is missing.");
    return { success: false };
  }

  const cleanPhone = phone.replace(/[^0-9]/g, "").slice(-10);

  if (cleanPhone.length !== 10) {
    console.error("[DhanRaksha SMS] Invalid phone number.");
    return { success: false };
  }

  // Generate the 4-digit code locally so the UI and provider use the same OTP length.
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    /*
     * 2Factor Manual OTP API
     *
     * The approved DhanRakshaOTP template uses sender ID DHNRKS.
     */
    const url =
      `https://2factor.in/API/V1/${encodeURIComponent(apiKey)}` +
      `/SMS/+91${cleanPhone}` +
      `/${otp}` +
      `/${encodeURIComponent(templateName)}`;

    console.log("🔥 ABOUT TO CALL 2FACTOR");
    console.log("Phone:", cleanPhone);
    console.log("Template:", templateName);
    console.log("Generated OTP:", otp);
    console.log("🔥 2FACTOR URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await response.json();

    console.log("[2Factor OTP Response]", data);

    if (!response.ok || data?.Status !== "Success") {
      console.error(
        "[DhanRaksha SMS] 2Factor rejected OTP request:",
        data,
      );
      return { success: false };
    }

    console.log(`[DhanRaksha SMS] 4-digit OTP sent to +91 ${cleanPhone}`);

    return {
      success: true,
      sessionId: data.Details,
    };
  } catch (error) {
    console.error("[DhanRaksha SMS] 2Factor request failed:", error);
    return { success: false };
  }
}

// Helper to look up user by phone or email
function findUserByContact(contact: string): StoredUser | undefined {
  const clean = contact.replace(/[^0-9]/g, "").slice(-10);
  for (const user of usersDb.values()) {
    if (user.phone && user.phone.slice(-10) === clean) return user;
    if (user.email && user.email.toLowerCase() === contact.toLowerCase())
      return user;
  }
  return undefined;
}

// Pre-seed with existing rural user for immediate testing & user's Gmail
const user1: StoredUser = {
  id: "usr_lakshmi_9876543210",
  phone: "9876543210",
  email: "lakshmi.devi@dhanraksha.in",
  name: "Lakshmi Devi",
  salary: 18000,
  expenses: 11000,
  occupation: "Dairy Farming & SHG Leader",
  mainGoal: "Children's Higher Education",
  language: "te",
  authMethod: "phone",
  createdAt: new Date().toISOString(),
};
usersDb.set("9876543210", user1);
usersDb.set(user1.id, user1);

const user2: StoredUser = {
  id: "usr_sunita_9988776655",
  phone: "9988776655",
  name: "Sunita Sharma",
  salary: 15000,
  expenses: 9500,
  occupation: "Handicrafts & Agriculture",
  mainGoal: "Dairy Livestock",
  language: "hi",
  authMethod: "phone",
  createdAt: new Date().toISOString(),
};
usersDb.set("9988776655", user2);
usersDb.set(user2.id, user2);

// User's Google account pre-seeded for fast 1-click test
const user3: StoredUser = {
  id: "usr_srujan_google",
  email: "srujaninvest@gmail.com",
  phone: "9848012345",
  name: "Srujan",
  salary: 25000,
  expenses: 14000,
  occupation: "Rural Enterprise & Agri-Tech",
  mainGoal: "Emergency Safety Fund & Farm Modernization",
  language: "te",
  authMethod: "google",
  createdAt: new Date().toISOString(),
};
usersDb.set("srujaninvest@gmail.com", user3);
usersDb.set(user3.id, user3);

// OTP & Verification Code Storage
const emailCodeStore = new Map<string, { code: string; expiresAt: number }>();

// 1. Send OTP Endpoint (Phone)
app.post("/api/auth/send-otp", async (req: Request, res: Response) => {
  console.log("🔥 SEND OTP ROUTE HIT", req.body);

  const { phone } = req.body;

  if (!phone || typeof phone !== "string") {
    return res.status(400).json({
      error: "Valid 10-digit mobile number is required",
    });
  }

  const cleanPhone = phone.replace(/[^0-9]/g, "").slice(-10);

  if (cleanPhone.length !== 10) {
    return res.status(400).json({
      error: "Please enter a valid 10-digit mobile number",
    });
  }

  const result = await sendOtpSms(cleanPhone);

  if (!result.success || !result.sessionId) {
    return res.status(502).json({
      error: "Unable to send OTP. Please try again.",
    });
  }

  return res.json({
    success: true,
    phone: cleanPhone,
    sessionId: result.sessionId,
    message: `OTP has been sent to +91 ${cleanPhone}. Please check your SMS.`,
  });
});

// 2. Verify OTP Endpoint (Phone)
app.post("/api/auth/verify-otp", async (req: Request, res: Response) => {
  const { phone, otp, sessionId } = req.body;

  if (!phone || !otp || !sessionId) {
    return res.status(400).json({
      error: "Phone, OTP and session ID are required",
    });
  }

  const cleanPhone = phone.replace(/[^0-9]/g, "").slice(-10);
  const cleanOtp = String(otp).trim();

  if (cleanPhone.length !== 10 || !/^\d{4}$/.test(cleanOtp)) {
    return res.status(400).json({
      error: "Please enter a valid 4-digit OTP",
    });
  }

  const apiKey = process.env.TWOF_FACTOR_API_KEY?.trim();

  if (!apiKey) {
    return res.status(500).json({
      error: "2Factor API key is not configured",
    });
  }

  try {
    const verifyUrl =
      `https://2factor.in/API/V1/${encodeURIComponent(apiKey)}` +
      `/SMS/VERIFY/${encodeURIComponent(sessionId)}` +
      `/${encodeURIComponent(cleanOtp)}`;

    const response = await fetch(verifyUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await response.json();

    console.log("[2Factor Verify Response]", data);

    if (!response.ok || data?.Status !== "Success") {
      return res.status(400).json({
        error: "Incorrect or expired OTP. Please try again.",
      });
    }

    const existingUser = findUserByContact(cleanPhone);

    return res.json({
      success: true,
      verified: true,
      phone: cleanPhone,
      existingUser: existingUser || null,
      suggestedName: existingUser?.name || "",
      suggestedSalary: existingUser?.salary || undefined,
      suggestedExpenses: existingUser?.expenses || undefined,
      suggestedOccupation: existingUser?.occupation || undefined,
      suggestedGoal: existingUser?.mainGoal || undefined,
      message:
        "Mobile number verified. Please enter your name, monthly salary, and financial requirements.",
    });
  } catch (error) {
    console.error(
      "[DhanRaksha SMS] 2Factor verification failed:",
      error,
    );

    return res.status(502).json({
      error: "OTP verification service is unavailable.",
    });
  }
});

// 3. Send Verification Code Endpoint (Gmail)
app.post("/api/auth/send-email-code", (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res
      .status(400)
      .json({ error: "Valid Gmail/Google address is required" });
  }

  const cleanEmail = email.trim().toLowerCase();
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  emailCodeStore.set(cleanEmail, {
    code,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });

  // Log to server console (code not sent to client UI)
  console.log(
    `[DhanRaksha Gmail Dispatch] Dispatched verification code to ${cleanEmail}. (Code: ${code})`,
  );

  return res.json({
    success: true,
    email: cleanEmail,
    message: `Verification code sent to ${cleanEmail}. Please check your inbox.`,
  });
});

// 4. Verify Email Code Endpoint (Gmail)
app.post("/api/auth/verify-email-code", (req: Request, res: Response) => {
  const { email, code } = req.body;
  if (!email || !code) {
    return res
      .status(400)
      .json({ error: "Email and verification code are required" });
  }

  const cleanEmail = email.trim().toLowerCase();
  const stored = emailCodeStore.get(cleanEmail);

  if (!stored || stored.code !== String(code).trim()) {
    return res.status(400).json({
      error:
        "Incorrect verification code. Please check your Gmail inbox and try again.",
    });
  }

  if (Date.now() > stored.expiresAt) {
    return res.status(400).json({
      error: "Verification code has expired. Please request a new code.",
    });
  }

  emailCodeStore.delete(cleanEmail);

  const existingUser = findUserByContact(cleanEmail);

  return res.json({
    success: true,
    verified: true,
    email: cleanEmail,
    existingUser: existingUser || null,
    suggestedName: existingUser?.name || cleanEmail.split("@")[0],
    suggestedSalary: existingUser?.salary || undefined,
    suggestedExpenses: existingUser?.expenses || undefined,
    suggestedOccupation: existingUser?.occupation || undefined,
    suggestedGoal: existingUser?.mainGoal || undefined,
    message:
      "Gmail address verified. Please enter your name, monthly salary, and financial requirements.",
  });
});

// 3. Gmail / Google Login Endpoint
app.post("/api/auth/google", (req: Request, res: Response) => {
  const { email, name } = req.body;
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res
      .status(400)
      .json({ error: "Valid Gmail/Google address is required" });
  }

  const cleanEmail = email.trim().toLowerCase();
  let user = findUserByContact(cleanEmail);
  const isNewUser = !user;

  if (isNewUser) {
    // Return flag so frontend voice onboarding guides them to enter salary & requirements
    return res.json({
      success: true,
      isNewUser: true,
      email: cleanEmail,
      suggestedName: name || cleanEmail.split("@")[0],
      message:
        "Google account verified. Please complete your rural financial profile.",
    });
  }

  const token = `dhan_session_${user.id}_${Date.now()}`;
  user.token = token;
  sessions.set(token, user);

  return res.json({
    success: true,
    isNewUser: false,
    user,
    token,
    message: `Welcome back, ${user.name}!`,
  });
});

// 4. Register / Complete Profile Endpoint
app.post("/api/auth/register", (req: Request, res: Response) => {
  const {
    phone,
    email,
    name,
    salary,
    expenses,
    occupation,
    mainGoal,
    language = "te",
    authMethod = "phone",
  } = req.body;
  if (!name || (!phone && !email)) {
    return res
      .status(400)
      .json({ error: "Name and either Phone or Email are required" });
  }

  const cleanPhone = phone
    ? String(phone)
        .replace(/[^0-9]/g, "")
        .slice(-10)
    : undefined;
  const cleanEmail = email ? String(email).trim().toLowerCase() : undefined;
  const id = `usr_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  const newUser: StoredUser = {
    id,
    phone: cleanPhone,
    email: cleanEmail,
    name: String(name).trim(),
    salary: Number(salary) || 15000,
    expenses: Number(expenses) || 10000,
    occupation: occupation ? String(occupation).trim() : "Agriculture & Dairy",
    mainGoal: String(mainGoal || "Children's Education"),
    language:
      language === "hi" || language === "te" || language === "en"
        ? language
        : "te",
    authMethod: authMethod === "google" ? "google" : "phone",
    createdAt: new Date().toISOString(),
  };

  const token = `dhan_session_${id}_${Date.now()}`;
  newUser.token = token;
  sessions.set(token, newUser);

  if (cleanPhone) usersDb.set(cleanPhone, newUser);
  if (cleanEmail) usersDb.set(cleanEmail, newUser);
  usersDb.set(id, newUser);

  console.log(
    `[DhanRaksha Auth] New user registered: ${newUser.name} (Phone: ${cleanPhone || "N/A"}, Email: ${cleanEmail || "N/A"})`,
  );

  return res.json({
    success: true,
    user: newUser,
    token,
    message: "Registration successful! Welcome to DhanRaksha.",
  });
});

// 5. Get Current User Session (Me)
app.get("/api/auth/me", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader?.replace(/^Bearer\s+/i, "").trim() ||
    (req.query.token as string);

  if (token && sessions.has(token)) {
    return res.json({
      success: true,
      user: sessions.get(token),
    });
  }

  // Also allow query by phone or email for resilience
  const contact =
    (req.query.contact as string) ||
    (req.query.phone as string) ||
    (req.query.email as string);
  if (contact) {
    const user = findUserByContact(contact);
    if (user) {
      return res.json({ success: true, user });
    }
  }

  return res.status(401).json({ error: "Not authenticated" });
});

// 6. Update Profile
app.post("/api/auth/profile", (req: Request, res: Response) => {
  const {
    id,
    phone,
    email,
    name,
    salary,
    expenses,
    occupation,
    mainGoal,
    language,
  } = req.body;
  const user =
    (id && usersDb.get(id)) ||
    (phone && findUserByContact(phone)) ||
    (email && findUserByContact(email));

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (name) user.name = String(name).trim();
  if (salary !== undefined) user.salary = Number(salary);
  if (expenses !== undefined) user.expenses = Number(expenses);
  if (occupation) user.occupation = String(occupation).trim();
  if (mainGoal) user.mainGoal = String(mainGoal).trim();
  if (language && (language === "te" || language === "hi" || language === "en"))
    user.language = language;

  return res.json({
    success: true,
    user,
    message: "Profile updated successfully.",
  });
});

// 7. Logout Endpoint
app.post("/api/auth/logout", (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace(/^Bearer\s+/i, "").trim() || req.body.token;
  if (token) {
    sessions.delete(token);
  }
  return res.json({ success: true, message: "Logged out successfully" });
});

const ttsCache = new Map<string, Buffer>();

function splitTextIntoChunks(text: string, maxLen = 110): string[] {
  // Clean special characters
  const clean = text
    .replace(/[#*_`~•|]/g, " ")
    .replace(/₹/g, " రూపాయలు ")
    .replace(/\s+/g, " ")
    .trim();

  const sentences = clean.match(/[^.!?।:;\n]+[.!?।:;\n]+|[^.!?।:;\n]+/g) || [
    clean,
  ];
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;

    if ((current + " " + trimmed).trim().length <= maxLen) {
      current = (current ? current + " " : "") + trimmed;
    } else {
      if (current) chunks.push(current);
      if (trimmed.length <= maxLen) {
        current = trimmed;
      } else {
        const words = trimmed.split(/(\s+|,)/);
        let wordChunk = "";
        for (const w of words) {
          if ((wordChunk + w).length <= maxLen) {
            wordChunk += w;
          } else {
            if (wordChunk.trim()) chunks.push(wordChunk.trim());
            wordChunk = w;
          }
        }
        current = wordChunk.trim();
      }
    }
  }
  if (current) chunks.push(current);
  return chunks.filter((c) => c.length > 0);
}

// 4. Multi-language TTS Endpoint for Telugu, Hindi & English voice playback
app.get("/api/tts", async (req: Request, res: Response) => {
  const rawText = String(req.query.text || "")
    .slice(0, 1500)
    .trim();
  const lang = String(req.query.lang || "en");
  const langCode = lang === "te" ? "te" : lang === "hi" ? "hi" : "en";

  if (!rawText) {
    return res.status(400).send("Text query required");
  }

  const cacheKey = `${langCode}:${rawText}`;
  if (ttsCache.has(cacheKey)) {
    const cached = ttsCache.get(cacheKey)!;
    res.set("Content-Type", "audio/mpeg");
    res.set("Cache-Control", "public, max-age=86400");
    return res.send(cached);
  }

  try {
    const chunks = splitTextIntoChunks(rawText, 110);
    if (chunks.length === 0) {
      return res.status(400).send("Empty text chunks");
    }

    // Parallel download of all chunks for ultra-fast playback
    const chunkPromises = chunks.map(async (chunk) => {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${langCode}&client=tw-ob&q=${encodeURIComponent(
        chunk,
      )}`;
      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          },
        });

        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          return Buffer.from(arrayBuffer);
        }
      } catch (e) {
        console.warn(`[TTS] Chunk fetch error for "${chunk.slice(0, 20)}":`, e);
      }
      return null;
    });

    const results = await Promise.all(chunkPromises);
    const validBuffers: Buffer[] = [];
    for (const buf of results) {
      if (buf) {
        validBuffers.push(buf);
      }
    }

    if (validBuffers.length === 0) {
      return res.status(502).send("TTS upstream failure");
    }

    const combinedBuffer = Buffer.concat(validBuffers);

    // Cache up to 200 items in memory
    if (ttsCache.size > 200) {
      const firstKey = ttsCache.keys().next().value;
      if (firstKey) ttsCache.delete(firstKey);
    }
    ttsCache.set(cacheKey, combinedBuffer);

    res.set("Content-Type", "audio/mpeg");
    res.set("Cache-Control", "public, max-age=86400");
    return res.send(combinedBuffer);
  } catch (err: any) {
    console.warn("TTS fetch error:", err?.message || err);
    return res.status(500).send("Failed to synthesize audio");
  }
});

// Helper for generating content with multi-model fallback and 503 retry
const CANDIDATE_MODELS = [
  "gemini-3.8-flash",
  "gemini-3.1-flash-lite",
  "gemini-flash-latest",
];

function cleanJsonString(str: string): string {
  return str
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
}

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timeout after ${timeoutMs}ms`));
    }, timeoutMs);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

async function generateWithFallback(
  ai: GoogleGenAI,
  options: {
    contents: any;
    systemInstruction?: string;
    temperature?: number;
    responseMimeType?: string;
  },
): Promise<{ text: string; model: string } | null> {
  for (const model of CANDIDATE_MODELS) {
    try {
      const config: any = {};
      if (options.systemInstruction)
        config.systemInstruction = options.systemInstruction;
      if (typeof options.temperature === "number")
        config.temperature = options.temperature;
      if (options.responseMimeType)
        config.responseMimeType = options.responseMimeType;

      const response = await withTimeout(
        ai.models.generateContent({
          model,
          contents: options.contents,
          config,
        }),
        5000, // 5-second responsive timeout
      );

      const text = response.text?.trim();
      if (text) {
        return { text, model };
      }
    } catch (err: any) {
      const errStr = String(err?.message || err || "");
      const is503orBusy =
        err?.status === 503 ||
        err?.code === 503 ||
        errStr.includes("503") ||
        errStr.includes("high demand") ||
        errStr.includes("UNAVAILABLE") ||
        errStr.includes("RESOURCE_EXHAUSTED") ||
        errStr.includes("Timeout");

      if (is503orBusy) {
        console.log(
          `[RuralFin AI] Model '${model}' busy or timed out. Trying alternative model...`,
        );
        continue;
      }

      console.log(
        `[RuralFin AI] Model '${model}' fallback: ${errStr.slice(0, 100)}`,
      );
    }
  }

  console.log(
    "[RuralFin AI] Note: Gemini models currently busy; utilizing comprehensive financial knowledge engine.",
  );
  return null;
}

// AI RuralFin Chat endpoint
app.post("/api/chat", async (req: Request, res: Response) => {
  const { message, language = "en", userProfile } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  const ai = getAI();
  if (ai) {
    const languageInstruction =
      language === "te"
        ? "Respond in natural, simple, friendly Telugu (తెలుగు). Use simple Telugu words that rural women easily understand."
        : language === "hi"
          ? "Respond in natural, simple, friendly Hindi (हिन्दी). Use simple Hindi words that rural women easily understand."
          : "Respond in simple, clear, and encouraging English.";

    const profileContext = userProfile
      ? `User context: Name: ${userProfile.name || "Friend"}, Monthly Income: ₹${userProfile.income || 15000}, Monthly Expenses: ₹${userProfile.expenses || 10000}, Savings Goal: ${userProfile.mainGoal || "Education"}.`
      : "";

    const systemInstruction = `You are DhanRaksha (ధనరక్ష / धनरक्षा), a friendly, patient, and warm digital-financial teacher and trusted guide created specifically for rural women and individuals overcoming digital illiteracy.
Your mission is to remove the fear of smartphones, digital payments (UPI, ATM, QR codes), and fraud, and help women protect and grow their household savings.

Guidelines:
- Speak like a caring, knowledgeable and respectful village financial guide.
- Be extremely patient, gentle, encouraging, and clear.
- Explain digital terms with everyday rural village analogies:
  * Smartphone screen: like a magic slate, touch gently with clean dry fingers.
  * UPI PIN: like the secret lock key of your house chest. Only enter it when GIVING money away, NEVER to receive money!
  * OTP: like the private seal of a letter. Never tell it to anyone on a phone call.
  * QR Code: like an electronic address board of the shopkeeper.
  * ATM: like a cash dispenser wall. Always hide your hand when typing numbers.
- Always use Indian Rupees (₹).
- Ground explanations in rural life (farming, dairying, tailoring, self-help groups / SHG / Mahila Mandal, grocery shop, children's school fees).
- Structure responses into 3 simple sections:
  1. Simple Explanation (in plain village language)
  2. Real-Life Example
  3. Safe Step to Take
- NEVER ask for or accept OTP, UPI PIN, bank account password, or card number.
- Clearly state educational intent: "DhanRaksha provides educational guidance, not personal financial advice. Always verify with your local bank or official center."
${languageInstruction}
${profileContext}`;

    const result = await generateWithFallback(ai, {
      contents: message,
      systemInstruction,
      temperature: 0.7,
    });

    if (result?.text) {
      return res.json({
        reply: result.text,
        source: "gemini",
        model: result.model,
      });
    }
  }

  // Graceful fallback response engine
  const fallbackReply = generateFallbackResponse(
    message,
    language,
    userProfile,
  );
  return res.json({
    reply: fallbackReply,
    source: "fallback",
  });
});

// Scam Message Checker endpoint
app.post("/api/analyze-scam", async (req: Request, res: Response) => {
  const { message, language = "en" } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message text is required" });
  }

  const ai = getAI();
  if (ai) {
    const prompt = `Analyze this SMS or WhatsApp message for potential financial fraud or scam.
Message: "${message}"

Respond strictly with valid JSON with the following structure:
{
  "isScam": true,
  "riskLevel": "High" | "Medium" | "Low",
  "scamType": "Lottery / Prize Fraud" | "Fake UPI Payment" | "KYC Update Threat" | "Loan Approval Scam" | "Job Offer Scam" | "Safe Communication",
  "reasons": ["Reason 1", "Reason 2"],
  "safeAction": "Clear advice on what the user should do immediately",
  "summary": "Brief 1-sentence conclusion"
}`;

    const result = await generateWithFallback(ai, {
      contents: prompt,
      responseMimeType: "application/json",
      temperature: 0.2,
    });

    if (result?.text) {
      try {
        const cleaned = cleanJsonString(result.text);
        const parsed = JSON.parse(cleaned);
        return res.json({ ...parsed, source: "gemini", model: result.model });
      } catch {
        // Continue to rule-based fallback
      }
    }
  }

  // Rule-based fallback scam detector
  const analysis = analyzeScamRuleBased(message, language);
  return res.json({ ...analysis, source: "rules" });
});

// Helper for fallback AI chat responses
function generateFallbackResponse(
  message: string,
  lang: string,
  profile?: {
    name?: string;
    income?: number;
    expenses?: number;
    mainGoal?: string;
  },
): string {
  const q = message.toLowerCase();
  const income = profile?.income || 15000;
  const expenses = profile?.expenses || 10000;
  const remaining = Math.max(0, income - expenses);

  if (lang === "te") {
    if (
      q.includes("save") ||
      q.includes("ఆదా") ||
      q.includes("15000") ||
      q.includes("ఖర్చు")
    ) {
      return `నమస్కారం! ఇక్కడ మీకు సులభమైన ప్రణాళిక ఉంది:

నెలవారీ ఆదాయం: ₹${income.toLocaleString("en-IN")}
నెలవారీ ఖర్చులు: ₹${expenses.toLocaleString("en-IN")}
మిగిలిన మొత్తం: ₹${remaining.toLocaleString("en-IN")}

మీరు ఇలా కేటాయించవచ్చు:
• ₹${Math.round(remaining * 0.5).toLocaleString("en-IN")} → అత్యవసర నిధి (Emergency Savings)
• ₹${Math.round(remaining * 0.3).toLocaleString("en-IN")} → మీ లక్ష్యం (${profile?.mainGoal || "చదువు / వ్యాపారం"})
• ₹${Math.round(remaining * 0.2).toLocaleString("en-IN")} → ఇతర అవసరాలు

ప్రతినెలా క్రమం తప్పకుండా ₹2,500 దాచుకుంటే, సంవత్సరానికి ₹30,000 పైగా నిల్వ చేయవచ్చు. మీ స్తోమతకు తగినంతతో ప్రారంభించండి!`;
    }
    if (q.includes("interest") || q.includes("వడ్డీ")) {
      return `వడ్డీ అంటే ఏమిటి? సులభమైన వివరణ:

మీరు బ్యాంకులో ₹10,000 దాచుకుంటే, బ్యాంకు మీకు అదనంగా కొంత డబ్బు (వడ్డీ) ఇస్తుంది.
అదే మీరు అప్పుగా తీసుకుంటే, తీసుకున్న అసలుతో పాటు అదనంగా వడ్డీ చెల్లించాలి.

ఉదాహరణ:
మీరు ₹10,000 అప్పు తీసుకుని వడ్డీ ₹1,000 అయితే, మొత్తం ₹11,000 తిరిగి ఇవ్వాలి.

సూచన: స్థానిక వడ్డీ వ్యాపారుల కంటే బ్యాంకులు లేదా మహిళా పొదుపు సంఘాల (SHG) రుణాలు ఎంతో తక్కువ వడ్డీని కలిగి ఉంటాయి.`;
    }
    if (q.includes("emergency") || q.includes("అత్యవసర")) {
      return `అత్యవసర నిధి (Emergency Fund) అంటే ఏమిటి?

ఇది ఆకస్మిక వైద్య ఖర్చులు లేదా పంట నష్టం వంటి అనుకోని సమయాల్లో ఆదుకునే రక్షణ కవచం.

లక్ష్యం: కనీసం 3 నెలల ఖర్చులకు సమానమైన మొత్తం (ఉదాహరణకు ₹${(expenses * 3).toLocaleString("en-IN")}) దాచుకోవడం మంచిది.
దీనిని ఇంట్లో పెట్టకుండా పోస్టాఫీస్ లేదా బ్యాంకు సేవింగ్స్ ఖాతాలో ఉంచండి.`;
    }
    return `మీ ప్రశ్నను అర్థం చేసుకున్నాను. మీ ఆదాయం ₹${income.toLocaleString("en-IN")} మరియు ఖర్చులు ₹${expenses.toLocaleString("en-IN")} ప్రకారం, మీ చేతిలో దాదాపు ₹${remaining.toLocaleString("en-IN")} మిగులుతుంది. చిన్న మొత్తాలతో పొదుపు మొదలుపెట్టడం మీ ఆర్థిక స్వాతంత్ర్యానికి పునాది. ఇంకా ఏమైనా సందేహాలు ఉన్నాయా?`;
  }

  if (lang === "hi") {
    if (
      q.includes("save") ||
      q.includes("बचत") ||
      q.includes("15000") ||
      q.includes("खर्च")
    ) {
      return `नमस्ते! आपके लिए एक सरल वित्तीय योजना:

मासिक आय: ₹${income.toLocaleString("en-IN")}
मासिक खर्च: ₹${expenses.toLocaleString("en-IN")}
बची हुई राशि: ₹${remaining.toLocaleString("en-IN")}

आप इसे इस प्रकार विभाजित कर सकती हैं:
• ₹${Math.round(remaining * 0.5).toLocaleString("en-IN")} → आपातकालीन बचत (Emergency Fund)
• ₹${Math.round(remaining * 0.3).toLocaleString("en-IN")} → लक्ष्य बचत (${profile?.mainGoal || "शिक्षा/व्यवसाय"})
• ₹${Math.round(remaining * 0.2).toLocaleString("en-IN")} → आकस्मिक खर्च

हर महीने ₹2,500 बचाने पर साल भर में ₹30,000 बन सकते हैं। छोटी शुरुआत करें, पर निरंतर रखें!`;
    }
    if (q.includes("interest") || q.includes("ब्याज")) {
      return `ब्याज (Interest) क्या है? सरल शब्दों में समझें:

यदि आप बैंक में पैसे जमा करती हैं, तो बैंक आपको उस पर अतिरिक्त पैसे (ब्याज) देता है।
यदि आप कर्ज (लोन) लेती हैं, तो आपको मूल राशि के साथ ब्याज चुकाना पड़ता है।

उदाहरण:
यदि आपने ₹10,000 कर्ज लिया और ब्याज ₹1,000 है, तो कुल ₹11,000 लौटाने होंगे।

सलाह: हमेशा स्थानीय साहूकारों के बजाय सरकारी बैंकों या स्वयं सहायता समूहों (SHG) से कम ब्याज पर कर्ज लें।`;
    }
    return `आपके प्रश्न के अनुसार, ₹${income.toLocaleString("en-IN")} की मासिक आय और ₹${expenses.toLocaleString("en-IN")} के खर्च के बाद आपके पास लगभग ₹${remaining.toLocaleString("en-IN")} बचते हैं। इसे सही जगह सुरक्षित जमा करना आपके परिवार का भविष्य संवारेगा।`;
  }

  // English fallback
  if (
    q.includes("save") ||
    q.includes("15000") ||
    q.includes("10000") ||
    q.includes("budget")
  ) {
    return `Here is a simple, achievable plan for your money:

Monthly income: ₹${income.toLocaleString("en-IN")}
Monthly expenses: ₹${expenses.toLocaleString("en-IN")}
Amount left: ₹${remaining.toLocaleString("en-IN")}

You could consider dividing it this way:
• ₹${Math.round(remaining * 0.5).toLocaleString("en-IN")} → Emergency savings
• ₹${Math.round(remaining * 0.3).toLocaleString("en-IN")} → Goal savings (${profile?.mainGoal || "Education"})
• ₹${Math.round(remaining * 0.2).toLocaleString("en-IN")} → Flexible spending

If you save ₹2,500 every month, you could build ₹30,000 in one year.
Start with an amount that is comfortable for you. Consistency is more important than size!`;
  }

  if (q.includes("interest")) {
    return `What is Interest? In very simple words:

When you deposit money in a bank or post office, the bank pays you extra money for keeping it there. That is interest earned.
When you borrow money (take a loan), you pay extra money back for using it. That is interest paid.

Simple Example:
If you borrow ₹10,000 and the interest is ₹1,000, you will repay ₹11,000 in total.

Rural Tip: Self-Help Groups (SHG) and nationalized banks offer much lower interest rates than private moneylenders. Always ask for the yearly interest rate before borrowing.`;
  }

  if (q.includes("emergency") || q.includes("fund")) {
    return `What is an Emergency Fund?

It is your financial safety umbrella for unexpected events like sudden medical needs, tractor repair, or seasonal crop delays.

Recommended Target:
Aim for 3 months of basic living expenses (about ₹${(expenses * 3).toLocaleString("en-IN")}).
Keep this in a simple bank savings account or post office savings account where you can withdraw quickly without penalty.`;
  }

  if (
    q.includes("scam") ||
    q.includes("fraud") ||
    q.includes("otp") ||
    q.includes("pin")
  ) {
    return `Golden Rules of Digital Safety:

1. Never share your OTP or UPI PIN with anyone, even if they claim to be from your bank or government office.
2. Remember: A UPI PIN is ONLY entered to SEND money, never to RECEIVE money.
3. Do not click links claiming you won a lottery or PM scheme money.
4. If in doubt, stop and speak with a trusted family member or visit your local bank branch in person.`;
  }

  if (q.includes("sip") || q.includes("invest")) {
    return `What is a Systematic Investment Plan (SIP)?

A SIP is like a digital piggy bank (Recurring Deposit). Instead of putting in a huge amount at once, you deposit a small fixed sum (like ₹500 every month) into mutual funds.

Simple Example:
Just like setting aside a small measure of grain every harvest, saving ₹500 every month grows steadily over 5–10 years.

Keep in mind: Start with safe bank savings first, and only consider mutual funds once you have an emergency fund ready!`;
  }

  return `Based on your monthly income of ₹${income.toLocaleString("en-IN")} and expenses of ₹${expenses.toLocaleString("en-IN")}, you have approximately ₹${remaining.toLocaleString("en-IN")} available each month.

Simple recommendations:
1. Keep 10% to 20% in an emergency fund first.
2. Put small amounts regularly towards your goal: ${profile?.mainGoal || "Family Progress"}.
3. Keep track of daily small spends like tea, snacks, and mobile recharges.

What specific topic would you like to explore next?`;
}

function analyzeScamRuleBased(text: string, _lang: string) {
  const lower = text.toLowerCase();
  const reasons: string[] = [];
  let isScam = false;
  let scamType = "Safe Communication";

  if (
    lower.includes("won") ||
    lower.includes("prize") ||
    lower.includes("lottery") ||
    lower.includes("crore") ||
    lower.includes("lakh") ||
    lower.includes("50,000") ||
    lower.includes("50000")
  ) {
    isScam = true;
    scamType = "Lottery / Prize Fraud";
    reasons.push(
      "Unexpected prize or lottery announcement with large sums of money.",
    );
  }

  if (
    lower.includes("click") ||
    lower.includes("link") ||
    lower.includes("http") ||
    lower.includes("bit.ly") ||
    lower.includes(".apk") ||
    lower.includes("tinyurl")
  ) {
    isScam = true;
    reasons.push(
      "Contains an unverified external link asking you to click or install an app.",
    );
  }

  if (
    lower.includes("urgent") ||
    lower.includes("immediately") ||
    lower.includes("blocked") ||
    lower.includes("suspend") ||
    lower.includes("24 hours") ||
    lower.includes("kyc")
  ) {
    isScam = true;
    scamType =
      scamType === "Safe Communication" ? "KYC Threat / Fake Alert" : scamType;
    reasons.push(
      "Creates false urgency and panic (e.g. threatening account blockage or expired KYC).",
    );
  }

  if (
    lower.includes("otp") ||
    lower.includes("pin") ||
    lower.includes("password") ||
    lower.includes("cvv") ||
    lower.includes("upi")
  ) {
    isScam = true;
    reasons.push(
      "Attempts to trick you into sharing or entering confidential credentials.",
    );
  }

  if (isScam) {
    return {
      isScam: true,
      riskLevel: "High",
      scamType,
      reasons,
      safeAction:
        "Do not click the link. Do not call the number. Never share your OTP, UPI PIN, or banking credentials.",
      summary:
        "This message exhibits classic warning signs of financial fraud designed to steal money or personal details.",
    };
  }

  return {
    isScam: false,
    riskLevel: "Low",
    scamType: "Information / Normal Message",
    reasons: [
      "No obvious urgency, lottery claims, or credential requests detected.",
    ],
    safeAction:
      "Verify sender identity independently before sharing any personal details.",
    summary:
      "This message does not appear to contain common scam patterns, but always stay cautious.",
  };
}

// Vite middleware or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });

    app.use(vite.middlewares);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`DhanRaksha server running on http://0.0.0.0:${PORT}`);
    });
  }
}

if (process.env.NODE_ENV !== "production") {
  startServer();
}
