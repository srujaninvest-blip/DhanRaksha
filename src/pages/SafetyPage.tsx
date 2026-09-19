import React from "react";
import {
  ShieldCheck,
  AlertTriangle,
  Lock,
  Phone,
  KeyRound,
  Bot,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  Smartphone,
  CheckCircle2,
  Volume2,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { AudioNarrationButton } from "../components/AudioNarrationButton";

export const SafetyPage: React.FC = () => {
  const { openChat, language } = useApp();

  const rules = [
    {
      icon: KeyRound,
      color: "bg-amber-100 text-amber-800",
      titleEn: "1. PIN is strictly for SENDING money, never receiving",
      titleTe: "1. UPI పిన్ కేవలం డబ్బు పంపడానికి మాత్రమే, తీసుకోవడానికి కాదు",
      titleHi: "1. यूपीआई पिन केवल पैसे भेजने के लिए है, पाने के लिए कभी नहीं",
      descEn:
        "You NEVER need to enter your UPI PIN or scan a QR code to receive money, pension, or subsidy into your account. Entering a PIN will deduct money from your account.",
      descTe:
        "మీ ఖాతాలోకి డబ్బు లేదా పెన్షన్ లేదా సబ్సిడీ రావడానికి మీరు ఎప్పటికీ UPI పిన్ కొట్టాల్సిన అవసరం లేదు. పిన్ కొడితే మీ ఖాతా నుండి డబ్బు కట్ అవుతుంది.",
      descHi:
        "अपने खाते में पैसे, पेंशन या सब्सिडी प्राप्त करने के लिए कभी भी यूपीआई पिन डालने या क्यूआर कोड स्कैन करने की आवश्यकता नहीं होती। पिन डालने पर आपके पैसे कट जाएंगे।",
    },
    {
      icon: Lock,
      color: "bg-rose-100 text-rose-800",
      titleEn: "2. OTP is your private bank key",
      titleTe: "2. OTP మీ రహస్య తాళంచెవి లాంటిది",
      titleHi: "2. ओटीपी आपकी तिजोरी की निजी चाबी है",
      descEn:
        "No bank manager, government officer, or SHG coordinator will ever call asking for your SMS OTP. If anyone asks for OTP, cut the call immediately.",
      descTe:
        "బ్యాంక్ మేనేజర్ కానీ, ప్రభుత్వ అధికారి కానీ మీ మొబైల్‌కు వచ్చే 6 అంకెల OTP ఎప్పుడూ అడగరు. ఎవరైనా OTP అడిగితే వెంటనే ఫోన్ కట్ చేయండి.",
      descHi:
        "कोई भी बैंक मैनेजर या सरकारी अधिकारी फोन पर आपका ओटीपी नहीं मांगता। अगर कोई फोन पर ओटीपी मांगे तो तुरंत फोन काट दें।",
    },
    {
      icon: AlertTriangle,
      color: "bg-teal-100 text-teal-800",
      titleEn: "3. Ignore 'Account Blocked' panic calls",
      titleTe: "3. 'ఖాతా బ్లాక్ అవుతుంది' అనే బెదిరింపులను నమ్మవద్దు",
      titleHi: "3. 'खाता ब्लॉक हो जाएगा' जैसी धमकियों से न घबराएं",
      descEn:
        "Fraudsters send urgent SMS saying 'Your bank account or SIM will be blocked today for KYC'. Never click links in SMS. Visit your village bank branch directly.",
      descTe:
        "మోసగాళ్లు 'ఈరోజే మీ బ్యాంక్ అకౌంట్ ఆగిపోతుంది' అని భయపెడతారు. అలాంటి లింక్‌లు క్లిక్ చేయకండి. మీ సమీప బ్యాంక్ బ్రాంచ్‌కు వెళ్లి మాత్రమే విచారించండి.",
      descHi:
        "धोखेबाज 'आज ही आपका बैंक खाता बंद हो जाएगा' कहकर डराते हैं। ऐसे मैसेज के लिंक पर कभी क्लिक न करें। सीधे अपनी बैंक शाखा जाएं।",
    },
    {
      icon: Smartphone,
      color: "bg-emerald-100 text-emerald-800",
      titleEn: "4. Beware of fake easy loan apps",
      titleTe: "4. నకిలీ లోన్ యాప్‌ల ఉచ్చులో పడకండి",
      titleHi: "4. फर्जी लोन ऐप के झांसे में न आएं",
      descEn:
        "Unknown apps offering instant 5-minute loans charge illegal interest and steal your phone contacts. Always take loans from your SHG (Self Help Group) or Banks.",
      descTe:
        "అపరిచిత యాప్‌ల నుండి తక్షణ రుణాలు తీసుకోవద్దు. అవి అధిక వడ్డీ వసూలు చేస్తాయి. ఎల్లప్పుడూ మీ పొదుపు సంఘం (SHG) లేదా బ్యాంకుల ద్వారానే రుణాలు తీసుకోండి.",
      descHi:
        "अज्ञात मोबाइल ऐप से तुरंत लोन न लें। ये भारी ब्याज वसूलते हैं। हमेशा अपने स्वयं सहायता समूह (SHG) या सरकारी बैंक से ही ऋण लें।",
    },
    {
      icon: Phone,
      color: "bg-indigo-100 text-indigo-800",
      titleEn: "5. Immediate help: Dial 1930 Helpline",
      titleTe: "5. తక్షణ సాయం కోసం 1930 హెల్ప్‌లైన్‌కు కాల్ చేయండి",
      titleHi: "5. तुरंत सहायता: 1930 हेल्पलाइन पर कॉल करें",
      descEn:
        "If you accidentally lost money, dial the National Cyber Fraud Helpline 1930 within hours. Authorities can immediately freeze the fraudster's account.",
      descTe:
        "ఒకవేళ పొరపాటున ఎవరికైనా డబ్బు పోతే, వెంటనే జాతీయ సైబర్ హెల్ప్‌లైన్ 1930 కు కాల్ చేయండి. పోలీసులు మోసగాడి ఖాతాను నిలిపివేసి మీ డబ్బు కాపాడగలరు.",
      descHi:
        "अगर गलती से आपके पैसे कट जाएं, तो तुरंत राष्ट्रीय साइबर हेल्पलाइन 1930 पर कॉल करें। तुरंत सूचना देने से धोखेबाज का खाता फ्रीज हो जाता है।",
    },
  ];

  const headerNarration =
    language === "te"
      ? "ధనరక్ష మోసాల రక్షణ విభాగానికి స్వాగతం. మీ కష్టార్జితాన్ని కాపాడుకోవడానికి 5 ముఖ్యమైన భద్రతా సూత్రాలను గుర్తుంచుకోండి. ఎవరికీ మీ UPI పిన్ లేదా OTP చెప్పకూడదు. ఏదైనా అనుమానం వస్తే 1930 హెల్ప్‌లైన్‌కు కాల్ చేయండి."
      : language === "hi"
      ? "धनरक्षा सुरक्षा केंद्र में आपका स्वागत है। अपनी मेहनत की कमाई को सुरक्षित रखने के लिए 5 सुनहरे नियम याद रखें। कभी भी किसी को यूपीआई पिन या ओटीपी न बताएं। किसी भी संदेह पर 1930 डायल करें।"
      : "Welcome to DhanRaksha Scam Shield. Remember the golden rule: you NEVER need to enter your UPI PIN to receive money, and NEVER share your OTP. If in doubt, call 1930.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-rose-800 bg-rose-100 px-3 py-1 rounded-full">
              {language === "te" ? "మోసాల రక్షణ కవచం" : language === "hi" ? "धोखाधड़ी से सुरक्षा" : "Scam Shield & Fraud Defense"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif mt-2">
            {language === "te"
              ? "డిజిటల్ మోసాల నుండి మీ సొమ్మును కాపాడుకోండి"
              : language === "hi"
              ? "डिजिटल धोखाधड़ी से अपनी गाढ़ी कमाई सुरक्षित रखें"
              : "Protect Your Hard-Earned Money"}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1.5">
            {language === "te"
              ? "లాటరీ కాల్స్, అనుమానాస్పద లింకులు మరియు నకిలీ OTP కాల్స్ నుండి మహిళలను రక్షించడానికి రూపొందించిన మార్గదర్శకాలు."
              : language === "hi"
              ? "फर्जी लॉटरी, अज्ञात लिंक और ओटीपी चोरी से ग्रामीण महिलाओं को सुरक्षित रखने के लिए जरूरी नियम।"
              : "Simple, easy-to-remember rules to keep your bank accounts, UPI, and family savings completely safe."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AudioNarrationButton
            text={headerNarration}
            label={language === "te" ? "సూత్రాలు వినండి" : language === "hi" ? "नियम सुनें" : "Listen to Safety Rules"}
          />
        </div>
      </div>

      {/* 5 Golden Rules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
            {language === "te"
              ? "మీ డబ్బు భద్రతకు 5 బంగారు సూత్రాలు"
              : language === "hi"
              ? "पैसों की सुरक्षा के 5 सुनहरे नियम"
              : "5 Golden Rules of Digital Banking Safety"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rules.map((rule, idx) => {
            const Icon = rule.icon;
            const title =
              language === "te"
                ? rule.titleTe
                : language === "hi"
                ? rule.titleHi
                : rule.titleEn;
            const desc =
              language === "te"
                ? rule.descTe
                : language === "hi"
                ? rule.descHi
                : rule.descEn;

            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-2xl ${rule.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <AudioNarrationButton text={`${title}. ${desc}`} size="sm" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug font-serif">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}

          {/* AI Helper Card */}
          <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-6 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-emerald-300" />
                  <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
                    DhanRaksha AI Assistant
                  </span>
                </div>
                <AudioNarrationButton
                  text={
                    language === "te"
                      ? "ఏదైనా ఫోన్ కాల్ గురించి సందేహం ఉందా? ఎవరైనా ఫోన్ చేసి OTP లేదా బ్యాంక్ వివరాలు అడుగుతున్నారా? వెంటనే మా వాయిస్ అసిస్టెంట్‌ని అడగండి."
                      : language === "hi"
                      ? "क्या किसी अनजान कॉल या मैसेज पर संदेह है? अगर कोई फोन पर बैंक विवरण मांग रहा है, तो तुरंत धनरक्षा सहायक से सलाह लें।"
                      : "Unsure about a phone call or SMS? Tell DhanRaksha what the caller told you. It will explain whether it is safe or a scam."
                  }
                  size="sm"
                  className="bg-emerald-700/80 text-white border-emerald-500"
                />
              </div>
              <h3 className="font-bold text-white text-lg font-serif">
                {language === "te"
                  ? "ఏదైనా ఫోన్ కాల్ గురించి సందేహం ఉందా?"
                  : language === "hi"
                  ? "क्या किसी अनजान कॉल या मैसेज पर संदेह है?"
                  : "Unsure about a phone call or SMS?"}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                {language === "te"
                  ? "ఎవరైనా ఫోన్ చేసి OTP లేదా బ్యాంక్ వివరాలు అడుగుతున్నారా? వెంటనే మా వాయిస్ అసిస్టెంట్‌ని అడగండి."
                  : language === "hi"
                  ? "अगर कोई फोन पर बैंक विवरण मांग रहा है, तो तुरंत धनरक्षा सहायक से सलाह लें।"
                  : "Tell DhanRaksha what the caller told you. It will explain whether it is safe or a scam."}
              </p>
            </div>

            <button
              onClick={() =>
                openChat(
                  language === "te"
                    ? "నాకు బ్యాంక్ నుండి ఒక ఫోన్ కాల్ వచ్చింది, KYC కోసం OTP అడుగుతున్నారు. నేను ఇవ్వవచ్చా?"
                    : language === "hi"
                    ? "मुझे बैंक से फोन आया है और वे केवाईसी के लिए ओटीपी मांग रहे हैं। क्या मुझे देना चाहिए?"
                    : "Someone called me asking for KYC verification and OTP. What should I do?"
                )
              }
              className="w-full py-3 bg-white text-emerald-950 font-black text-xs sm:text-sm rounded-xl hover:bg-emerald-50 transition-transform active:scale-98 cursor-pointer text-center"
            >
              {language === "te"
                ? "ధనరక్ష AIని అడగండి →"
                : language === "hi"
                ? "धनरक्षा AI से पूछें →"
                : "Ask DhanRaksha AI about a Call →"}
            </button>
          </div>
        </div>
      </div>

      {/* Emergency Helpline Box */}
      <div className="bg-rose-50 border-2 border-rose-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Phone className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-rose-700 block">
              {language === "te" ? "భారత ప్రభుత్వ అధికారిక హెల్ప్‌లైన్" : language === "hi" ? "भारत सरकार आधिकारिक हेल्पलाइन" : "Government of India Helpline"}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-rose-950 font-serif">
              {language === "te"
                ? "జాతీయ సైబర్ మోసాల హెల్ప్‌లైన్: 1930"
                : language === "hi"
                ? "राष्ट्रीय साइबर अपराध हेल्पलाइन: 1930"
                : "National Cyber Fraud Helpline: 1930"}
            </h3>
            <p className="text-xs sm:text-sm text-rose-800 mt-1">
              {language === "te"
                ? "భారతదేశం అంతటా 24/7 అందుబాటులో ఉంటుంది. ఖాతా నుండి అనధికారికంగా డబ్బు కట్ అయితే వెంటనే టోల్-ఫ్రీ నంబర్ 1930 కి కాల్ చేయండి."
                : language === "hi"
                ? "पूरे भारत में 24/7 उपलब्ध। खाते से अनधिकृत पैसे कटने पर तुरंत टोल-फ्री 1930 पर शिकायत दर्ज करें।"
                : "Available 24/7 across India. Toll-free service to report unauthorized money deductions immediately."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <AudioNarrationButton
            text={
              language === "te"
                ? "భారత ప్రభుత్వ అధికారిక హెల్ప్‌లైన్. జాతీయ సైబర్ మోసాల హెల్ప్‌లైన్ 1930. భారతదేశం అంతటా 24/7 అందుబాటులో ఉంటుంది. ఖాతా నుండి అనధికారికంగా డబ్బు కట్ అయితే వెంటనే 1930 కి కాల్ చేయండి."
                : language === "hi"
                ? "भारत सरकार आधिकारिक हेल्पलाइन। राष्ट्रीय साइबर अपराध हेल्पलाइन 1930। पूरे भारत में 24 घंटे उपलब्ध। खाते से अनधिकृत पैसे कटने पर तुरंत 1930 पर कॉल करें।"
                : "Government of India National Cyber Fraud Helpline 1930. Available 24/7 across India. Call 1930 immediately if unauthorized money is deducted."
            }
            label={language === "te" ? "వినండి" : language === "hi" ? "सुनें" : "Listen"}
          />
          <a
            href="tel:1930"
            className="px-6 py-3.5 bg-rose-700 hover:bg-rose-800 text-white font-black text-sm rounded-2xl shadow-md transition-transform active:scale-98 shrink-0 flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>
              {language === "te"
                ? "ఇప్పుడే 1930 కు కాల్ చేయండి"
                : language === "hi"
                ? "अभी 1930 पर कॉल करें"
                : "Call 1930 Now"}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
