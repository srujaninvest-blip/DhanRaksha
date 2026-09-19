import React from "react";
import {
  Sparkles,
  ArrowRight,
  Bot,
  PieChart,
  Target,
  BookOpen,
  ShieldCheck,
  CheckCircle,
  TrendingUp,
  Award,
  PhoneCall,
  Volume2,
  Smartphone,
  Coins,
  Lock,
  Bell,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useApp } from "../context/AppContext";
import { AudioNarrationButton } from "../components/AudioNarrationButton";
import { PracticeSimulator } from "../components/PracticeSimulator";
import { FourGoldenRules } from "../components/FourGoldenRules";
import { DigitalGullak } from "../components/DigitalGullak";

export const HomePage: React.FC = () => {
  const { openChat, setActivePage, language, t, goals, userProfile, isLoggedIn, openAuthModal } = useApp();

  // Calculate goal milestones for notifications
  const completedGoals = goals.filter((g) => g.currentAmount >= g.targetAmount);
  const inProgressGoals = goals.filter((g) => g.currentAmount < g.targetAmount);
  const totalSaved = goals.reduce((acc, g) => acc + g.currentAmount, 0);
  const totalTarget = goals.reduce((acc, g) => acc + g.targetAmount, 0);
  const overallProgress = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  const realLifeQuestions = [
    {
      qEn: "How do I pay at the vegetable shop using QR code safely?",
      qTe: "కూరగాయల దుకాణంలో క్యూఆర్ కోడ్ ద్వారా సురక్షితంగా ఎలా చెల్లించాలి?",
      qHi: "सब्जी की दुकान पर QR कोड से बिना डर के सुरक्षित पेमेंट कैसे करें?",
      category: "Digital Literacy",
    },
    {
      qEn: "Someone called asking for 6-digit OTP for lottery. Is it real?",
      qTe: "లాటరీ వచ్చిందని 6 అంకెల OTP అడుగుతున్నారు. ఇది నిజమేనా?",
      qHi: "किसी ने फोन पर 6 अंकों का OTP मांगा और लॉटरी का वादा किया, क्या यह सच है?",
      category: "Fraud Alert",
    },
    {
      qEn: "How can I save ₹30 every day and grow it in bank?",
      qTe: "ప్రతిరోజూ ₹30 ఎలా పొదుపు చేసి బ్యాంకులో పెంచుకోవచ్చు?",
      qHi: "रोज़ ₹30 बचाकर बैंक में कैसे जमा करें और ब्याज पाएं?",
      category: "Digital Gullak",
    },
    {
      qEn: "Which government schemes give loans for women SHGs?",
      qTe: "మహిళా స్వయం సహాయక సంఘాలకు ఏ ప్రభుత్వ పథకాల్లో రుణాలు లభిస్తాయి?",
      qHi: "महिला स्वयं सहायता समूह (SHG) के लिए कौन-सी सरकारी योजनाएं हैं?",
      category: "Govt Schemes",
    },
  ];

  const triggerCelebrate = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#047857", "#0D9488", "#F59E0B", "#10B981"],
    });
  };

  const notificationNarrationText =
    language === "te"
      ? `ధనరక్ష నోటిఫికేషన్లు: ${
          completedGoals.length > 0
            ? `అభినందనలు! మీ లక్ష్యం ${completedGoals[0].nameTe || completedGoals[0].name} 100 శాతం పూర్తయింది.`
            : `మీ కుటుంబ పొదుపు లక్ష్యాలలో మొత్తం ₹${totalSaved} జమ అయింది.`
        } భద్రతా హెచ్చరిక: డబ్బు లేదా సబ్సిడీ తీసుకోవడానికి ఎప్పటికీ UPI పిన్ లేదా OTP ఎవరికీ చెప్పకూడదు. ఏదైనా అనుమానం ఉంటే 1930 హెల్ప్‌లైన్‌కు కాల్ చేయండి.`
      : language === "hi"
      ? `धनरक्षा सूचनाएं: ${
          completedGoals.length > 0
            ? `बधाई हो! आपका लक्ष्य ${completedGoals[0].nameHi || completedGoals[0].name} 100% पूरा हो गया है।`
            : `आपके कुल बचत लक्ष्यों में ₹${totalSaved} जमा हो चुके हैं।`
        } सुरक्षा चेतावनी: सरकारी सब्सिडी या पैसे पाने के लिए कभी भी यूपीआई पिन या ओटीपी न डालें। किसी भी फ्रॉड पर 1930 डायल करें।`
      : `DhanRaksha Notifications: ${
          completedGoals.length > 0
            ? `Congratulations! Your goal ${completedGoals[0].name} is 100% achieved.`
            : `You have saved ₹${totalSaved} towards family targets.`
        } Security Alert: You never need to enter your UPI PIN or share OTP to receive money or subsidies. Call 1930 in emergency.`;

  const primaryGoal = completedGoals.length > 0 ? completedGoals[0] : inProgressGoals[0] || goals[0];
  const primaryGoalName = primaryGoal
    ? language === "te"
      ? primaryGoal.nameTe || primaryGoal.name
      : language === "hi"
      ? primaryGoal.nameHi || primaryGoal.name
      : primaryGoal.name
    : language === "te"
    ? "పిల్లల ఉన్నత చదువు నిధి"
    : language === "hi"
    ? "बच्चों की उच्च शिक्षा"
    : "Children's Higher Education";

  const primaryProgress =
    primaryGoal && primaryGoal.targetAmount > 0
      ? Math.min(100, Math.round((primaryGoal.currentAmount / primaryGoal.targetAmount) * 100))
      : 0;
  const primaryRemaining = primaryGoal ? Math.max(0, primaryGoal.targetAmount - primaryGoal.currentAmount) : 0;
  const isPrimaryGoalCompleted = primaryGoal ? primaryGoal.currentAmount >= primaryGoal.targetAmount : false;

  const savingGoalAlertNarration =
    language === "te"
      ? `పొదుపు లక్ష్యం అలర్ట్: మీ ${primaryGoalName} లక్ష్యంలో ఇప్పటివరకు ₹${primaryGoal?.currentAmount.toLocaleString("en-IN") || 0} పొదుపు చేశారు. లక్ష్యం పూర్తి కావడానికి ఇంకా ₹${primaryRemaining.toLocaleString("en-IN")} అవసరం. మొత్తం పురోగతి ${primaryProgress} శాతం. క్రమం తప్పకుండా పొదుపు చేయడం ద్వారా మీ కలలను సులభంగా నెరవేర్చుకోవచ్చు.`
      : language === "hi"
      ? `बचत लक्ष्य अलर्ट: आपके ${primaryGoalName} लक्ष्य में अब तक ₹${primaryGoal?.currentAmount.toLocaleString("en-IN") || 0} जमा हो चुके हैं। लक्ष्य पूरा करने के लिए अभी ₹${primaryRemaining.toLocaleString("en-IN")} बाकी हैं। कुल प्रगति ${primaryProgress}% है। नियमित बचत से अपने परिवार के सपने पूरे करें।`
      : `Savings Goal Alert: You have saved ₹${primaryGoal?.currentAmount.toLocaleString("en-IN") || 0} towards ${primaryGoalName}. ₹${primaryRemaining.toLocaleString("en-IN")} remaining to reach your target. Progress is ${primaryProgress}%. Keep saving regularly to reach your family dreams.`;

  return (
    <div className="space-y-10 sm:space-y-14 py-6 sm:py-10">
      {/* 1. Hero Section - Warm, Relatable & Accessible for Rural Women (DhanRaksha ONLY, NO Sakhi) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-950 text-xs font-black tracking-wide shadow-2xs">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>
                {language === "te"
                  ? "గ్రామీణ మహిళల డిజిటల్ & ఆర్థిక సాధికారత"
                  : language === "hi"
                  ? "ग्रामीण महिलाओं का डिजिटल रक्षा कवच"
                  : "Empowering Rural Women Across India"}
              </span>
            </div>

            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight font-serif leading-[1.15]">
                {language === "te" ? (
                  <>
                    ధనరక్ష <span className="text-emerald-800 font-sans">DhanRaksha</span>
                  </>
                ) : language === "hi" ? (
                  <>
                    धनरक्षा <span className="text-emerald-800 font-sans">DhanRaksha</span>
                  </>
                ) : (
                  <>
                    <span className="text-emerald-900 font-serif">DhanRaksha</span>
                  </>
                )}
              </h1>
              <p className="text-xl sm:text-2xl font-black text-emerald-800 mt-2">
                {language === "te"
                  ? "\"నేర్చుకోండి. ప్లాన్ చేయండి. పొదుపు చేయండి. ఎదగండి.\""
                  : language === "hi"
                  ? "\"सुरक्षित पैसा. स्मार्ट फोन. सशक्त नारी।\""
                  : "\"Learn. Plan. Save. Grow.\""}
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              {language === "te"
                ? "డిజిటల్ బ్యాంకింగ్, స్మార్ట్‌ఫోన్ పేమెంట్స్ మరియు ఆన్‌లైన్ మోసాల నుండి రక్షణ — మీ భాషలో సులభంగా నేర్చుకోండి. ఎలాంటి భయం లేకుండా మీ చేతులతో ప్రాక్టీస్ చేయండి!"
                : language === "hi"
                ? "स्मार्टफोन पेमेंट, बैंक खाता, और ऑनलाइन फ्रॉड से बचने की पूरी जानकारी — आपकी अपनी भाषा में। बिना किसी डर या झिझक के खुद चलाकर सीखें!"
                : "A friendly digital companion designed so that rural women anywhere in India can overcome fear of smartphones, UPI payments, and banking fraud."}
            </p>

            {/* Audio narrator for hero message */}
            <div className="flex items-center justify-center lg:justify-start gap-2 pt-1">
              <AudioNarrationButton
                text={
                  language === "te"
                    ? "ధనరక్షకు స్వాగతం. ఇక్కడ గ్రామీణ మహిళలు తమ స్మార్ట్‌ఫోన్ ద్వారా సురక్షితంగా బ్యాంకింగ్ మరియు డిజిటల్ పేమెంట్స్ నేర్చుకోవచ్చు. మోసాల నుండి మీ సొమ్మును కాపాడుకోండి."
                    : language === "hi"
                    ? "धनरक्षा में आपका स्वागत है। यहाँ हर ग्रामीण बहन बिना किसी डर के स्मार्टफोन से पैसे भेजना, बैंक बैलेंस देखना और फर्जी कॉल से बचना सीख सकती हैं।"
                    : "Welcome to DhanRaksha. Built so every rural woman can master digital payments and protect her hard-earned money safely."
                }
                label={language === "te" ? "పరిచయం వినండి" : language === "hi" ? "आवाज़ में सुनें" : "Listen to intro"}
                className="bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                id="hero-get-started-btn"
                onClick={() => {
                  const el = document.getElementById("practice-lab-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl font-black text-base shadow-lg shadow-emerald-800/25 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <Smartphone className="w-5 h-5" />
                <span>
                  {language === "te"
                    ? "ఫోన్ పేమెంట్ ప్రాక్టీస్ చేయండి"
                    : language === "hi"
                    ? "सुरक्षित फोन अभ्यास शुरू करें"
                    : "Try Safe Phone Lab"}
                </span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-ask-ai-ruralfin-btn"
                onClick={() => openChat()}
                className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-emerald-50 text-emerald-950 border-2 border-emerald-700 rounded-2xl font-black text-base shadow-xs flex items-center justify-center gap-2.5 active:scale-95 transition-all cursor-pointer"
              >
                <Bot className="w-5 h-5 text-emerald-700" />
                <span>
                  {language === "te"
                    ? "ధనరక్ష AI తో మాట్లాడండి"
                    : language === "hi"
                    ? "धनरक्षा AI से पूछें"
                    : "Ask DhanRaksha AI"}
                </span>
              </button>
            </div>

            {/* Modern Authentication Callout & Connected Website Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl border-2 bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-amber-50/60 border-emerald-300/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center font-black shadow-xs shrink-0">
                  {isLoggedIn ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-amber-300" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-emerald-950">
                      {isLoggedIn
                        ? language === "te"
                          ? `ఖాతా అనుసంధానించబడింది: ${userProfile.name}`
                          : language === "hi"
                          ? `खाता कनेक्टेड: ${userProfile.name}`
                          : `Account Connected: ${userProfile.name}`
                        : language === "te"
                        ? "AI వాయిస్ సహాయంతో లాగిన్ అవ్వండి"
                        : language === "hi"
                        ? "AI आवाज़ गाइड के साथ लॉगिन करें"
                        : "AI Voice Guided Login"}
                    </span>
                    <span className="bg-emerald-200/80 text-emerald-900 text-[10px] font-black px-2 py-0.2 rounded-full">
                      {isLoggedIn ? "ONLINE" : "OTP & GMAIL"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    {isLoggedIn
                      ? language === "te"
                        ? `నెల ఆదాయం ₹${userProfile.income.toLocaleString("en-IN")} • ${userProfile.phone ? "+91 " + userProfile.phone : userProfile.email || "గూగుల్ ఖాతా"}`
                        : language === "hi"
                        ? `मासिक आय ₹${userProfile.income.toLocaleString("en-IN")} • ${userProfile.phone ? "+91 " + userProfile.phone : userProfile.email || "गूगल खाता"}`
                        : `Monthly Income ₹${userProfile.income.toLocaleString("en-IN")} • ${userProfile.phone ? "+91 " + userProfile.phone : userProfile.email || "Google Connected"}`
                      : language === "te"
                      ? "ఫోన్ OTP లేదా జీమెయిల్ ఉపయోగించండి. మా వాయిస్ అసిస్టెంట్ 3 భాషలలో మార్గదర్శనం చేస్తుంది."
                      : language === "hi"
                      ? "फ़ोन ओटीपी या जीमेल से लॉगिन करें। AI आवाज़ गाइड 3 भाषाओं में मदद करेगा।"
                      : "Login with Phone OTP or Gmail. AI voice assistant guides your name & salary."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                {isLoggedIn ? (
                  <button
                    onClick={() => setActivePage("profile")}
                    className="w-full sm:w-auto px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all"
                  >
                    {language === "te" ? "ప్రొఫైల్ చూడండి →" : language === "hi" ? "प्रोफ़ाइल देखें →" : "View Profile →"}
                  </button>
                ) : (
                  <button
                    onClick={openAuthModal}
                    className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 text-xs font-black rounded-xl shadow-xs cursor-pointer transition-all active:scale-95"
                  >
                    {language === "te" ? "ఇప్పుడే లాగిన్ అవ్వండి" : language === "hi" ? "अभी लॉगिन करें" : "Login / Connect Now"}
                  </button>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                {language === "te" ? "100% ఉచితం & సురక్షితం" : language === "hi" ? "100% मुफ्त व सुरक्षित" : "100% Free & Safe"}
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800">
                <Volume2 className="w-4 h-4 text-emerald-600 shrink-0" />
                {language === "te" ? "ప్రతి మాటా గొంతుతో వినవచ్చు" : language === "hi" ? "हर बात आवाज़ में उपलब्ध" : "Full Voice Audio"}
              </span>
              <span className="flex items-center gap-1.5 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                {language === "te" ? "పైసా కట్ అవ్వదు" : language === "hi" ? "एक भी रुपया नहीं कटेगा" : "Zero Risk Practice"}
              </span>
            </div>
          </div>

          {/* Right Column: Dedicated Savings Goal Alert Hub */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 p-5 sm:p-6 rounded-3xl shadow-2xl text-white relative overflow-hidden border-2 border-amber-400/30 space-y-4">
                {/* Header with Saving Goal Title, Live Badge and Audio Narration */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center font-black text-amber-300 text-lg">
                      <Target className="w-5 h-5 text-amber-400 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-sm text-white">
                          {language === "te"
                            ? "పొదుపు లక్ష్యం అలర్ట్"
                            : language === "hi"
                            ? "बचत लक्ष्य अलर्ट"
                            : "Savings Goal Alert"}
                        </h4>
                        <span className="inline-flex items-center gap-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                          {isPrimaryGoalCompleted ? "COMPLETED" : "TARGET ALERT"}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-200/90 font-medium">
                        {language === "te"
                          ? "కుటుంబ పొదుపు పురోగతి & తాజా అప్‌డేట్"
                          : language === "hi"
                          ? "पारिवारिक बचत लक्ष्य और प्रगति"
                          : "Family milestone progress & monthly target"}
                      </p>
                    </div>
                  </div>

                  <AudioNarrationButton
                    text={savingGoalAlertNarration}
                    size="sm"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  />
                </div>

                {/* Primary Saving Goal Alert Box */}
                <div className="bg-emerald-950/50 border border-emerald-500/30 rounded-2xl p-4 text-white space-y-3.5 shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-900/80 border border-emerald-500/30 px-2.5 py-0.5 rounded-md flex items-center gap-1.5">
                      <Target className="w-3 h-3 text-emerald-400" />
                      {primaryGoal?.category || "Savings"}
                    </span>
                    <span className="text-xs font-black text-emerald-300 bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                      {primaryProgress}% {language === "te" ? "పూర్తయింది" : language === "hi" ? "पूरा" : "Achieved"}
                    </span>
                  </div>

                  <div>
                    <h5 className="text-base font-black text-white leading-tight">
                      {primaryGoalName}
                    </h5>
                    <p className="text-xs text-emerald-200/80 mt-1">
                      {isPrimaryGoalCompleted
                        ? language === "te"
                          ? "అభినందనలు! మీరు నిర్ణయించుకున్న లక్ష్యం 100% పూర్తయింది."
                          : language === "hi"
                          ? "बधाई हो! आपका बचत लक्ष्य 100% पूरा हो गया है।"
                          : "Congratulations! Your savings goal target is 100% achieved."
                        : language === "te"
                        ? `లక్ష్యం చేరుకోవడానికి ఇంకా ₹${primaryRemaining.toLocaleString("en-IN")} అవసరం.`
                        : language === "hi"
                        ? `लक्ष्य पूरा करने के लिए अभी ₹${primaryRemaining.toLocaleString("en-IN")} बाकी हैं।`
                        : `₹${primaryRemaining.toLocaleString("en-IN")} remaining to reach full target.`}
                    </p>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="w-full bg-slate-800/80 rounded-full h-3 p-0.5 border border-emerald-500/30 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(6, primaryProgress)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-emerald-200/90 font-medium">
                      <span>
                        {language === "te" ? "పొదుపు:" : language === "hi" ? "जमा:" : "Saved:"}{" "}
                        <strong className="text-white">₹{(primaryGoal?.currentAmount ?? 0).toLocaleString("en-IN")}</strong>
                      </span>
                      <span>
                        {language === "te" ? "లక్ష్యం:" : language === "hi" ? "लक्ष्य:" : "Target:"}{" "}
                        <strong className="text-white">₹{(primaryGoal?.targetAmount ?? 0).toLocaleString("en-IN")}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Goal Alert Notification Callout */}
                  <div className="bg-slate-900/80 border border-amber-400/25 rounded-xl p-3 flex items-start gap-2.5">
                    <Coins className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-[11px] text-amber-100/90 leading-relaxed">
                      <strong className="text-amber-300 font-bold block mb-0.5">
                        {language === "te"
                          ? "పొదుపు అలర్ట్ సూచన:"
                          : language === "hi"
                          ? "बचत अलर्ट सुझाव:"
                          : "Goal Action Alert:"}
                      </strong>
                      {isPrimaryGoalCompleted
                        ? language === "te"
                          ? "మీరు ఈ లక్ష్యాన్ని సాధించారు! ఇప్పుడు కొత్త లక్ష్యాన్ని నిర్దేశించుకోండి లేదా అత్యవసర నిధికి జోడించండి."
                          : language === "hi"
                          ? "आपने यह लक्ष्य पूरा कर लिया है! नया लक्ष्य जोड़ें या आपातकालीन निधि में बचत करें।"
                          : "You have achieved this goal! Set a new goal or boost your emergency safety fund."
                        : language === "te"
                        ? `ప్రతి నెలా ₹${(primaryGoal?.monthlyContribution || 2000).toLocaleString("en-IN")} (రోజుకు సుమారు ₹${Math.round((primaryGoal?.monthlyContribution || 2000) / 30)}) జమ చేస్తే గడువులోగా లక్ష్యం సులభంగా పూర్తవుతుంది.`
                        : language === "hi"
                        ? `हर महीने ₹${(primaryGoal?.monthlyContribution || 2000).toLocaleString("en-IN")} (रोज़ाना लगभग ₹${Math.round((primaryGoal?.monthlyContribution || 2000) / 30)}) जमा करके आप समय पर लक्ष्य पूरा कर सकते हैं।`
                        : `Depositing ₹${(primaryGoal?.monthlyContribution || 2000).toLocaleString("en-IN")}/month (~₹${Math.round((primaryGoal?.monthlyContribution || 2000) / 30)}/day) keeps this goal on track.`}
                    </div>
                  </div>

                  {/* Active Goals Metric */}
                  {goals.length > 1 && (
                    <div className="pt-1 flex items-center justify-between text-[11px] text-slate-300 font-medium">
                      <span>
                        🎯 {goals.length} {language === "te" ? "మొత్తం లక్ష్యాలు" : language === "hi" ? "कुल लक्ष्य" : "Total Goals"}
                      </span>
                      <span className="text-emerald-300 font-bold">
                        ₹{totalSaved.toLocaleString("en-IN")} / ₹{totalTarget.toLocaleString("en-IN")} ({overallProgress}%)
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Footer with Direct Action to View Goals */}
                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <span className="text-[11px] text-emerald-200/80 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {language === "te" ? "డిజిటల్ పొదుపు ట్రాకర్" : language === "hi" ? "सुरक्षित डिजिटल बचत" : "Auto Savings Tracker"}
                  </span>

                  <button
                    onClick={() => setActivePage("goals")}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 font-black text-xs transition-all shadow-md cursor-pointer active:scale-95"
                  >
                    <span>
                      {language === "te" ? "లక్ష్యాలు చూడండి" : language === "hi" ? "बचत लक्ष्य देखें" : "View Goals"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IMPORTANT NOTIFICATIONS & MILESTONE ALERTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border-2 border-emerald-800/15 shadow-sm p-6 sm:p-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                <Bell className="w-5 h-5 text-amber-800" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 font-serif">
                    {language === "te"
                      ? "ముఖ్యమైన నోటిఫికేషన్లు & హెచ్చరికలు"
                      : language === "hi"
                      ? "महत्वपूर्ण सूचनाएं और अलर्ट"
                      : "Important Notifications & Alerts"}
                  </h2>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {language === "te"
                    ? "మీ పొదుపు లక్ష్యాల మైలురాళ్ళు & డిజిటల్ భద్రతా సమాచారం"
                    : language === "hi"
                    ? "आपके बचत लक्ष्य की प्रगति और सुरक्षा चेतावनी"
                    : "Live savings milestones and crucial cyber safety updates"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <AudioNarrationButton
                text={notificationNarrationText}
                label={language === "te" ? "నోటిఫికేషన్లు వినండి" : language === "hi" ? "सूचनाएं सुनें" : "Listen to Alerts"}
                size="sm"
              />
            </div>
          </div>

          {/* Cards Grid of Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Notification 1: Savings Goal Reached or Ongoing Milestone */}
            {completedGoals.length > 0 ? (
              <div className="bg-gradient-to-br from-amber-50 to-emerald-50 border-2 border-amber-300 rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-xs">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded-md">
                      🎉 {language === "te" ? "లక్ష్యం సాధించారు!" : language === "hi" ? "लक्ष्य पूरा हुआ!" : "Goal Reached!"}
                    </span>
                    <span className="text-xs font-black text-emerald-800">100%</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {language === "te"
                      ? completedGoals[0].nameTe || completedGoals[0].name
                      : language === "hi"
                      ? completedGoals[0].nameHi || completedGoals[0].name
                      : completedGoals[0].name}
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {language === "te"
                      ? `అభినందనలు! మీరు నిర్ణయించుకున్న ₹${completedGoals[0].targetAmount.toLocaleString("en-IN")} లక్ష్యం పూర్తిగా సమకూరింది!`
                      : language === "hi"
                      ? `बधाई हो! आपकी तय की गई ₹${completedGoals[0].targetAmount.toLocaleString("en-IN")} की बचत पूरी हो चुकी है!`
                      : `Congratulations! Your family target of ₹${completedGoals[0].targetAmount.toLocaleString("en-IN")} is completely reached!`}
                  </p>
                </div>

                <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between">
                  <button
                    onClick={triggerCelebrate}
                    className="px-3 py-1 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs rounded-lg transition-transform active:scale-95 cursor-pointer shadow-2xs"
                  >
                    🎊 {language === "te" ? "సంబరం చేసుకోండి" : language === "hi" ? "उत्सव मनाएं" : "Celebrate!"}
                  </button>
                  <button
                    onClick={() => setActivePage("goals")}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950"
                  >
                    {language === "te" ? "లక్ష్యాలు చూడండి →" : language === "hi" ? "लक्ष्य देखें →" : "View Goals →"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      🎯 {language === "te" ? "పొదుపు పురోగతి" : language === "hi" ? "बचत प्रगति" : "Savings Progress"}
                    </span>
                    <span className="text-xs font-black text-emerald-800">{overallProgress}%</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {language === "te"
                      ? `లక్ష్యాలలో మొత్తం ₹${totalSaved.toLocaleString("en-IN")} పొదుపు`
                      : language === "hi"
                      ? `कुल लक्ष्यों में ₹${totalSaved.toLocaleString("en-IN")} की बचत`
                      : `Total ₹${totalSaved.toLocaleString("en-IN")} saved in goals`}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === "te"
                      ? `మొత్తం లక్ష్యం ₹${totalTarget.toLocaleString("en-IN")}. క్రమం తప్పకుండా ప్రతి నెలా జమ చేయండి.`
                      : language === "hi"
                      ? `कुल लक्ष्य ₹${totalTarget.toLocaleString("en-IN")}। हर महीने छोटी बचत जारी रखें।`
                      : `Out of ₹${totalTarget.toLocaleString("en-IN")} target. Keep depositing regularly.`}
                  </p>
                </div>

                <div className="pt-2 border-t border-emerald-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-700">
                    {goals.length} {language === "te" ? "లక్ష్యాలు చురుగ్గా ఉన్నాయి" : language === "hi" ? "लक्ष्य चालू हैं" : "Active goals"}
                  </span>
                  <button
                    onClick={() => setActivePage("goals")}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950"
                  >
                    {language === "te" ? "లక్ష్యాలు →" : language === "hi" ? "लक्ष्य →" : "Manage →"}
                  </button>
                </div>
              </div>
            )}

            {/* Notification 2: Urgent Cyber & Scam Defense Alert */}
            <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-rose-700" />
                    {language === "te" ? "జాగ్రత్త హెచ్చరిక" : language === "hi" ? "सावधानी संदेश" : "Fraud Defense Alert"}
                  </span>
                  <span className="text-[10px] font-bold text-rose-800">Helpline: 1930</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {language === "te"
                    ? "డబ్బు రావడానికి PIN లేదా OTP అవసరం లేదు!"
                    : language === "hi"
                    ? "पैसे पाने के लिए PIN या OTP की जरूरत नहीं!"
                    : "PIN is NEVER required to receive money!"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === "te"
                    ? "ప్రభుత్వ సబ్సిడీ లేదా పెన్షన్ ఖాతాలో పడటానికి మీరు ఎవరికీ పిన్ లేదా OTP చెప్పకూడదు. అపరిచిత కాల్స్‌ని నమ్మవద్దు."
                    : language === "hi"
                    ? "सरकारी पेंशन या सहायता सीधे बैंक में आती है। पैसे पाने के लिए कभी भी पिन न डालें और न ही ओटीपी बताएं।"
                    : "Subsidies are credited directly. Never enter your UPI PIN or share OTP to receive money."}
                </p>
              </div>

              <div className="pt-2 border-t border-rose-100 flex items-center justify-between">
                <span className="text-[11px] font-black text-rose-700">Toll-Free 1930</span>
                <button
                  onClick={() => setActivePage("safety")}
                  className="text-xs font-bold text-rose-800 hover:text-rose-950"
                >
                  {language === "te" ? "భద్రతా సూత్రాలు →" : language === "hi" ? "नियम देखें →" : "Safety Rules →"}
                </button>
              </div>
            </div>

            {/* Notification 3: Government Scheme Reminder */}
            <div className="bg-indigo-50/80 border border-indigo-200 rounded-2xl p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Award className="w-3 h-3 text-indigo-700" />
                    {language === "te" ? "ప్రభుత్వ పథకం" : language === "hi" ? "सरकारी योजना" : "Govt Scheme Alert"}
                  </span>
                  <span className="text-[10px] font-bold text-indigo-800">₹20 / year</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {language === "te"
                    ? "PMSBY: ₹20 లకే ₹2,00,000 ప్రమాద బీమా"
                    : language === "hi"
                    ? "सिर्फ ₹20 में ₹2 लाख का सरकारी दुर्घटना बीमा"
                    : "PMSBY: ₹2 Lakh Insurance for ₹20/year"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === "te"
                    ? "ప్రధాన మంత్రి సురక్ష బీమా యోజన కోసం మీ సమీప బ్యాంక్ లేదా పోస్టాఫీసులో ఒకే పేజీ ఫారమ్ నింపి ప్రారంభించండి."
                    : language === "hi"
                    ? "प्रधानमंत्री सुरक्षा बीमा योजना का लाभ लेने के लिए अपने बैंक में जाकर एक आसान सहमति पत्र भरें।"
                    : "Enroll at your bank or post office for instant ₹2 Lakh family safety cushion."}
                </p>
              </div>

              <div className="pt-2 border-t border-indigo-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-700">Bank / Post Office</span>
                <button
                  onClick={() => setActivePage("schemes")}
                  className="text-xs font-bold text-indigo-800 hover:text-indigo-950"
                >
                  {language === "te" ? "పథకాలు చూడండి →" : language === "hi" ? "योजनाएं →" : "View Schemes →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE PRACTICE LAB - Overcoming Digital Fear by Doing */}
      <section id="practice-lab-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PracticeSimulator />
      </section>

      {/* 4. FOUR GOLDEN RULES - Visual & Audio Anchor */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FourGoldenRules />
      </section>

      {/* 5. DIGITAL GULLAK CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DigitalGullak />
      </section>

      {/* 6. Core Feature Cards - Plain Language & High Contrast */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            {language === "te"
              ? "మీ దైనందిన జీవితం కోసం రూపొందించిన సాధనాలు"
              : language === "hi"
              ? "ग्रामीण जीवन के लिए 4 सबसे उपयोगी साधन"
              : "Tools Built Specifically for Rural Daily Life"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
            {language === "te"
              ? "ఏ బ్యాంకింగ్ కష్టమైన పదాలు లేవు. ప్రతిదీ తేలికగా అర్థమయ్యేలా రూపొందించబడింది."
              : language === "hi"
              ? "कठिन अंग्रेजी शब्दों के बिना — सीधे-सादे तरीके से अपना पैसा संभालें।"
              : "No complicated financial jargon. Straightforward guidance to protect and grow your family's earnings."}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1: DhanRaksha AI */}
          <div
            onClick={() => openChat()}
            className="group bg-white p-6 rounded-3xl border-2 border-emerald-900/10 shadow-sm hover:shadow-md hover:border-emerald-600 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-800 transition-colors">
                {language === "te" ? "1. ధనరక్ష AI సహాయకుడు" : language === "hi" ? "1. धनरक्षा AI सहायक" : "1. DhanRaksha AI Assistant"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {language === "te"
                  ? "తెలుగు, హిందీ లేదా ఇంగ్లీషులో మాట్లాడండి. లోన్లు, వడ్డీ లెక్కలు లేదా మోసాల గురించి సిగ్గుపడకుండా అడగండి."
                  : language === "hi"
                  ? "अपनी मातृभाषा में बोलें। बैंक, ब्याज, कर्ज या ऑनलाइन फ्रॉड के बारे में बिना किसी झिझक के खुलकर पूछें।"
                  : "Talk or type in Telugu, Hindi, or English. Ask about loans, interest rates, savings, or government benefits without embarrassment."}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-black text-emerald-800 group-hover:translate-x-1 transition-transform">
              <span>{language === "te" ? "AI తో మాట్లాడండి →" : language === "hi" ? "AI से पूछें →" : "Talk with AI →"}</span>
            </div>
          </div>

          {/* Feature 2: Smart Budgeting */}
          <div
            onClick={() => setActivePage("budget")}
            className="group bg-white p-6 rounded-3xl border-2 border-teal-900/10 shadow-sm hover:shadow-md hover:border-teal-600 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition-colors">
                <PieChart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-teal-800 transition-colors">
                {language === "te" ? "2. ఖర్చుల పద్దు (బడ్జెట్)" : language === "hi" ? "2. सरल आय-व्यय खाता" : "2. Easy Household Budget"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {language === "te"
                  ? "రోజూ డబ్బు ఎక్కడ ఖర్చవుతుందో ట్రాక్ చేయండి: రేషన్, బడి ఫీజులు, మందులు. నెలాఖరులో ఎంత మిగిలిందో చూడండి."
                  : language === "hi"
                  ? "राशन, बच्चों की पढ़ाई, खेती और दवाई का खर्च दर्ज करें। तुरंत देखें कि इस महीने हाथ में कितना पैसा बचा है।"
                  : "Track daily expenses without paper: food, school, farming seeds. Know exactly how much is left at a glance."}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-black text-teal-800 group-hover:translate-x-1 transition-transform">
              <span>{language === "te" ? "పద్దు చూడండి →" : language === "hi" ? "बजट देखें →" : "View Budget →"}</span>
            </div>
          </div>

          {/* Feature 3: Savings Goals */}
          <div
            onClick={() => setActivePage("goals")}
            className="group bg-white p-6 rounded-3xl border-2 border-amber-900/10 shadow-sm hover:shadow-md hover:border-amber-600 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-amber-800 transition-colors">
                {language === "te" ? "3. పొదుపు లక్ష్యాలు" : language === "hi" ? "3. सपनों की बचत (लक्ष्य)" : "3. Savings Goals"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {language === "te"
                  ? "పిల్లల చదువు, పాడి ఆవు లేదా అత్యవసర నిధి కోసం లక్ష్యం పెట్టుకోండి. ప్రతి నెలా ఎంత వేయాలో స్పష్టంగా తెలుసుకోండి."
                  : language === "hi"
                  ? "बच्चों की फीस, दुधारू गाय या अपनी दुकान के लिए लक्ष्य तय करें। हर महीने का आसान प्लान पाएं।"
                  : "Set milestones for children's schooling, dairy cow purchase, or emergency fund with realistic timelines."}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-black text-amber-800 group-hover:translate-x-1 transition-transform">
              <span>{language === "te" ? "లక్ష్యం పెట్టండి →" : language === "hi" ? "लक्ष्य बनाएं →" : "Set Goals →"}</span>
            </div>
          </div>

          {/* Feature 4: Scam & Fraud Protection */}
          <div
            onClick={() => setActivePage("safety")}
            className="group bg-white p-6 rounded-3xl border-2 border-red-900/10 shadow-sm hover:shadow-md hover:border-red-600 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-800 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-red-800 transition-colors">
                {language === "te" ? "4. మోసాల రక్షకుడు" : language === "hi" ? "4. फ्रॉड चेकर व सुरक्षा" : "4. Fraud & Scam Guard"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {language === "te"
                  ? "అపరిచిత కాల్ లేదా మెసేజ్ వస్తే ఇక్కడ తనిఖీ చేయండి. మోసం జరిగితే 1930 కి తక్షణమే ఎలా ఫిర్యాదు చేయాలో తెలుసుకోండి."
                  : language === "hi"
                  ? "लॉटरी या बिजली बिल कटने का संदेश आए तो यहाँ तुरंत जांचें। साइबर हेल्पलाइन 1930 की पूरी जानकारी पाएं।"
                  : "Learn 5 golden rules of digital banking. Know how to report immediately to 1930 if money is deducted."}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-black text-red-800 group-hover:translate-x-1 transition-transform">
              <span>{language === "te" ? "భద్రత చూడండి →" : language === "hi" ? "सुरक्षा जांचें →" : "Check Safety →"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Real-Life Questions Answered by DhanRaksha AI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white rounded-3xl p-6 sm:p-10 border border-emerald-200/80 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-black text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2.5 py-1 rounded-md">
              {language === "te" ? "నిజ జీవిత ప్రశ్నలు • సరళమైన జవాబులు" : language === "hi" ? "सच्चे सवाल • सीधी बात" : "Real Questions • Clear Answers"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif mt-2">
              {language === "te"
                ? "గ్రామీణ సోదరీమణులు ఎక్కువగా అడిగే ప్రశ్నలు"
                : language === "hi"
                ? "ग्रामीण बहनें सबसे ज्यादा क्या पूछती हैं?"
                : "Questions Asked Most Often by Rural Women"}
            </h2>
            <p className="text-sm text-slate-600 mt-1 font-medium">
              {language === "te"
                ? "కింది ప్రశ్నపై నొక్కండి — ధనరక్ష AI వెంటనే పూర్తి సమాధానం ఇస్తుంది:"
                : language === "hi"
                ? "किसी भी सवाल पर क्लिक करें — धनरक्षा AI तुरंत सरल भाषा में समझाएगा:"
                : "Tap any question below to see how DhanRaksha explains it simply:"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {realLifeQuestions.map((q, idx) => {
              const text = language === "te" ? q.qTe : language === "hi" ? q.qHi : q.qEn;
              return (
                <button
                  key={idx}
                  onClick={() => openChat(text)}
                  className="flex items-start justify-between p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-600 hover:shadow-md transition-all text-left group cursor-pointer"
                >
                  <div className="space-y-1 pr-3">
                    <span className="text-[11px] font-black text-emerald-800 uppercase tracking-wider">
                      {q.category}
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      "{text}"
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Direct CTA */}
          <div className="mt-8 pt-6 border-t border-emerald-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold">
                🛡️
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-slate-900 block">
                  {language === "te"
                    ? "మీ మనసులో ఏదైనా వేరే ప్రశ్న ఉందా?"
                    : language === "hi"
                    ? "क्या आपके मन में कोई और सवाल या शंका है?"
                    : "Have a different question or doubt in mind?"}
                </span>
                <span className="text-slate-500 font-medium">
                  {language === "te"
                    ? "ధనరక్ష AI తో మీ స్వంత గొంతుతో మాట్లాడండి."
                    : language === "hi"
                    ? "माइक पर बोलकर धनरक्षा AI से अपनी भाषा में पूछें।"
                    : "Speak freely with DhanRaksha AI in your local language."}
                </span>
              </div>
            </div>

            <button
              onClick={() => openChat()}
              className="px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white rounded-2xl text-sm font-black shadow-xs active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              {language === "te"
                ? "ధనరక్ష AI తో మాట్లాడండి"
                : language === "hi"
                ? "धनरक्षा AI से पूछें"
                : "Ask DhanRaksha AI Now"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
