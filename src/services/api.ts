import { Language, UserProfile, ScamCheckResult } from "../types";

export interface ChatResponse {
  reply: string;
  source: "gemini" | "fallback";
}

export async function sendChatMessage(
  message: string,
  language: Language,
  userProfile?: UserProfile
): Promise<ChatResponse> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        language,
        userProfile,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        reply: data.reply || "Thank you for asking. DhanRaksha is here to support you.",
        source: data.source || "gemini",
      };
    }
  } catch {
    // Network or client offline fallback
  }

  // Client-side instant fallback
  return {
    reply: getClientFallbackResponse(message, language, userProfile),
    source: "fallback",
  };
}

export async function analyzeScamMessage(
  message: string,
  language: Language
): Promise<ScamCheckResult> {
  try {
    const res = await fetch("/api/analyze-scam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, language }),
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch {
    // Network or client offline fallback
  }

  // Fallback rule evaluation
  const lower = message.toLowerCase();
  const reasons: string[] = [];
  let isScam = false;

  if (lower.includes("won") || lower.includes("lottery") || lower.includes("prize") || lower.includes("50,000") || lower.includes("50000")) {
    isScam = true;
    reasons.push("Promises unexpected lottery or cash rewards without legitimate entry.");
  }
  if (lower.includes("http") || lower.includes("click") || lower.includes("link") || lower.includes("bit.ly")) {
    isScam = true;
    reasons.push("Urges you to click an unknown web link or download an unverified file.");
  }
  if (lower.includes("urgent") || lower.includes("block") || lower.includes("suspend") || lower.includes("kyc")) {
    isScam = true;
    reasons.push("Threatens bank account suspension or creates artificial panic.");
  }
  if (lower.includes("pin") || lower.includes("otp")) {
    isScam = true;
    reasons.push("Requests confidential credentials or asks you to enter UPI PIN to receive money.");
  }

  if (isScam) {
    return {
      isScam: true,
      riskLevel: "High",
      scamType: "Suspicious Financial Message",
      reasons: reasons.length > 0 ? reasons : ["Contains typical fraud warning indicators."],
      safeAction: "Do NOT click any link. Never share your OTP, UPI PIN, or bank passwords with anyone.",
      summary: "Potential scam detected. Exercise caution and do not send money or enter credentials.",
      source: "client-fallback",
    };
  }

  return {
    isScam: false,
    riskLevel: "Low",
    scamType: "Normal Information",
    reasons: ["No immediate malicious keywords, fake urgency, or credential demands detected."],
    safeAction: "Verify sender identity independently through official phone numbers.",
    summary: "This message seems informational, but always stay vigilant with your finances.",
    source: "client-fallback",
  };
}

function getClientFallbackResponse(
  message: string,
  lang: Language,
  profile?: UserProfile
): string {
  const q = message.toLowerCase();
  const income = profile?.income || 15000;
  const expenses = profile?.expenses || 10000;
  const remaining = Math.max(0, income - expenses);

  if (lang === "te") {
    if (q.includes("save") || q.includes("ఆదా") || q.includes("15000")) {
      return `నమస్కారం! మీ ఆదాయం ₹${income.toLocaleString("en-IN")} మరియు ఖర్చులు ₹${expenses.toLocaleString("en-IN")} ప్రకారం, మీకు సుమారు ₹${remaining.toLocaleString("en-IN")} అందుబాటులో ఉన్నాయి.

సిఫార్సు చేసిన ప్రణాళిక:
• ₹${Math.round(remaining * 0.5).toLocaleString("en-IN")} → అత్యవసర నిధి (పోస్టాఫీస్ లేదా బ్యాంక్)
• ₹${Math.round(remaining * 0.3).toLocaleString("en-IN")} → మీ లక్ష్యం (${profile?.mainGoal || "చదువు"})
• ₹${Math.round(remaining * 0.2).toLocaleString("en-IN")} → చేతి ఖర్చులు

ప్రతినెలా కొద్దికొద్దిగా పొదుపు చేయడం వల్ల సంవత్సరానికి ₹30,000 కు పైగా నిల్వ చేయవచ్చు!`;
    }
    return `రూరల్ ఫిన్ మీ కోసం సిద్ధంగా ఉంది! మీ ప్రశ్నపై మా సూచన: ఆదాయం మరియు ఖర్చుల మధ్య సమతుల్యత పాటించి, కనీసం 20% పొదుపు ఖాతాలో ఉంచండి. ఎలాంటి సహాయం కావాలన్నా అడగండి.`;
  }

  if (lang === "hi") {
    if (q.includes("save") || q.includes("बचत") || q.includes("15000")) {
      return `नमस्ते! आपकी मासिक आय ₹${income.toLocaleString("en-IN")} और खर्च ₹${expenses.toLocaleString("en-IN")} है। आपके पास लगभग ₹${remaining.toLocaleString("en-IN")} बचते हैं।

सरल विभाजन:
• ₹${Math.round(remaining * 0.5).toLocaleString("en-IN")} → आपातकालीन बचत
• ₹${Math.round(remaining * 0.3).toLocaleString("en-IN")} → मुख्य लक्ष्य (${profile?.mainGoal || "शिक्षा"})
• ₹${Math.round(remaining * 0.2).toLocaleString("en-IN")} → जरूरी छोटे खर्च

निरंतर बचत से साल भर में ₹30,000 सुरक्षित किए जा सकते हैं।`;
    }
    return `रूरलफिन आपका वित्तीय साथी है। छोटे-छोटे कदमों से नियमित बचत शुरू करें। कोई भी प्रश्न हो, बेझिझक पूछें।`;
  }

  // English fallback
  if (q.includes("save") || q.includes("15000") || q.includes("10000")) {
    return `Here is a simple plan:

Monthly income: ₹${income.toLocaleString("en-IN")}
Monthly expenses: ₹${expenses.toLocaleString("en-IN")}
Amount left: ₹${remaining.toLocaleString("en-IN")}

You could consider:
• ₹${Math.round(remaining * 0.5).toLocaleString("en-IN")} → Emergency savings
• ₹${Math.round(remaining * 0.3).toLocaleString("en-IN")} → Goal savings (${profile?.mainGoal || "Education"})
• ₹${Math.round(remaining * 0.2).toLocaleString("en-IN")} → Flexible spending

If you save ₹2,500 every month, you could build ₹30,000 in one year. Start with an amount that is comfortable for you.`;
  }

  if (q.includes("interest")) {
    return `What is Interest?
If you borrow ₹10,000 and the interest is ₹1,000, you will repay ₹11,000 in total.
If you save ₹10,000 in a bank, the bank gives you extra money as interest. Always choose government banks or SHGs for lowest loan interest!`;
  }

  return `Based on your profile, you have approximately ₹${remaining.toLocaleString("en-IN")} available after monthly essentials. Setting aside a dedicated portion towards your emergency fund ensures you stay protected against sudden shocks.`;
}
