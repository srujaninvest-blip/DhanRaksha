import React, { useState } from "react";
import {
  QrCode,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  RotateCcw,
  Smartphone,
  Eye,
  EyeOff,
  Volume2,
  Lock,
  ArrowRight,
  Sparkles,
  Wifi,
  Battery,
  Award,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { AudioNarrationButton } from "./AudioNarrationButton";
import { soundEffects } from "../utils/audioEffects";

type PracticeMode = "qr_pay" | "scam_trap" | "balance_check" | "otp_guard";

export const PracticeSimulator: React.FC = () => {
  const { language } = useApp();
  const [activeMode, setActiveMode] = useState<PracticeMode>("qr_pay");

  // QR Pay state
  const [qrStep, setQrStep] = useState<"ready" | "scanning" | "amount_confirm" | "pin_entry" | "success">("ready");
  const [enteredPin, setEnteredPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  // Scam Trap state
  const [scamState, setScamState] = useState<"prompt" | "caught" | "saved">("prompt");

  // Balance Check state
  const [balanceStep, setBalanceStep] = useState<"ready" | "pin" | "shown">("ready");
  const [balancePin, setBalancePin] = useState("");

  // OTP Guard state
  const [otpStep, setOtpStep] = useState<"call_rings" | "refused_safe" | "revealed_danger">("call_rings");

  // Reset QR Pay
  const handleResetQr = () => {
    setQrStep("ready");
    setEnteredPin("");
  };

  const handleQrDigitPress = (digit: string) => {
    if (enteredPin.length < 4) {
      const next = enteredPin + digit;
      setEnteredPin(next);
      if (next.length === 4) {
        setTimeout(() => {
          soundEffects.playSuccessChime();
          setQrStep("success");
        }, 300);
      }
    }
  };

  const handleBalanceDigitPress = (digit: string) => {
    if (balancePin.length < 4) {
      const next = balancePin + digit;
      setBalancePin(next);
      if (next.length === 4) {
        setTimeout(() => {
          soundEffects.playSuccessChime();
          setBalanceStep("shown");
        }, 300);
      }
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-emerald-900/15 shadow-xl overflow-hidden">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white p-6 sm:p-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-emerald-200 text-xs font-black tracking-wide uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>
                {language === "te"
                  ? "సురక్షిత అభ్యాస కేంద్రం (డబ్బు కట్ అవ్వదు)"
                  : language === "hi"
                  ? "सुरक्षित अभ्यास केंद्र (एक भी पैसा नहीं कटेगा)"
                  : "Safe Practice Lab (100% Risk Free)"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-serif">
              {language === "te"
                ? "ఫోన్ పే & బ్యాంకింగ్ నేర్చుకోండి — ఎలాంటి భయం లేకుండా!"
                : language === "hi"
                ? "स्मार्टफोन और डिजिटल पेमेंट सीखें — बिना किसी डर के!"
                : "Master Phone Payments & Safety — Without Any Fear!"}
            </h2>
            <p className="text-emerald-100/90 text-sm sm:text-base mt-1 max-w-2xl">
              {language === "te"
                ? "ఇక్కడ అసలు డబ్బు పోదు. దుకాణంలో క్యూఆర్ కోడ్ స్కాన్ చేయడం మరియు మోసాల నుండి తప్పించుకోవడం మీ చేతులతో ప్రాక్టీస్ చేయండి."
                : language === "hi"
                ? "यहाँ आपका कोई पैसा नहीं कटता। दुकान पर QR कोड स्कैन करने और ऑनलाइन फ्रॉड से बचने का खुद अभ्यास करें।"
                : "A real simulated smartphone where you can practice UPI scanning, reject fake prize traps, and master bank safety safely."}
            </p>
          </div>

          <div className="shrink-0">
            <AudioNarrationButton
              text={
                language === "te"
                  ? "ధనరక్ష ప్రాక్టీస్ ల్యాబ్‌కు స్వాగతం. ఇక్కడ మీరు ఎలాంటి భయం లేకుండా ఫోన్ పేమెంట్స్ మరియు మోసాలను కనిపెట్టడం ప్రాక్టీస్ చేయవచ్చు."
                  : language === "hi"
                  ? "धनरक्षा अभ्यास लैब में आपका स्वागत है। यहाँ आप बिना किसी डर के दुकान पर QR कोड स्कैन करना और फ्रॉड से बचना सीख सकती हैं।"
                  : "Welcome to DhanRaksha Safe Practice Lab. Practice phone payments and spot fraud scams with confidence."
              }
              label={language === "te" ? "వినండి" : language === "hi" ? "आवाज़ में सुनें" : "Listen"}
              className="bg-emerald-800 text-white hover:bg-emerald-700"
            />
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-6">
          <button
            id="tab-sim-qr"
            onClick={() => {
              setActiveMode("qr_pay");
              handleResetQr();
            }}
            className={`flex items-center gap-2 p-3 rounded-2xl font-bold text-xs sm:text-sm text-left transition-all cursor-pointer ${
              activeMode === "qr_pay"
                ? "bg-white text-emerald-950 shadow-md scale-102"
                : "bg-emerald-800/60 text-emerald-100 hover:bg-emerald-800"
            }`}
          >
            <QrCode className="w-5 h-5 shrink-0 text-emerald-600" />
            <div>
              <div className="leading-tight">
                {language === "te" ? "QR పేమెంట్" : language === "hi" ? "दुकान पर QR पे" : "Kirana QR Pay"}
              </div>
              <div className="text-[10px] opacity-75 font-normal">
                {language === "te" ? "₹20 పంపడం" : language === "hi" ? "₹20 देना सीखें" : "Practice ₹20"}
              </div>
            </div>
          </button>

          <button
            id="tab-sim-scam"
            onClick={() => {
              setActiveMode("scam_trap");
              setScamState("prompt");
            }}
            className={`flex items-center gap-2 p-3 rounded-2xl font-bold text-xs sm:text-sm text-left transition-all cursor-pointer ${
              activeMode === "scam_trap"
                ? "bg-white text-emerald-950 shadow-md scale-102"
                : "bg-emerald-800/60 text-emerald-100 hover:bg-emerald-800"
            }`}
          >
            <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />
            <div>
              <div className="leading-tight">
                {language === "te" ? "లక్కీ ప్రైజ్ మోసం" : language === "hi" ? "फर्जी लॉटरी टेस्ट" : "Fake Prize Trap"}
              </div>
              <div className="text-[10px] opacity-75 font-normal">
                {language === "te" ? "మోసం గుర్తుపట్టండి" : language === "hi" ? "पिन मांगें तो मना करें" : "Spot Fake Traps"}
              </div>
            </div>
          </button>

          <button
            id="tab-sim-balance"
            onClick={() => {
              setActiveMode("balance_check");
              setBalanceStep("ready");
              setBalancePin("");
            }}
            className={`flex items-center gap-2 p-3 rounded-2xl font-bold text-xs sm:text-sm text-left transition-all cursor-pointer ${
              activeMode === "balance_check"
                ? "bg-white text-emerald-950 shadow-md scale-102"
                : "bg-emerald-800/60 text-emerald-100 hover:bg-emerald-800"
            }`}
          >
            <ShieldCheck className="w-5 h-5 shrink-0 text-blue-600" />
            <div>
              <div className="leading-tight">
                {language === "te" ? "బ్యాలెన్స్ చెక్" : language === "hi" ? "बैंक बैलेंस देखना" : "Check Balance"}
              </div>
              <div className="text-[10px] opacity-75 font-normal">
                {language === "te" ? "ఇంటి నుంచే" : language === "hi" ? "घर बैठे चेक करें" : "View Safe Balance"}
              </div>
            </div>
          </button>

          <button
            id="tab-sim-otp"
            onClick={() => {
              setActiveMode("otp_guard");
              setOtpStep("call_rings");
            }}
            className={`flex items-center gap-2 p-3 rounded-2xl font-bold text-xs sm:text-sm text-left transition-all cursor-pointer ${
              activeMode === "otp_guard"
                ? "bg-white text-emerald-950 shadow-md scale-102"
                : "bg-emerald-800/60 text-emerald-100 hover:bg-emerald-800"
            }`}
          >
            <Lock className="w-5 h-5 shrink-0 text-red-500" />
            <div>
              <div className="leading-tight">
                {language === "te" ? "OTP రహస్యం" : language === "hi" ? "OTP रक्षा कवच" : "OTP Security"}
              </div>
              <div className="text-[10px] opacity-75 font-normal">
                {language === "te" ? "ఎవరికీ చెప్పొద్దు" : language === "hi" ? "फोन पर कभी न दें" : "Never Share OTP"}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Interactive Simulator Screen & Side Explanation */}
      <div className="p-6 sm:p-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Realistic Simulated Phone */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-[340px] bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-700 relative">
            {/* Phone Top Speaker & Notch */}
            <div className="w-32 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-10 h-1 bg-slate-700 rounded-full" />
            </div>

            {/* Inner Phone Screen */}
            <div className="bg-[#FAFBF9] rounded-[36px] overflow-hidden min-h-[500px] flex flex-col justify-between border border-slate-300">
              {/* Phone Status Bar */}
              <div className="bg-slate-100 px-5 py-2 flex items-center justify-between text-[11px] font-bold text-slate-600 border-b border-slate-200">
                <span>10:30 AM</span>
                <div className="flex items-center gap-1.5">
                  <Wifi className="w-3.5 h-3.5" />
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 rounded">4G</span>
                  <Battery className="w-4 h-4" />
                </div>
              </div>

              {/* SIMULATOR SCREEN CONTENT BY MODE */}
              <div className="p-4 flex-1 flex flex-col justify-center">
                {/* 1. QR PAYMENT PRACTICE */}
                {activeMode === "qr_pay" && (
                  <div className="text-center space-y-4">
                    {qrStep === "ready" && (
                      <div className="space-y-4 py-4">
                        <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-800 shadow-sm">
                          <QrCode className="w-10 h-10" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-lg">
                            {language === "te"
                              ? "రాధా కిరాణా దుకాణం"
                              : language === "hi"
                              ? "राधा किराना स्टोर"
                              : "Radha Kirana Store"}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">
                            {language === "te"
                              ? "చెల్లించాల్సిన మొత్తం: ₹20"
                              : language === "hi"
                              ? "सब्जी/दुकान बिल: ₹20"
                              : "Vegetable / Kirana Bill: ₹20"}
                          </p>
                        </div>

                        <button
                          id="sim-scan-now-btn"
                          onClick={() => {
                            setQrStep("scanning");
                            setTimeout(() => {
                              setQrStep("pin_entry");
                            }, 1200);
                          }}
                          className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-black rounded-2xl text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform"
                        >
                          <QrCode className="w-4 h-4" />
                          <span>
                            {language === "te"
                              ? "క్యూఆర్ స్కాన్ చేయండి"
                              : language === "hi"
                              ? "दुकान का QR स्कैन करें"
                              : "Tap to Scan QR Code"}
                          </span>
                        </button>
                      </div>
                    )}

                    {qrStep === "scanning" && (
                      <div className="py-8 space-y-4">
                        <div className="w-36 h-36 mx-auto border-4 border-dashed border-emerald-600 rounded-2xl flex items-center justify-center relative bg-emerald-50/50 animate-pulse">
                          <div className="w-28 h-28 bg-slate-900/10 rounded-xl flex items-center justify-center">
                            <QrCode className="w-16 h-16 text-emerald-800" />
                          </div>
                          <div className="absolute inset-x-2 top-1/2 h-0.5 bg-emerald-500 shadow-sm shadow-emerald-400 animate-bounce" />
                        </div>
                        <p className="text-xs font-bold text-emerald-800">
                          {language === "te"
                            ? "క్యూఆర్ కోడ్ స్కాన్ అవుతోంది..."
                            : language === "hi"
                            ? "QR कोड स्कैन हो रहा है..."
                            : "Scanning QR code safely..."}
                        </p>
                      </div>
                    )}

                    {qrStep === "pin_entry" && (
                      <div className="space-y-3">
                        <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-200">
                          <p className="text-xs text-emerald-800 font-bold">
                            {language === "te" ? "చెల్లింపు: రాధా కిరాణా" : language === "hi" ? "भुगतान: राधा किराना" : "Paying to: Radha Kirana"}
                          </p>
                          <p className="text-2xl font-black text-slate-900 mt-0.5">₹ 20.00</p>
                        </div>

                        <div className="text-center">
                          <label className="text-[11px] font-bold text-slate-600 block mb-1">
                            {language === "te"
                              ? "మీ 4-అంకెల UPI PIN నొక్కండి (ఉదా: 1234)"
                              : language === "hi"
                              ? "अपना 4-अंकों का UPI PIN दबाएं (उदा: 1234)"
                              : "Enter 4-digit UPI PIN (Dummy: 1234)"}
                          </label>

                          {/* PIN Dots Display */}
                          <div className="flex justify-center gap-3 my-2">
                            {[0, 1, 2, 3].map((i) => (
                              <div
                                key={i}
                                className={`w-4 h-4 rounded-full border-2 transition-all ${
                                  enteredPin.length > i
                                    ? "bg-emerald-700 border-emerald-700 scale-110"
                                    : "border-slate-400 bg-white"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Numeric Keypad */}
                        <div className="grid grid-cols-3 gap-2 pt-1 max-w-[220px] mx-auto">
                          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                            <button
                              key={num}
                              onClick={() => handleQrDigitPress(num)}
                              className="w-14 h-11 bg-white hover:bg-emerald-50 active:bg-emerald-100 border border-slate-200 rounded-xl font-black text-lg text-slate-800 shadow-2xs cursor-pointer"
                            >
                              {num}
                            </button>
                          ))}
                          <button
                            onClick={() => setEnteredPin("")}
                            className="w-14 h-11 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl font-bold text-xs text-slate-600 cursor-pointer"
                          >
                            Clear
                          </button>
                          <button
                            onClick={() => handleQrDigitPress("0")}
                            className="w-14 h-11 bg-white hover:bg-emerald-50 active:bg-emerald-100 border border-slate-200 rounded-xl font-black text-lg text-slate-800 shadow-2xs cursor-pointer"
                          >
                            0
                          </button>
                          <button
                            onClick={() => setEnteredPin(enteredPin.slice(0, -1))}
                            className="w-14 h-11 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl font-bold text-xs text-slate-600 cursor-pointer"
                          >
                            ⌫
                          </button>
                        </div>
                      </div>
                    )}

                    {qrStep === "success" && (
                      <div className="py-4 space-y-4 animate-in zoom-in duration-300">
                        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-600/30">
                          <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase mb-1">
                            {language === "te" ? "చెల్లింపు విజయవంతం" : language === "hi" ? "सफल भुगतान" : "Payment Successful"}
                          </span>
                          <h4 className="text-2xl font-black text-slate-900">₹ 20.00</h4>
                          <p className="text-xs font-bold text-emerald-800 mt-1">
                            {language === "te" ? "రాధా కిరాణాకు అందింది" : language === "hi" ? "राधा किराना स्टोर को प्राप्त हुए" : "Sent to Radha Kirana"}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            UPI Ref: 489201948201
                          </p>
                        </div>

                        <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-left text-xs text-emerald-900 font-medium">
                          🔊 <strong>{language === "te" ? "స్పీకర్ శబ్దం:" : language === "hi" ? "स्पीकर आवाज़:" : "Speaker Box:"}</strong>{" "}
                          {language === "te"
                            ? "\"పేటీఎం/ఫోన్‌పేలో ₹20 అందాయి\""
                            : language === "hi"
                            ? "\"पेटीएम/फोनपे पर ₹20 प्राप्त हुए\""
                            : "\"₹20 received on UPI\""}
                        </div>

                        <button
                          onClick={handleResetQr}
                          className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-800"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{language === "te" ? "మళ్లీ ప్రాక్టీస్ చేయండి" : language === "hi" ? "फिर से अभ्यास करें" : "Practice Again"}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. SCAM TRAP SIMULATION */}
                {activeMode === "scam_trap" && (
                  <div className="text-center space-y-4">
                    {scamState === "prompt" && (
                      <div className="space-y-4 py-2 animate-in fade-in duration-200">
                        {/* Fake Scam Message Card */}
                        <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-4 text-left shadow-xs">
                          <div className="flex items-center gap-2 text-red-700 font-black text-xs mb-1.5">
                            <AlertTriangle className="w-4 h-4 text-red-600" />
                            <span>{language === "te" ? "అనుమానాస్పద మెసేజ్ వచ్చింది!" : language === "hi" ? "अपरिचित मैसेज आया है!" : "Incoming Message!"}</span>
                          </div>
                          <p className="text-sm font-black text-slate-900 leading-tight">
                            {language === "te"
                              ? "🎁 అభినందనలు! మీకు ₹10,000 లక్కీ ప్రైజ్ వచ్చింది! వెంటనే మీ ఖాతాలో జమ చేసుకోవడానికి కింద UPI PIN ఎంటర్ చేయండి."
                              : language === "hi"
                              ? "🎁 बधाई! आपको ₹10,000 की लॉटरी लगी है! पैसे सीधे बैंक खाते में पाने के लिए अपना 4-अंकों का UPI PIN डालें।"
                              : "🎁 Congratulations! You won ₹10,000 prize money! Enter your 4-digit UPI PIN to claim into your bank."}
                          </p>
                        </div>

                        <p className="text-xs font-bold text-slate-700">
                          {language === "te"
                            ? "దీదీ, ఇప్పుడు మీరు ఏమి చేస్తారు?"
                            : language === "hi"
                            ? "दीदी, अब आप क्या करेंगी?"
                            : "Sister, what will you do now?"}
                        </p>

                        <div className="space-y-2 pt-1">
                          {/* WRONG ACTION BUTTON */}
                          <button
                            id="scam-wrong-btn"
                            onClick={() => {
                              soundEffects.playWarningAlert();
                              setScamState("caught");
                            }}
                            className="w-full py-3 px-3 bg-red-100 hover:bg-red-200 text-red-950 font-bold rounded-xl text-xs sm:text-sm border border-red-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                          >
                            <span>{language === "te" ? "డబ్బులు తీసుకోవడానికి PIN నొక్కండి" : language === "hi" ? "पैसे पाने के लिए अपना PIN डालूंगी" : "Enter PIN to Receive Money"}</span>
                          </button>

                          {/* RIGHT ACTION BUTTON */}
                          <button
                            id="scam-right-btn"
                            onClick={() => {
                              soundEffects.playSuccessChime();
                              setScamState("saved");
                            }}
                            className="w-full py-3 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            <span>{language === "te" ? "తిరస్కరించండి — ఇది మోసం!" : language === "hi" ? "मना करें — यह धोखाधड़ी है!" : "Reject — This is 100% Scam!"}</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {scamState === "caught" && (
                      <div className="py-2 space-y-3 animate-in zoom-in duration-200">
                        <div className="w-16 h-16 mx-auto rounded-full bg-red-600 flex items-center justify-center text-white shadow-xl shadow-red-600/30">
                          <AlertTriangle className="w-9 h-9" />
                        </div>
                        <h4 className="text-xl font-black text-red-950">
                          {language === "te" ? "ఆగండి దీదీ! నష్టపోయే ప్రమాదం!" : language === "hi" ? "रुको दीदी! बहुत बड़ा नुकसान!" : "STOP! You would lose money!"}
                        </h4>
                        <div className="bg-red-50 p-3 rounded-2xl border border-red-200 text-left text-xs text-red-900 leading-relaxed font-medium">
                          {language === "te"
                            ? "అసలు ఫోన్‌లో మీరు PIN ఎంటర్ చేసి ఉంటే మీ ఖాతాలో ఉన్న ₹10,000 దొంగల పాలయ్యేవి! గుర్తుంచుకోండి: డబ్బు తీసుకోవడానికి ఎప్పుడూ PIN అవసరం లేదు!"
                            : language === "hi"
                            ? "अगर आप असली फोन में ऐसा करतीं, तो आपके खाते से ₹10,000 कट जाते! याद रखें: पैसे प्राप्त करने के लिए कभी भी PIN नहीं डालते!"
                            : "If this was your real phone, your bank account would be emptied! You NEVER enter a PIN to receive money!"}
                        </div>

                        <button
                          onClick={() => setScamState("prompt")}
                          className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs cursor-pointer hover:bg-slate-800"
                        >
                          {language === "te" ? "మళ్లీ ప్రయత్నించండి" : language === "hi" ? "फिर से टेस्ट करें" : "Try Again Safely"}
                        </button>
                      </div>
                    )}

                    {scamState === "saved" && (
                      <div className="py-2 space-y-3 animate-in zoom-in duration-200">
                        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-600/30">
                          <Award className="w-10 h-10" />
                        </div>
                        <h4 className="text-xl font-black text-emerald-950">
                          {language === "te" ? "శభాష్ దీదీ! మీ సొమ్ము భద్రం!" : language === "hi" ? "शाबाश दीदी! पैसा बच गया!" : "Bravo! You Saved Your Money!"}
                        </h4>
                        <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-left text-xs text-emerald-900 leading-relaxed font-medium">
                          {language === "te"
                            ? "మీరు మోసాన్ని సరిగ్గా గుర్తించారు. ఎవరైనా డబ్బులు ఇస్తామంటూ PIN అడిగితే అది 100% మోసమే!"
                            : language === "hi"
                            ? "आपने बिल्कुल सही फैसला लिया! पैसे भेजने के लिए ही PIN लगता है, पैसे लेने के लिए कभी नहीं। आप पूरी तरह सुरक्षित हैं!"
                            : "You correctly spotted the trap! Only enter PIN when paying money out, never to receive prize money."}
                        </div>

                        <button
                          onClick={() => setScamState("prompt")}
                          className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs cursor-pointer hover:bg-slate-800"
                        >
                          {language === "te" ? "మరొకసారి ప్రాక్టీస్ చేయండి" : language === "hi" ? "फिर से टेस्ट करें" : "Practice Again"}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. BALANCE CHECK SIMULATION */}
                {activeMode === "balance_check" && (
                  <div className="text-center space-y-4">
                    {balanceStep === "ready" && (
                      <div className="space-y-4 py-4">
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                          <ShieldCheck className="w-9 h-9" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-base">
                            {language === "te" ? "స్టేట్ బ్యాంక్ ఆఫ్ ఇండియా (SBI)" : language === "hi" ? "भारतीय स्टेट बैंक (SBI)" : "State Bank of India (SBI)"}
                          </h4>
                          <p className="text-xs text-slate-500 font-medium">
                            {language === "te" ? "ఖాతా బ్యాలెన్స్ చూడండి" : language === "hi" ? "खाता शेष (बैलेंस) जांचें" : "Check Savings Account Balance"}
                          </p>
                        </div>

                        <button
                          onClick={() => setBalanceStep("pin")}
                          className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-black rounded-2xl text-sm shadow-md cursor-pointer transition-colors"
                        >
                          {language === "te" ? "బ్యాలెన్స్ చూడండి" : language === "hi" ? "बैलेंस चेक करें" : "Check Balance"}
                        </button>
                      </div>
                    )}

                    {balanceStep === "pin" && (
                      <div className="space-y-3">
                        <p className="text-xs font-bold text-slate-700">
                          {language === "te" ? "మీ సురక్షిత UPI PIN నొక్కండి" : language === "hi" ? "सुरक्षित UPI PIN दबाएं (1234)" : "Enter PIN to View (1234)"}
                        </p>
                        <div className="flex justify-center gap-3 my-2">
                          {[0, 1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className={`w-4 h-4 rounded-full border-2 ${
                                balancePin.length > i ? "bg-blue-700 border-blue-700" : "border-slate-400 bg-white"
                              }`}
                            />
                          ))}
                        </div>

                        <div className="grid grid-cols-3 gap-2 pt-1 max-w-[220px] mx-auto">
                          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                            <button
                              key={num}
                              onClick={() => handleBalanceDigitPress(num)}
                              className="w-14 h-11 bg-white hover:bg-blue-50 active:bg-blue-100 border border-slate-200 rounded-xl font-black text-lg text-slate-800 shadow-2xs cursor-pointer"
                            >
                              {num}
                            </button>
                          ))}
                          <button
                            onClick={() => setBalancePin("")}
                            className="w-14 h-11 bg-slate-100 border border-slate-200 rounded-xl font-bold text-xs text-slate-600"
                          >
                            Clear
                          </button>
                          <button
                            onClick={() => handleBalanceDigitPress("0")}
                            className="w-14 h-11 bg-white hover:bg-blue-50 border border-slate-200 rounded-xl font-black text-lg text-slate-800 shadow-2xs"
                          >
                            0
                          </button>
                          <button
                            onClick={() => setBalancePin(balancePin.slice(0, -1))}
                            className="w-14 h-11 bg-slate-100 border border-slate-200 rounded-xl font-bold text-xs text-slate-600"
                          >
                            ⌫
                          </button>
                        </div>
                      </div>
                    )}

                    {balanceStep === "shown" && (
                      <div className="py-4 space-y-4 animate-in zoom-in duration-200">
                        <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-2xl text-left">
                          <p className="text-[11px] font-bold text-blue-900 uppercase">
                            SBI Jan Dhan Savings Account
                          </p>
                          <p className="text-xs text-slate-500 font-medium">A/C: **** 4892</p>
                          <div className="mt-2">
                            <span className="text-xs text-slate-600">Available Balance:</span>
                            <p className="text-3xl font-black text-slate-950">₹ 4,850.00</p>
                          </div>
                        </div>

                        <p className="text-xs text-slate-600 font-medium">
                          {language === "te"
                            ? "చూశారా? బ్యాంకుకు వెళ్లకుండానే మీ డబ్బు ఎంత ఉందో మీ ఫోన్‌లోనే సులభంగా చూడవచ్చు."
                            : language === "hi"
                            ? "देखा दीदी? अब बैलेंस जानने के लिए बैंक की लाइन में खड़े होने या ऑटो का किराया लगाने की जरूरत नहीं!"
                            : "See? You can check your account balance anytime from home without standing in long bank queues."}
                        </p>

                        <button
                          onClick={() => {
                            setBalanceStep("ready");
                            setBalancePin("");
                          }}
                          className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs cursor-pointer"
                        >
                          {language === "te" ? "మళ్లీ చూడండి" : language === "hi" ? "वापस जाएं" : "Done"}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. OTP GUARD SIMULATION */}
                {activeMode === "otp_guard" && (
                  <div className="text-center space-y-4 py-2">
                    {otpStep === "call_rings" && (
                      <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto rounded-full bg-amber-500 text-white flex items-center justify-center animate-bounce shadow-md">
                          <Lock className="w-8 h-8" />
                        </div>
                        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3 text-left">
                          <p className="text-xs font-bold text-amber-900">
                            {language === "te" ? "అపరిచిత ఫోన్ కాల్:" : language === "hi" ? "अंजान फोन कॉल:" : "Unknown Phone Call:"}
                          </p>
                          <p className="text-sm font-extrabold text-slate-900 mt-1">
                            {language === "te"
                              ? "\"హలో అమ్మా, నేను మీ SBI బ్యాంక్ మేనేజర్‌ని. మీ ఏటీఎం కార్డు బంద్ అవుతోంది. మీ ఫోన్‌కి వచ్చిన 6 అంకెల OTP కోడ్ చెప్పండి.\""
                              : language === "hi"
                              ? "\"नमस्ते बहन जी, मैं स्टेट बैंक का मैनेजर बोल रहा हूँ। आपका एटीएम बंद हो रहा है। अभी मोबाइल पर 6 अंकों का OTP आया है, तुरंत बताएं।\""
                              : "\"Madam, I am calling from State Bank. Your ATM card is blocked. Read the 6-digit OTP from your SMS immediately.\""}
                          </p>
                        </div>

                        <p className="text-xs font-bold text-slate-700">
                          {language === "te" ? "మీ సమాధానం ఏమిటి?" : language === "hi" ? "आप क्या कहेंगी?" : "What will you answer?"}
                        </p>

                        <div className="space-y-2">
                          <button
                            onClick={() => {
                              soundEffects.playSuccessChime();
                              setOtpStep("refused_safe");
                            }}
                            className="w-full py-3 px-3 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-xl text-xs sm:text-sm shadow-md cursor-pointer"
                          >
                            {language === "te"
                              ? "ఎవరికీ OTP చెప్పను! కాల్ కట్ చేయండి."
                              : language === "hi"
                              ? "मैं किसी को OTP नहीं बताऊंगी! फोन काटें।"
                              : "I will NEVER tell OTP! Cut the call."}
                          </button>

                          <button
                            onClick={() => {
                              soundEffects.playWarningAlert();
                              setOtpStep("revealed_danger");
                            }}
                            className="w-full py-2.5 px-3 bg-red-100 hover:bg-red-200 text-red-950 font-bold rounded-xl text-xs border border-red-300 cursor-pointer"
                          >
                            {language === "te" ? "బ్యాంక్ మేనేజరే కదా, OTP చెప్తాను" : language === "hi" ? "बैंक मैनेजर हैं तो OTP बता देती हूँ" : "He says he is Manager, tell OTP"}
                          </button>
                        </div>
                      </div>
                    )}

                    {otpStep === "refused_safe" && (
                      <div className="space-y-3 animate-in zoom-in duration-200">
                        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <ShieldCheck className="w-10 h-10" />
                        </div>
                        <h4 className="text-lg font-black text-emerald-950">
                          {language === "te" ? "గొప్ప నిర్ణయం దీదీ!" : language === "hi" ? "शाबाश दीदी! 100% सही फैसला!" : "Superb Decision!"}
                        </h4>
                        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-left text-xs text-emerald-900 leading-relaxed font-medium">
                          {language === "te"
                            ? "అసలైన బ్యాంక్ అధికారులు ఎప్పుడూ ఫోన్‌లో OTP అడగరు. OTP అనేది మీ ఇంటి తాళం లాంటిది. దాన్ని ఎవరికీ ఇవ్వకూడదు."
                            : language === "hi"
                            ? "असली बैंक कभी भी फोन पर OTP नहीं मांगता। OTP आपके घर की तिजोरी की चाबी है। इसे किसी को न बताएं!"
                            : "Real bank managers NEVER ask for OTP on phone calls. OTP is your private house key."}
                        </div>
                        <button
                          onClick={() => setOtpStep("call_rings")}
                          className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs"
                        >
                          {language === "te" ? "మళ్లీ చూడండి" : language === "hi" ? "वापस जाएं" : "Practice Again"}
                        </button>
                      </div>
                    )}

                    {otpStep === "revealed_danger" && (
                      <div className="space-y-3 animate-in zoom-in duration-200">
                        <div className="w-16 h-16 mx-auto rounded-full bg-red-600 text-white flex items-center justify-center">
                          <AlertTriangle className="w-9 h-9" />
                        </div>
                        <h4 className="text-lg font-black text-red-950">
                          {language === "te" ? "ప్రమాదం! మోసగాడి కాల్ అది!" : language === "hi" ? "सावधान! यह ठग था!" : "Danger! That was a Fraudster!"}
                        </h4>
                        <div className="bg-red-50 border border-red-200 p-3 rounded-2xl text-left text-xs text-red-900 leading-relaxed font-medium">
                          {language === "te"
                            ? "ఏ బ్యాంక్ మేనేజర్ కూడా OTP అడగడు. మీరు OTP చెప్తే మీ ఖాతాలోని మొత్తం డబ్బులు వెంటనే డ్రా అయిపోతాయి!"
                            : language === "hi"
                            ? "कोई भी बैंक कभी फोन पर OTP नहीं मांगता। OTP बताते ही आपका पूरा पैसा गायब हो जाता!"
                            : "No real bank asks for OTP. Telling OTP gives the scammer access to empty your savings!"}
                        </div>
                        <button
                          onClick={() => setOtpStep("call_rings")}
                          className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs"
                        >
                          {language === "te" ? "మళ్లీ నేర్చుకోండి" : language === "hi" ? "फिर से सीखें" : "Try Again"}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Simulated Phone Home Bar */}
              <div className="bg-slate-100 py-2 flex justify-center border-t border-slate-200">
                <div className="w-24 h-1 bg-slate-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Educational Guide & Golden Rules */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-emerald-50/80 border-2 border-emerald-200 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                {language === "te" ? "గుర్తుంచుకోవలసిన ముఖ్య నియమం" : language === "hi" ? "याद रखने योग्य नियम" : "The Golden Rule"}
              </span>
              <AudioNarrationButton
                text={
                  activeMode === "qr_pay"
                    ? language === "te"
                      ? "క్యూఆర్ కోడ్ స్కాన్ చేసిన తర్వాత పిన్ ఎంటర్ చేస్తేనే డబ్బులు వెళ్తాయి. డబ్బులు చేరిన వెంటనే దుకాణదారుడి సౌండ్ బాక్స్ శబ్దం చేస్తుంది."
                      : language === "hi"
                      ? "QR कोड स्कैन करने के बाद जब आप अपना पिन डालती हैं, तभी पैसे जाते हैं। पैसे पहुंचते ही दुकानदार का स्पीकर बोलता है।"
                      : "When you scan a QR code and enter PIN, money is sent safely. The shop speaker confirms it immediately."
                    : activeMode === "scam_trap"
                    ? language === "te"
                      ? "డబ్బులు తీసుకోవడానికి ఎప్పుడూ పిన్ ఎంటర్ చేయకూడదు. పిన్ అనేది డబ్బులు పంపడానికి మాత్రమే!"
                      : language === "hi"
                      ? "पैसे पाने के लिए कभी भी पिन नहीं डालते! पिन केवल पैसे भेजने के लिए होता है।"
                      : "Never enter a PIN to receive money! PIN is strictly for sending money."
                    : language === "te"
                    ? "ఓటీపీ అనేది మీ ఇంటి తాళం లాంటిది. ఫోన్ కాల్‌లో ఎవరికీ చెప్పకూడదు."
                    : language === "hi"
                    ? "OTP आपके घर की चाबी जैसा है। फोन पर किसी को कभी न बताएं।"
                    : "OTP is like your private home key. Never tell anyone on a phone call."
                }
                label={language === "te" ? "వివరణ వినండి" : language === "hi" ? "नियम सुनें" : "Listen to rule"}
              />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
              {activeMode === "qr_pay"
                ? language === "te"
                  ? "QR కోడ్ అంటే ఏమిటి? సురక్షితంగా ఎలా వాడాలి?"
                  : language === "hi"
                  ? "QR कोड क्या है और दुकान पर कैसे इस्तेमाल करें?"
                  : "What is a QR Code & How to Use It Safely?"
                : activeMode === "scam_trap"
                ? language === "te"
                  ? "గోల్డెన్ రూల్: డబ్బులు రావడానికి పిన్ ఎప్పుడూ అక్కర్లేదు!"
                  : language === "hi"
                  ? "सुनहरा नियम: पैसे पाने के लिए PIN की जरूरत कभी नहीं होती!"
                  : "Golden Rule: Never Enter PIN to Receive Money!"
                : activeMode === "balance_check"
                ? language === "te"
                  ? "ఇంటి నుంచే బ్యాలెన్స్ చెక్ చేయడం వల్ల ప్రయోజనాలు"
                  : language === "hi"
                  ? "घर बैठे बैंक बैलेंस देखने के फायदे"
                  : "Benefits of Checking Balance on Your Phone"
                : language === "te"
                ? "OTP ఎందుకు ఎవరికీ చెప్పకూడదు?"
                : language === "hi"
                ? "OTP फोन पर किसी को क्यों नहीं बताना चाहिए?"
                : "Why Should You Never Share OTP?"}
            </h3>

            <div className="space-y-3 text-sm text-slate-700 leading-relaxed font-normal">
              {activeMode === "qr_pay" && (
                <>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <p><strong>{language === "te" ? "చిన్న స్లేట్ లాంటిది:" : language === "hi" ? "दुकानदार का पता:" : "Shop Address:"}</strong> {language === "te" ? "క్యూఆర్ కోడ్ అనేది దుకాణదారుడి బ్యాంక్ అడ్రస్ మాత్రమే." : language === "hi" ? "QR कोड दुकानदार के बैंक खाते का पता होता है।" : "The QR code is just the digital address of the shopkeeper."}</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <p><strong>{language === "te" ? "సరైన పేరు చూడండి:" : language === "hi" ? "दुकानदार का नाम देखें:" : "Verify Name:"}</strong> {language === "te" ? "స్కాన్ చేయగానే దుకాణం పేరు కనిపిస్తుంది." : language === "hi" ? "स्कैन करते ही स्क्रीन पर दुकानदार का नाम दिखता है।" : "Check the shop name shown on your screen."}</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-900 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <p><strong>{language === "te" ? "గ్రీన్ టిక్ అంటే అయిపోయింది:" : language === "hi" ? "हरा निशान मतलब पूरा:" : "Green Tick Confirmed:"}</strong> {language === "te" ? "ఆకుపచ్చ టిక్ కనిపించి సౌండ్ బాక్స్ మోగితే పని పూర్తయినట్టే." : language === "hi" ? "हरा टिक आते ही और साउंड बॉक्स बोलते ही पेमेंट पूरा हो जाता है।" : "When green tick appears and speaker chimes, it is complete."}</p>
                  </div>
                </>
              )}

              {activeMode === "scam_trap" && (
                <>
                  <div className="p-3 bg-red-100/70 border border-red-300 rounded-xl text-red-950 font-bold text-xs sm:text-sm">
                    {language === "te"
                      ? "⚠️ జాగ్రత్త: ఎవరైనా మీకు లాటరీ, బహుమతి లేదా ఉచిత రేషన్ ఇస్తామని PIN ఎంటర్ చేయమంటే వెంటనే కాల్ కట్ చేయండి!"
                      : language === "hi"
                      ? "⚠️ चेतावनी: यदि कोई कहे कि लॉटरी या सरकारी योजना के पैसे पाने के लिए PIN डालें, तो वह 100% चोर है!"
                      : "⚠️ Warning: If anyone tells you to enter PIN to claim lottery or prize money, it is 100% a fraud attempt!"}
                  </div>
                  <p className="text-xs text-slate-600">
                    {language === "te"
                      ? "డబ్బులు మీ అకౌంట్‌కి రావడానికి మీ మొబైల్ నంబర్ లేదా బ్యాంక్ ఖాతా నంబర్ మాత్రమే చాలు. PIN లేదా OTP అస్సలు అక్కర్లేదు."
                      : language === "hi"
                      ? "पैसे आपके खाते में आने के लिए केवल आपका फोन नंबर या बैंक खाता काफी है। PIN या OTP की कभी जरूरत नहीं होती।"
                      : "To receive money, only your phone number or account number is needed. Never enter PIN or OTP to receive money."}
                  </p>
                </>
              )}

              {activeMode === "balance_check" && (
                <>
                  <p>
                    {language === "te"
                      ? "ఇప్పుడు బ్యాలెన్స్ తెలుసుకోవడానికి కిలోమీటర్ల దూరం నడవడం, బ్యాంకులో గంటల తరబడి ఎండలో నిలబడడం అవసరం లేదు."
                      : language === "hi"
                      ? "अब बैलेंस जानने के लिए घंटों धूप में बैंक की लाइन में लगने या ऑटो का किराया खर्च करने की जरूरत नहीं।"
                      : "You don't need to walk miles or stand in hot bank queues just to check if your money arrived."}
                  </p>
                  <p className="font-semibold text-emerald-900">
                    {language === "te"
                      ? "లాడ్లీ బెహనా, రైతు భరోసా, లేదా SHG లోన్ డబ్బులు మీ అకౌంట్‌లో పడ్డాయో లేదో క్షణాల్లో చూసుకోవచ్చు."
                      : language === "hi"
                      ? "लाडली बहना, पीएम किसान, या स्वयं सहायता समूह का पैसा आया या नहीं — 5 सेकंड में घर से ही चेक करें।"
                      : "Check if PM Kisan, Ladli Behna, or SHG funds have been credited in 5 seconds."}
                  </p>
                </>
              )}

              {activeMode === "otp_guard" && (
                <>
                  <p>
                    {language === "te"
                      ? "OTP (వన్ టైమ్ పాస్‌వర్డ్) అనేది 6 అంకెల రహస్య కోడ్. ఇది మీ ఇంట్లో బీరువా తాళం చెవి లాంటిది."
                      : language === "hi"
                      ? "OTP (वन टाइम पासवर्ड) 6 अंकों का गुप्त कोड होता है। यह आपके घर की तिजोरी की चाबी जैसा है।"
                      : "OTP is a 6-digit secret lock code. It is like the master key to your home cash box."}
                  </p>
                  <div className="bg-amber-100/70 p-3 rounded-xl border border-amber-300 text-amber-950 font-bold text-xs">
                    {language === "te"
                      ? "పోలీసు, కలెక్టర్, బ్యాంక్ మేనేజర్ అని ఎవరైనా ఫోన్ చేసినా సరే — OTP మాత్రం ఎప్పటికీ చెప్పొద్దు!"
                      : language === "hi"
                      ? "पुलिस, बैंक मैनेजर या सरकारी अधिकारी बनकर कोई भी फोन करे — OTP कभी किसी को न बताएं!"
                      : "Even if someone claims to be a Police Officer or Bank Manager, NEVER tell your OTP!"}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="bg-slate-900 text-white p-5 rounded-3xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white shrink-0 font-black text-lg">
                1930
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  {language === "te" ? "సైబర్ మోసాల హెల్ప్‌లైన్" : language === "hi" ? "राष्ट्रीय साइबर हेल्पलाइन" : "National Cyber Helpline"}
                </p>
                <p className="text-sm font-extrabold text-white">
                  {language === "te" ? "డబ్బులు మోసపోతే వెంటనే 1930 కి కాల్ చేయండి" : language === "hi" ? "धोखाधड़ी होते ही तुरंत 1930 पर कॉल करें" : "Dial 1930 immediately if money is stolen"}
                </p>
              </div>
            </div>

            <a
              href="tel:1930"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xs rounded-xl whitespace-nowrap shadow-md"
            >
              {language === "te" ? "1930 కాల్" : language === "hi" ? "1930 कॉल करें" : "Call 1930"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
