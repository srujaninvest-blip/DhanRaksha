import React, { useState } from "react";
import {
  BookOpen,
  CheckCircle,
  Clock,
  Sparkles,
  Bot,
  Lightbulb,
  ArrowRight,
  Volume2,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { LEARNING_TOPICS } from "../data/initialData";
import { LearningTopic } from "../types";
import { AudioNarrationButton } from "../components/AudioNarrationButton";

export const LearnPage: React.FC = () => {
  const { openChat, language, t } = useApp();
  const [activeTopic, setActiveTopic] = useState<LearningTopic | null>(null);

  const headerNarration =
    language === "te"
      ? "డిజిటల్ ఆర్థిక శిక్షణకు స్వాగతం. ఇక్కడ ప్రతి పాఠాన్ని మీరు సులభంగా చదువుకోవచ్చు లేదా ఆడియో ద్వారా వినవచ్చు. బ్యాంకింగ్, పొదుపు, మరియు ప్రభుత్వ పథకాల గురించి సులభమైన వివరణలు ఇక్కడ ఉన్నాయి."
      : language === "hi"
      ? "डिजिटल वित्तीय प्रशिक्षण में आपका स्वागत है। यहां आप हर पाठ को आसानी से पढ़ सकती हैं या आवाज में सुन सकती हैं। बैंक खाता, बचत और सरकारी योजनाओं की सरल जानकारी यहां उपलब्ध है।"
      : "Welcome to DhanRaksha Digital Financial Training. Here you can easily read or listen to simple lessons on banking, savings, and government schemes in your preferred language.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              {language === "te" ? "డిజిటల్ ఆర్థిక శిక్షణ" : language === "hi" ? "डिजिटल वित्तीय प्रशिक्षण" : "Digital Financial Training"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif mt-2">
            {language === "te"
              ? "ఆర్థిక విజ్ఞానం — అతి సులభంగా"
              : language === "hi"
              ? "आसान भाषा में वित्तीय ज्ञान"
              : "Financial Training Made Simple"}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1">
            {language === "te"
              ? "ప్రతి గ్రామీణ మహిళ సులభంగా అర్థం చేసుకునేలా బ్యాంకింగ్, వడ్డీ, బడ్జెట్ మరియు బీమా గురించిన ఆడియో పాఠాలు."
              : language === "hi"
              ? "ग्रामीण महिलाओं के लिए बैंकिंग, ब्याज, बचत और बीमा के सरल पाठ — बोलकर सुनाने वाले सहायक के साथ।"
              : "Practical financial lessons with built-in voice assistant in English, Telugu, and Hindi."}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <AudioNarrationButton
            text={headerNarration}
            label={language === "te" ? "పరిచయం వినండి" : language === "hi" ? "विवरण सुनें" : "Listen to Overview"}
          />
        </div>
      </div>

      {/* Topics & Content Grid — No search bar, no category filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LEARNING_TOPICS.map((topic, index) => {
          const title =
            language === "te" ? topic.titleTe : language === "hi" ? topic.titleHi : topic.title;
          const summary =
            language === "te"
              ? topic.summaryTe || topic.explanationTe
              : language === "hi"
              ? topic.summaryHi || topic.explanationHi
              : topic.summary || topic.explanation;
          const explanation =
            language === "te" ? topic.explanationTe : language === "hi" ? topic.explanationHi : topic.explanation;
          const example =
            language === "te" ? topic.exampleTe : language === "hi" ? topic.exampleHi : topic.example;
          const actionTip =
            language === "te" ? topic.actionTipTe : language === "hi" ? topic.actionTipHi : topic.actionTip;

          const examplePrefix = language === "te" ? "ఉదాహరణ:" : language === "hi" ? "उदाहरण:" : "Example:";
          const tipPrefix = language === "te" ? "చిట్కా:" : language === "hi" ? "सुझाव:" : "Tip:";
          const fullNarrationText = `${title}. ${explanation} ${example ? `${examplePrefix} ${example}` : ""} ${actionTip ? `${tipPrefix} ${actionTip}` : ""}`;

          return (
            <div
              key={topic.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 flex flex-col justify-between space-y-4 hover:shadow-md hover:border-emerald-500 transition-all group"
            >
              <div className="space-y-3">
                {/* Card Top: Number & Voice Assistant Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-emerald-800 text-white font-black text-xs flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {topic.readTime || "2 min"}
                    </span>
                  </div>

                  {/* Voice Assistant Narration Button */}
                  <AudioNarrationButton
                    text={fullNarrationText}
                    size="sm"
                  />
                </div>

                {/* Topic Title */}
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif leading-snug group-hover:text-emerald-800 transition-colors">
                  {title}
                </h2>

                {/* Content / Explanation */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {summary || explanation}
                </p>

                {/* Real Life Village Example */}
                {example && (
                  <div className="bg-amber-50/80 border border-amber-200/80 p-3 rounded-2xl space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-900 font-bold text-[11px] uppercase tracking-wider">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                      <span>
                        {language === "te"
                          ? "గ్రామీణ ఉదాహరణ"
                          : language === "hi"
                          ? "गाँव का उदाहरण"
                          : "Real-Life Example"}
                      </span>
                    </div>
                    <p className="text-xs text-amber-950 font-medium leading-relaxed">
                      {example}
                    </p>
                  </div>
                )}

                {/* What to do today tip */}
                {actionTip && (
                  <div className="bg-emerald-50/80 border border-emerald-200/80 p-3 rounded-2xl flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-black text-emerald-950 uppercase tracking-wider block">
                        {language === "te"
                          ? "మీరు చేయవలసిన ముఖ్యమైన పని"
                          : language === "hi"
                          ? "आज का सुझाव"
                          : "Actionable Tip"}
                      </span>
                      <p className="text-xs text-emerald-900 font-medium mt-0.5">
                        {actionTip}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions: Read full lesson & Ask AI */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveTopic(topic)}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                >
                  <span>
                    {language === "te"
                      ? "వివరంగా చదవండి →"
                      : language === "hi"
                      ? "विस्तार से पढ़ें →"
                      : "Read Details →"}
                  </span>
                </button>

                <button
                  onClick={() =>
                    openChat(
                      language === "te"
                        ? `దయచేసి "${topic.titleTe || topic.title}" గురించి నాకు తెలుగులో సాధారణ మాటల్లో వివరించండి.`
                        : language === "hi"
                        ? `कृपया मुझे "${topic.titleHi || topic.title}" के बारे में सरल हिंदी में समझाएं।`
                        : `Please explain more about "${topic.title}" in simple words.`
                    )
                  }
                  className="px-2.5 py-1 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.askAi}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Reading/Listening to Full Lesson */}
      {activeTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
                  {activeTopic.readTime || "2 min"}
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif mt-0.5">
                  {language === "te"
                    ? activeTopic.titleTe
                    : language === "hi"
                    ? activeTopic.titleHi
                    : activeTopic.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveTopic(null)}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-800">
              {/* Audio Narrator Button */}
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl">
                <div className="text-xs sm:text-sm text-emerald-950 font-bold">
                  {language === "te"
                    ? "వాయిస్ అసిస్టెంట్ ద్వారా ఈ పాఠం వినండి:"
                    : language === "hi"
                    ? "वॉयस असिस्टेंट से यह पाठ सुनें:"
                    : "Listen to this lesson with voice assistant:"}
                </div>
                <AudioNarrationButton
                  text={`${
                    language === "te"
                      ? activeTopic.titleTe
                      : language === "hi"
                      ? activeTopic.titleHi
                      : activeTopic.title
                  }. ${
                    language === "te"
                      ? activeTopic.explanationTe
                      : language === "hi"
                      ? activeTopic.explanationHi
                      : activeTopic.explanation
                  }. ${
                    language === "te"
                      ? activeTopic.exampleTe
                      : language === "hi"
                      ? activeTopic.exampleHi
                      : activeTopic.example
                  }. ${
                    language === "te"
                      ? activeTopic.actionTipTe
                      : language === "hi"
                      ? activeTopic.actionTipHi
                      : activeTopic.actionTip
                  }`}
                  size="md"
                />
              </div>

              {/* Core Explanation */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {language === "te"
                    ? "వివరణ"
                    : language === "hi"
                    ? "मुख्य बात"
                    : "Core Concept"}
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-slate-800">
                  {language === "te"
                    ? activeTopic.explanationTe
                    : language === "hi"
                    ? activeTopic.explanationHi
                    : activeTopic.explanation}
                </p>
              </div>

              {/* Real World Example Card */}
              {activeTopic.example && (
                <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4 text-amber-700" />
                    <span>
                      {language === "te"
                        ? "గ్రామీణ ఉదాహరణ"
                        : language === "hi"
                        ? "गाँव का वास्तविक उदाहरण"
                        : "Real-Life Village Example"}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                    {language === "te"
                      ? activeTopic.exampleTe
                      : language === "hi"
                      ? activeTopic.exampleHi
                      : activeTopic.example}
                  </p>
                </div>
              )}

              {/* Actionable Takeaway */}
              {activeTopic.actionTip && (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider block">
                      {language === "te"
                        ? "మీరు చేయవలసిన ముఖ్యమైన పని"
                        : language === "hi"
                        ? "आज आप क्या कर सकती हैं"
                        : "What You Can Do Today"}
                    </span>
                    <p className="text-xs sm:text-sm text-emerald-900 mt-0.5 leading-relaxed font-medium">
                      {language === "te"
                        ? activeTopic.actionTipTe
                        : language === "hi"
                        ? activeTopic.actionTipHi
                        : activeTopic.actionTip}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  const topicTitle =
                    language === "te"
                      ? activeTopic.titleTe
                      : language === "hi"
                      ? activeTopic.titleHi
                      : activeTopic.title;
                  setActiveTopic(null);
                  openChat(
                    language === "te"
                      ? `దయచేసి "${topicTitle}" గురించి నాకు మరిన్ని వివరాలు చెప్పండి.`
                      : language === "hi"
                      ? `कृपया मुझे "${topicTitle}" के बारे में और जानकारी दें।`
                      : `Please explain more about "${topicTitle}" with simple rural examples.`
                  );
                }}
                className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Bot className="w-4 h-4 text-emerald-300" />
                <span>
                  {language === "te"
                    ? "ధనరక్ష AI ని అడగండి"
                    : language === "hi"
                    ? "धनरक्षा AI से पूछें"
                    : "Ask DhanRaksha AI"}
                </span>
              </button>

              <button
                onClick={() => setActiveTopic(null)}
                className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                {language === "te" ? "మూసివేయి" : language === "hi" ? "बंद करें" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
