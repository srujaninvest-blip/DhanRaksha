import React, { useState } from "react";
import {
  Award,
  CheckCircle2,
  ExternalLink,
  Bot,
  Filter,
  Users,
  Search,
  Check,
  Sparkles,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { GOV_SCHEMES } from "../data/initialData";
import { GovScheme } from "../types";
import { AudioNarrationButton } from "../components/AudioNarrationButton";

export const SchemesPage: React.FC = () => {
  const { openChat, language } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "All", en: "All", te: "అన్నీ", hi: "सभी" },
    { id: "Women", en: "Women", te: "మహిళలు", hi: "महिलाएं" },
    { id: "Rural Livelihood", en: "Rural Livelihood", te: "గ్రామీణ జీవనోపాధి", hi: "ग्रामीण आजीविका" },
    { id: "Savings", en: "Savings", te: "పొదుపు", hi: "बचत" },
    { id: "Entrepreneurship", en: "Entrepreneurship", te: "స్వయం ఉపాధి", hi: "स्वरोजगार" },
    { id: "Education", en: "Education", te: "విద్య", hi: "शिक्षा" },
  ];

  const filteredSchemes = GOV_SCHEMES.filter((scheme) => {
    const matchesCat =
      selectedCategory === "All" || scheme.category === selectedCategory;
    const name =
      language === "te" ? scheme.nameTe || scheme.name : language === "hi" ? scheme.nameHi || scheme.name : scheme.name;
    const desc =
      language === "te"
        ? scheme.descriptionTe || scheme.description
        : language === "hi"
        ? scheme.descriptionHi || scheme.description
        : scheme.description;
    const matchesSearch =
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const bannerNarration =
    language === "te"
      ? "గ్రామీణ మహిళల కోసం ప్రభుత్వ పథకాలు. ముద్రా రుణాలు, సుకన్య సమృద్ధి యోజన, జనధన్ ఖాతాలు మరియు మహిళా సమ్మాన్ సర్టిఫికెట్ వంటి పథకాల వివరాలు ఇక్కడ ఉన్నాయి."
      : language === "hi"
      ? "ग्रामीण महिलाओं के लिए सरकारी योजनाएं। मुद्रा ऋण, सुकन्या समृद्धि योजना, जनधन खाता और महिला सम्मान बचत पत्र जैसी कल्याणकारी योजनाओं की पूरी जानकारी।"
      : "Government Schemes for Rural Women. Explore key central and state welfare initiatives offering subsidized business loans, zero balance accounts, and high-interest savings.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
              {language === "te" ? "ప్రభుత్వ సంక్షేమ పథకాలు" : language === "hi" ? "सरकारी कल्याणकारी योजनाएं" : "Welfare & Opportunities"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif mt-1">
            {language === "te"
              ? "గ్రామీణ మహిళల కోసం ప్రభుత్వ పథకాలు"
              : language === "hi"
              ? "ग्रामीण महिलाओं के लिए सरकारी योजनाएं"
              : "Government Schemes for Rural Women"}
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            {language === "te"
              ? "అధిక వడ్డీ పొదుపు, తక్కువ ప్రీమియం ప్రమాద బీమా మరియు మహిళల వ్యాపారాల కోసం సబ్సిడీ రుణాలు అందించే ప్రభుత్వ పథకాల వివరాలు."
              : language === "hi"
              ? "अधिक ब्याज वाली बचत, कम लागत वाला बीमा और महिलाओं के रोजगार के लिए रियायती ऋण देने वाली योजनाओं की जानकारी।"
              : "Explore central and state schemes offering high-interest savings, low-cost accident insurance, and business loans tailored for women's financial growth."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AudioNarrationButton
            text={bannerNarration}
            label={language === "te" ? "వినండి" : language === "hi" ? "सुनें" : "Listen"}
          />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const label = language === "te" ? cat.te : language === "hi" ? cat.hi : cat.en;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-emerald-800 text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === "te"
                ? "పథకాల కోసం వెతకండి..."
                : language === "hi"
                ? "योजनाएं खोजें..."
                : "Search schemes..."
            }
            className="w-full pl-9 pr-3 py-2 text-xs font-medium bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => {
          const name = language === "te" ? scheme.nameTe || scheme.name : language === "hi" ? scheme.nameHi || scheme.name : scheme.name;
          const desc = language === "te" ? scheme.descriptionTe || scheme.description : language === "hi" ? scheme.descriptionHi || scheme.description : scheme.description;
          const rawBenefits = language === "te" ? scheme.benefitsTe || scheme.benefits : language === "hi" ? scheme.benefitsHi || scheme.benefits : scheme.benefits;
          const target = language === "te" ? scheme.targetAudienceTe || scheme.targetAudience : language === "hi" ? scheme.targetAudienceHi || scheme.targetAudience : scheme.targetAudience;
          const howToApply = language === "te" ? scheme.howToApplyTe || scheme.howToApply : language === "hi" ? scheme.howToApplyHi || scheme.howToApply : scheme.howToApply;
          const category =
            language === "te"
              ? scheme.category === "savings"
                ? "పొదుపు"
                : scheme.category === "loan"
                ? "రుణం"
                : scheme.category === "insurance"
                ? "బీమా"
                : scheme.category === "pension"
                ? "పెన్షన్"
                : scheme.category
              : language === "hi"
              ? scheme.category === "savings"
                ? "बचत"
                : scheme.category === "loan"
                ? "ऋण"
                : scheme.category === "insurance"
                ? "बीमा"
                : scheme.category === "pension"
                ? "पेंशन"
                : scheme.category
              : scheme.category;

          const benefitsList = Array.isArray(rawBenefits)
            ? rawBenefits
            : typeof rawBenefits === "string"
            ? rawBenefits.split(".").map((s) => s.trim()).filter(Boolean)
            : [];

          const narrationFull = `${name}. ${desc}. ${
            target ? (language === "te" ? "అర్హత: " : language === "hi" ? "पात्रता: " : "Eligible: ") + target + ". " : ""
          }${
            howToApply ? (language === "te" ? "దరఖాస్తు విధానం: " : language === "hi" ? "आवेदन कैसे करें: " : "How to apply: ") + howToApply : ""
          }`;

          return (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-500 transition-all p-6 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {category}
                  </span>
                  <AudioNarrationButton
                    text={narrationFull}
                    size="sm"
                  />
                </div>

                <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors font-serif">
                  {name}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {desc}
                </p>

                {/* Target Audience Pill */}
                {target && (
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block mb-0.5">
                      {language === "te" ? "ఎవరికి అర్హత:" : language === "hi" ? "कौन पात्र है:" : "Who is Eligible:"}
                    </span>
                    <span>{target}</span>
                  </div>
                )}

                {/* Benefits List */}
                {benefitsList.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-bold text-slate-800 block">
                      {language === "te" ? "ముఖ్య ప్రయోజనాలు:" : language === "hi" ? "मुख्य लाभ:" : "Key Highlights:"}
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {benefitsList.map((b, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="text-[11px] text-slate-500 font-medium">
                  <strong>{language === "te" ? "దరఖాస్తు ఎలా చేయాలి:" : language === "hi" ? "आवेदन कैसे करें:" : "How to Apply:"}</strong> {howToApply}
                </div>

                <button
                  onClick={() =>
                    openChat(
                      language === "te"
                        ? `నేను "${name}" పథకానికి ఎలా దరఖాస్తు చేయాలి? ఏయే పత్రాలు కావాలి మరియు ఏ బ్యాంకు లేదా పోస్టాఫీసుకు వెళ్ళాలి?`
                        : language === "hi"
                        ? `मैं "${name}" योजना के लिए कैसे आवेदन करूँ? कौन से दस्तावेज़ चाहिए और किस बैंक या डाकघर जाना होगा?`
                        : `How can I apply for "${name}"? What documents are required and which bank branch or post office should I visit?`
                    )
                  }
                  className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5 text-emerald-700" />
                  <span>
                    {language === "te"
                      ? "దరఖాస్తు విధానాన్ని ధనరక్ష AI ని అడగండి →"
                      : language === "hi"
                      ? "आवेदन प्रक्रिया धनरक्षा AI से पूछें →"
                      : "Ask DhanRaksha AI How to Apply →"}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
