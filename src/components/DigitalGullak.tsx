import React, { useState } from "react";
import {
  Coins,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Award,
  RotateCcw,
  CheckCircle2,
  Info,
  Building2,
  AlertCircle,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { AudioNarrationButton } from "./AudioNarrationButton";
import { soundEffects } from "../utils/audioEffects";

export const DigitalGullak: React.FC = () => {
  const { language } = useApp();
  const [dailySavings, setDailySavings] = useState<number>(30);
  const [recentCoin, setRecentCoin] = useState<number | null>(null);

  const addCoin = (val: number) => {
    soundEffects.playCoinClink();
    setRecentCoin(val);
    setDailySavings((prev) => Math.min(prev + val, 1000));
    setTimeout(() => setRecentCoin(null), 600);
  };

  const monthly = dailySavings * 30;
  const yearly = dailySavings * 365;
  const threeYearsWithInterest = Math.round(yearly * 3 * 1.15);

  return (
    <div className="bg-white rounded-3xl border-2 border-emerald-900/15 shadow-xl overflow-hidden">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-6 sm:p-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-black uppercase tracking-wide mb-2">
              <Coins className="w-3.5 h-3.5" />
              <span>
                {language === "te"
                  ? "డిజిటల్ పొదుపు కుండ"
                  : language === "hi"
                  ? "डिजिटल गुल्लक कैलकुलेटर"
                  : "Interactive Digital Gullak"}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-serif">
              {language === "te"
                ? "చిన్న పొదుపు — పెద్ద ప్రయోజనం!"
                : language === "hi"
                ? "रोज़ की छोटी बचत — कल का बड़ा सहारा!"
                : "Small Daily Drops — Big Future Security!"}
            </h2>
            <p className="text-amber-100 text-sm sm:text-base mt-1 max-w-xl">
              {language === "te"
                ? "కాయిన్స్ పై నొక్కి గుల్లకులో వేయండి. ప్రతిరోజూ కొద్దిగా దాస్తే ఏడాదికి ఎంత పెద్ద మొత్తం అవుతుందో మీరే చూడండి!"
                : language === "hi"
                ? "सिक्कों पर क्लिक करके गुल्लक में डालें। देखें कि रोज ₹30 बचाने से साल भर में कितना बड़ा पैसा तैयार हो जाता है!"
                : "Drop coins into the Gullak. See how even ₹30 a day transforms into financial independence for your family."}
            </p>
          </div>

          <AudioNarrationButton
            text={
              language === "te"
                ? "డిజిటల్ గుల్లకులో ప్రతిరోజూ మీరు పొదుపు చేసే చిన్న మొత్తం ఏడాదికి పది వేల రూపాయలకు పైగా మారుతుంది. ఇంట్లో కాకుండా బ్యాంకులో పొదుపు చేస్తే వడ్డీ కూడా వస్తుంది."
                : language === "hi"
                ? "रोज़ सिर्फ तीस या पचास रुपये बचाने से साल भर में दस हजार से ज्यादा की बचत हो जाती है। इसे बैंक में जमा करने पर ब्याज भी मिलता है।"
                : "Saving just thirty to fifty rupees a day adds up to over ten thousand rupees a year with bank interest."
            }
            label={language === "te" ? "పొదుపు సూత్రం వినండి" : language === "hi" ? "बचत का नियम सुनें" : "Listen"}
            className="bg-amber-900/80 text-white hover:bg-amber-900"
          />
        </div>
      </div>

      <div className="p-6 sm:p-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Interactive Clay Gullak Pot Visual */}
        <div className="lg:col-span-6 flex flex-col items-center text-center space-y-5">
          {/* Animated Gullak Container */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 bg-gradient-to-b from-amber-100 to-orange-50 rounded-full border-4 border-amber-300 shadow-inner flex flex-col items-center justify-center p-6">
            {/* Slot */}
            <div className="w-16 h-3 bg-amber-950 rounded-full shadow-md mb-2 relative">
              {recentCoin && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-400 border border-amber-600 text-amber-950 font-black text-xs px-2 py-0.5 rounded-full shadow-lg animate-bounce">
                  +₹{recentCoin}
                </div>
              )}
            </div>

            {/* Clay Piggy Pot / Clay Pot Art */}
            <div className="text-6xl sm:text-7xl select-none filter drop-shadow-md">
              🏺
            </div>

            <div className="mt-2">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block">
                {language === "te" ? "రోజువారీ పొదుపు" : language === "hi" ? "रोज़ की बचत" : "Daily Savings"}
              </span>
              <p className="text-3xl sm:text-4xl font-black text-slate-900 font-serif">
                ₹ {dailySavings}
              </p>
            </div>

            <button
              onClick={() => setDailySavings(30)}
              title="Reset"
              className="mt-1 text-[11px] font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{language === "te" ? "రీసెట్ చేయండి" : language === "hi" ? "रीसेट करें" : "Reset"}</span>
            </button>
          </div>

          {/* Coin Clicker Row */}
          <div>
            <p className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2">
              {language === "te" ? "కాయిన్స్ నొక్కి గుల్లకులో వేయండి:" : language === "hi" ? "सिक्के दबाकर गुल्लक में डालें:" : "Tap to add coins:"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {[10, 20, 50, 100].map((val) => (
                <button
                  key={val}
                  onClick={() => addCoin(val)}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 border-2 border-amber-500 shadow-md hover:scale-105 active:scale-95 text-amber-950 font-black text-sm sm:text-base flex flex-col items-center justify-center cursor-pointer transition-transform"
                >
                  <span className="text-[10px] opacity-75 leading-none">₹</span>
                  <span>{val}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: What this savings achieves */}
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            {/* 1 Month */}
            <div className="bg-emerald-50 border-2 border-emerald-200 p-4 rounded-2xl">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                {language === "te" ? "1 నెలలో" : language === "hi" ? "1 महीने में" : "In 1 Month"}
              </span>
              <p className="text-2xl sm:text-3xl font-black text-emerald-950 font-serif mt-0.5">
                ₹ {monthly.toLocaleString("en-IN")}
              </p>
              <p className="text-[11px] text-emerald-800/80 mt-1 font-medium">
                {language === "te" ? "పిల్లల పుస్తకాలు, నిత్యావసరాలు" : language === "hi" ? "बच्चों की स्कूल फीस, राशन" : "School fees, groceries"}
              </p>
            </div>

            {/* 1 Year */}
            <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                {language === "te" ? "1 సంవత్సరంలో" : language === "hi" ? "1 साल में" : "In 1 Year"}
              </span>
              <p className="text-2xl sm:text-3xl font-black text-amber-950 font-serif mt-0.5">
                ₹ {yearly.toLocaleString("en-IN")}
              </p>
              <p className="text-[11px] text-amber-800/80 mt-1 font-medium">
                {language === "te" ? "విత్తనాలు, వైద్యం, అత్యవసర నిధి" : language === "hi" ? "खेती की खाद-बीज, इमरजेंसी" : "Seeds, farming, emergency fund"}
              </p>
            </div>
          </div>

          {/* 3 Years with Bank Interest */}
          <div className="bg-gradient-to-r from-teal-800 to-emerald-900 text-white p-5 rounded-2xl shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-teal-200 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                {language === "te" ? "బ్యాంకులో వేస్తే 3 ఏళ్లలో (వడ్డీతో)" : language === "hi" ? "बैंक में 3 साल बाद (ब्याज सहित)" : "In 3 Years with Bank Interest"}
              </span>
              <span className="text-[10px] bg-teal-400/20 text-teal-200 font-bold px-2 py-0.5 rounded">
                + Bank Interest
              </span>
            </div>
            <p className="text-3xl sm:text-4xl font-black font-serif mt-1">
              ₹ {threeYearsWithInterest.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-teal-100/90 mt-1">
              {language === "te"
                ? "ఇది మీ సొంత కుట్టుమిషన్, పాడి ఆవు లేదా చిన్న దుకాణానికి సరిపోతుంది!"
                : language === "hi"
                ? "इस पैसे से आप अपनी सिलाई मशीन, दुधारू गाय या अपनी दुकान शुरू कर सकती हैं!"
                : "Enough to buy a sewing machine, dairy livestock, or start a village shop!"}
            </p>
          </div>

          {/* Comparison Table: Ghar vs Bank */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <div className="grid grid-cols-2 bg-slate-100 font-black text-slate-800 p-2.5 border-b border-slate-200 text-center">
              <div className="flex items-center justify-center gap-1 text-slate-600">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === "te" ? "ఇంట్లో దాస్తే" : language === "hi" ? "घर/डिब्बे में नकद" : "Cash at Home"}</span>
              </div>
              <div className="flex items-center justify-center gap-1 text-emerald-800 font-black">
                <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === "te" ? "జన్ ధన్ బ్యాంక్ ఖాతాలో" : language === "hi" ? "जन धन बैंक खाते में" : "Jan Dhan Bank Account"}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 p-3 gap-3">
              <div className="space-y-1.5 text-slate-600">
                <p>❌ {language === "te" ? "0% వడ్డీ (పైసా పెరగదు)" : language === "hi" ? "0% ब्याज (पैसा नहीं बढ़ता)" : "0% interest (money never grows)"}</p>
                <p>❌ {language === "te" ? "దొంగతనం, చెదలు పట్టే భయం" : language === "hi" ? "चोरी या दीमक लगने का डर" : "Risk of theft or damage"}</p>
                <p>❌ {language === "te" ? "ఎలాంటి ఉచిత బీమా ఉండదు" : language === "hi" ? "कोई दुर्घटना बीमा नहीं" : "No insurance cover"}</p>
              </div>

              <div className="space-y-1.5 text-emerald-950 font-bold bg-emerald-50/50 p-2 rounded-xl border border-emerald-200">
                <p>✅ {language === "te" ? "వడ్డీతో డబ్బు పెరుగుతుంది" : language === "hi" ? "ब्याज के साथ पैसा बढ़ता है" : "Earns interest safely"}</p>
                <p>✅ {language === "te" ? "100% సురక్షితం & భద్రం" : language === "hi" ? "100% सुरक्षित और चोरी से मुक्त" : "100% government safe"}</p>
                <p>✅ {language === "te" ? "రూ. 2 లక్షల ఉచిత రూపే బీమా" : language === "hi" ? "₹2 लाख का मुफ्त रूपे बीमा" : "Free ₹2 Lakh RuPay insurance"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
