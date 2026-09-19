import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  ShieldAlert,
  Loader2,
  RefreshCw,
  HelpCircle,
  CheckCircle2,
  Globe,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { ChatMessage, Language } from "../types";
import { sendChatMessage } from "../services/api";
import {
  isSpeechRecognitionSupported,
  startSpeechRecognition,
  stopSpeechRecognition,
  speakText,
  stopSpeaking,
} from "../services/speech";

export const AiChatModal: React.FC = () => {
  const {
    isChatOpen,
    closeChat,
    language,
    setLanguage,
    userProfile,
    initialChatPrompt,
    t,
  } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [activeSpeechMessageId, setActiveSpeechMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const stopListeningRef = useRef<(() => void) | null>(null);

  // Initialize welcoming message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeText =
        language === "te"
          ? `నమస్కారం ${userProfile.name}! నేను మీ ధనరక్ష AI (DhanRaksha AI) సహాయకురాలిని 🙏🌸. 

మీరు ఫోన్ పేమెంట్స్ (UPI, QR కోడ్), బ్యాంక్ ఖాతా, పొదుపు లేదా మోసాల నుండి ఎలా సురక్షితంగా ఉండాలో నాతో సరళమైన తెలుగులో అడగండి. కింద మైక్ గుర్తుపై నొక్కి మీ స్వంత గొంతుతో కూడా మాట్లాడవచ్చు!`
          : language === "hi"
          ? `नमस्ते ${userProfile.name}! मैं आपकी धनरक्षा AI (DhanRaksha AI) सहायक 🙏🌸 हूँ।

स्मार्टफोन से पैसे भेजना, दुकान पर QR कोड स्कैन करना, बैंक बैलेंस चेक करना, रोज़ की बचत या फोन पर आने वाले फर्जी कॉल-लॉटरी से बचने का तरीका आप मुझसे पूछ सकती हैं। नीचे माइक बटन दबाकर बोलें!`
          : `Namaste ${userProfile.name}! I am your DhanRaksha AI companion 🙏🌸.

I am here to guide you in simple, village-friendly language. Ask me about how to use UPI QR payments safely, checking your bank balance from home, saving in your Gullak, or spotting phone scam traps!`;

      setMessages([
        {
          id: "welcome-msg",
          sender: "assistant",
          text: welcomeText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          language,
        },
      ]);
    }
  }, [language, userProfile.name]);

  // Handle initial prompt prefilled from other pages
  useEffect(() => {
    if (isChatOpen && initialChatPrompt) {
      handleSendMessage(initialChatPrompt);
    }
  }, [isChatOpen, initialChatPrompt]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      stopSpeechRecognition();
      stopSpeaking();
    };
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      language,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setLoading(true);
    setVoiceError(null);

    try {
      const response = await sendChatMessage(text, language, userProfile);
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "assistant",
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        language,
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Automatically speak the first sentence or whole response if user used voice
      if (isListening) {
        speakText(
          response.reply,
          language,
          () => setActiveSpeechMessageId(assistantMsg.id),
          () => setActiveSpeechMessageId(null)
        );
      }
    } catch (err) {
      console.error("Chat error:", err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: "assistant",
        text:
          language === "te"
            ? "క్షమించండి, ప్రత్యుత్తరం ఇవ్వడంలో చిన్న సమస్య వచ్చింది. దయచేసి మళ్ళీ ప్రయత్నించండి."
            : language === "hi"
            ? "माफ कीजिए, उत्तर देने में समस्या हुई। कृपया पुनः प्रयास करें।"
            : "I am having trouble answering right now. Please try asking again in a moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        language,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const toggleVoiceInput = () => {
    if (isListening) {
      if (stopListeningRef.current) {
        stopListeningRef.current();
        stopListeningRef.current = null;
      }
      stopSpeechRecognition();
      setIsListening(false);
      return;
    }

    if (!isSpeechRecognitionSupported()) {
      setVoiceError("Voice input is not supported in this browser.");
      return;
    }

    setVoiceError(null);
    setIsListening(true);

    const cleanup = startSpeechRecognition(
      language,
      (transcript) => {
        setInputValue(transcript);
      },
      (error) => {
        setVoiceError(error);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );

    stopListeningRef.current = cleanup;
  };

  const handleSpeakMessage = (msg: ChatMessage) => {
    if (activeSpeechMessageId === msg.id) {
      stopSpeaking();
      setActiveSpeechMessageId(null);
    } else {
      speakText(
        msg.text,
        msg.language,
        () => setActiveSpeechMessageId(msg.id),
        () => setActiveSpeechMessageId(null)
      );
    }
  };

  const quickSuggestions = [
    {
      en: "How can I save ₹2,000 every month?",
      te: "నెలకు ₹2,000 ఎలా పొదుపు చేయగలను?",
      hi: "हर महीने ₹2,000 कैसे बचाएं?",
    },
    {
      en: "Explain interest simply",
      te: "వడ్డీ అంటే ఏమిటో సులభంగా వివరించండి",
      hi: "ब्याज को सरल भाषा में समझाएं",
    },
    {
      en: "Create my budget",
      te: "నా కోసం ఒక బడ్జెట్ ప్రణాళిక తయారుచేయండి",
      hi: "मेरे लिए एक बजट योजना बनाएं",
    },
    {
      en: "What is an emergency fund?",
      te: "అత్యవసర నిధి అంటే ఏమిటి?",
      hi: "आपातकालीन फंड (इमरजेंसी फंड) क्या है?",
    },
    {
      en: "How can I avoid scams?",
      te: "డిజిటల్ బ్యాంకింగ్ మోసాల నుండి ఎలా తప్పించుకోవాలి?",
      hi: "ऑनलाइन धोखाधड़ी से कैसे बचें?",
    },
    {
      en: "Explain SIP simply",
      te: "SIP అంటే ఏమిటి? సులభంగా చెప్పండి",
      hi: "एसआईपी (SIP) को सरल शब्दों में समझें",
    },
  ];

  if (!isChatOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="ruralfin-ai-chat-window"
        className="relative flex flex-col w-full max-w-2xl h-[92vh] sm:h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center text-white border border-white/20">
                <Bot className="w-6 h-6 text-emerald-200" />
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-emerald-900 rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight font-serif">
                  {language === "te" ? "ధనరక్ష AI 🌸" : language === "hi" ? "धनरक्षा AI 🌸" : "DhanRaksha AI 🌸"}
                </h2>
                <span className="bg-emerald-700/60 text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  {language === "te" ? "తెలుగు సహాయం" : language === "hi" ? "हिन्दी सहायता" : "Simple Language"}
                </span>
              </div>
              <p className="text-xs text-emerald-200/90 font-medium">
                {language === "te"
                  ? "మీ స్నేహపూర్వక డిజిటల్ & ఆర్థిక మార్గదర్శి"
                  : language === "hi"
                  ? "आपकी अपनी डिजिटल व वित्तीय मार्गदर्शक"
                  : "Your friendly digital & financial companion"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick language switcher */}
            <div className="flex bg-emerald-950/40 p-0.5 rounded-lg border border-emerald-700/50">
              {(["en", "te", "hi"] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${
                    language === l
                      ? "bg-white text-emerald-950 shadow-xs"
                      : "text-emerald-200 hover:text-white"
                  }`}
                >
                  {l === "te" ? "తెలుగు" : l === "hi" ? "हिन्दी" : "EN"}
                </button>
              ))}
            </div>

            <button
              id="close-chat-btn"
              onClick={closeChat}
              className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Voice Mode Banner if listening */}
        {isListening && (
          <div className="bg-amber-500 text-amber-950 px-4 py-2 text-xs sm:text-sm font-bold flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
              <span>
                {language === "te"
                  ? "ధనరక్ష AI వింటోంది... మాట్లాడండి"
                  : language === "hi"
                  ? "धनरक्षा AI सुन रही है... बोलिए"
                  : "DhanRaksha AI is listening... speak your question"}
              </span>
            </div>
            <button
              onClick={toggleVoiceInput}
              className="px-2 py-0.5 bg-amber-950 text-white rounded text-xs"
            >
              Done
            </button>
          </div>
        )}

        {voiceError && (
          <div className="bg-red-50 text-red-700 px-4 py-1.5 text-xs font-semibold flex items-center justify-between border-b border-red-200">
            <span>{voiceError}</span>
            <button
              onClick={() => setVoiceError(null)}
              className="text-red-900 font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/70">
          {messages.map((msg) => {
            const isAI = msg.sender === "assistant";
            const isSpeaking = activeSpeechMessageId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAI ? "items-start" : "items-end justify-end"}`}
              >
                {isAI && (
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <Bot className="w-4 h-4 text-emerald-200" />
                  </div>
                )}

                <div
                  className={`relative max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-sm sm:text-base leading-relaxed ${
                    isAI
                      ? "bg-white text-slate-800 border border-slate-200/80 shadow-xs"
                      : "bg-emerald-800 text-white shadow-xs rounded-br-xs"
                  }`}
                >
                  <div className="whitespace-pre-line font-normal">{msg.text}</div>

                  <div className="flex items-center justify-between gap-3 mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                    <span>{msg.timestamp}</span>

                    {isAI && (
                      <button
                        onClick={() => handleSpeakMessage(msg)}
                        title={isSpeaking ? "Stop speech" : "Listen aloud in selected language"}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          isSpeaking
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                        }`}
                      >
                        {isSpeaking ? (
                          <>
                            <VolumeX className="w-3 h-3 text-amber-700" />
                            <span>{language === "te" ? "ఆపండి" : "Stop"}</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3 text-emerald-700" />
                            <span>{language === "te" ? "వినండి" : language === "hi" ? "सुनें" : "Listen"}</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs flex items-center gap-2 text-slate-600 text-sm">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
                <span className="font-medium">
                  {language === "te"
                    ? "ధనరక్ష ఆలోచిస్తోంది..."
                    : language === "hi"
                    ? "धनरक्षा उत्तर तैयार कर रही है..."
                    : "DhanRaksha is preparing simple advice..."}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-white border-t border-slate-100 overflow-x-auto scrollbar-none flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-600" /> Quick:
          </span>
          {quickSuggestions.map((s, idx) => {
            const promptText = language === "te" ? s.te : language === "hi" ? s.hi : s.en;
            return (
              <button
                key={idx}
                onClick={() => handleSendMessage(promptText)}
                className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50/80 text-emerald-900 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-colors cursor-pointer"
              >
                {promptText}
              </button>
            );
          })}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Microphone Voice Button ("Talk to DhanRaksha") */}
            <button
              id="voice-assistant-mic-btn"
              type="button"
              onClick={toggleVoiceInput}
              title={isListening ? "Stop listening" : "Talk to DhanRaksha (Speak in your language)"}
              className={`p-3 rounded-xl transition-all cursor-pointer shrink-0 ${
                isListening
                  ? "bg-red-500 text-white ring-4 ring-red-200 animate-bounce"
                  : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              id="ai-chat-text-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                language === "te"
                  ? "ఏదైనా అడగండి... (ఉదా: ₹2,000 ఎలా దాచుకోవాలి?)"
                  : language === "hi"
                  ? "कोई भी प्रश्न पूछें... (उदा: ₹2,000 कैसे बचाएं?)"
                  : "Ask DhanRaksha anything... (e.g. How to save ₹2,000?)"
              }
              className="flex-1 px-4 py-2.5 text-sm sm:text-base rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all text-slate-800"
            />

            <button
              id="ai-chat-send-btn"
              type="submit"
              disabled={!inputValue.trim() || loading}
              className="p-3 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>

          {/* Educational Disclaimer */}
          <p className="text-[11px] text-slate-500 text-center mt-2 leading-tight">
            {t.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};
