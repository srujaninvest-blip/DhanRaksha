import React, { useState } from "react";
import {
  Target,
  Plus,
  Trash2,
  CheckCircle2,
  Calendar,
  Sparkles,
  TrendingUp,
  Bot,
  Award,
  ChevronRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useApp } from "../context/AppContext";
import { AudioNarrationButton } from "../components/AudioNarrationButton";

export const GoalsPage: React.FC = () => {
  const {
    goals,
    addGoal,
    updateGoalProgress,
    deleteGoal,
    openChat,
    language,
    userProfile,
    t,
  } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState(25000);
  const [monthlyContribution, setMonthlyContribution] = useState(2000);
  const [targetDate, setTargetDate] = useState("2026-12-31");
  const [category, setCategory] = useState<"Education" | "Emergency" | "Business" | "Family" | "Other">("Education");

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addGoal({
      name: name.trim(),
      nameTe: name.trim(),
      nameHi: name.trim(),
      targetAmount: Number(targetAmount) || 10000,
      currentAmount: 0,
      targetDate,
      category,
      monthlyContribution: Number(monthlyContribution) || 1000,
    });

    setName("");
    setTargetAmount(25000);
    setMonthlyContribution(2000);
    setShowAddModal(false);
  };

  const handleDeposit = (goalId: string, added: number) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) return;

    const newAmount = goal.currentAmount + added;
    updateGoalProgress(goalId, newAmount);

    // If completed, trigger festive celebratory confetti!
    if (newAmount >= goal.targetAmount) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#047857", "#0D9488", "#F59E0B", "#10B981"],
      });
    }
  };

  const totalSavedAcrossGoals = goals.reduce((acc, g) => acc + g.currentAmount, 0);
  const totalTargetAcrossGoals = goals.reduce((acc, g) => acc + g.targetAmount, 0);

  const bannerNarration =
    language === "te"
      ? "మీ కుటుంబ భవిష్యత్తు కోసం పొదుపు లక్ష్యాలు. పిల్లల చదువులు, అత్యవసర నిధి లేదా పశువుల కొనుగోలు వంటి ముఖ్యమైన అవసరాల కోసం క్రమశిక్షణతో పొదుపు చేయండి."
      : language === "hi"
      ? "अपने परिवार के सुनहरे भविष्य के लिए बचत लक्ष्य। बच्चों की पढ़ाई, आपातकालीन फंड या व्यापार के लिए नियमित रूप से पैसा जोड़ें।"
      : "Savings Goals for Your Family. Save with clear purpose. Whether it's school fees, emergency security, or livelihood assets, watching your progress gives confidence.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
              {language === "te" ? "లక్ష్యాల పురోగతి ట్రాకర్" : language === "hi" ? "लक्ष्य प्रगति ट्रैकर" : "Milestone Tracker"}
            </span>
            <AudioNarrationButton text={bannerNarration} size="sm" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif mt-1">
            {language === "te"
              ? "మీ కుటుంబం కోసం పొదుపు లక్ష్యాలు"
              : language === "hi"
              ? "आपके परिवार के लिए बचत लक्ष्य"
              : "Savings Goals for Your Family"}
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            {language === "te"
              ? "స్పష్టమైన లక్ష్యంతో పొదుపు చేయండి. పిల్లల చదువులు, అత్యవసర నిధి లేదా గేదెలు/మేకల కొనుగోలు అయినా, మీ పురోగతిని చూడటం ఆత్మవిశ్వాసాన్ని ఇస్తుంది."
              : language === "hi"
              ? "स्पष्ट उद्देश्य के साथ बचत करें। बच्चों की पढ़ाई हो, आपातकालीन सुरक्षा या आजीविका साधन, हर महीने की बचत आपका आत्मविश्वास बढ़ाती है।"
              : "Save with clear purpose. Whether it's school fees, emergency security, or livestock for extra income, watching your progress gives confidence."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>
              {language === "te" ? "కొత్త లక్ష్యం ప్రారంభించండి" : language === "hi" ? "नया लक्ष्य बनाएं" : "Create New Goal"}
            </span>
          </button>
        </div>
      </div>

      {/* Overview Metric Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            {language === "te" ? "మొత్తం దాచిన సొమ్ము" : language === "hi" ? "कुल संचित बचत" : "Total Saved Across Goals"}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-800 mt-1">
            ₹{totalSavedAcrossGoals.toLocaleString("en-IN")}
          </div>
          <span className="text-xs text-slate-500">
            {language === "te" ? "లక్ష్యం:" : language === "hi" ? "कुल लक्ष्य:" : "Out of"} ₹{totalTargetAcrossGoals.toLocaleString("en-IN")}
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            {language === "te" ? "చురుకైన లక్ష్యాలు" : language === "hi" ? "सक्रिय लक्ष्य" : "Active Targets"}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {goals.length} {language === "te" ? "లక్ష్యాలు" : language === "hi" ? "लक्ष्य" : "Goals"}
          </div>
          <span className="text-xs text-slate-500">
            {language === "te" ? "నిరంతరం గమనిస్తున్నవి" : language === "hi" ? "नियमित ट्रैक किए जा रहे हैं" : "Tracked regularly in your plan"}
          </span>
        </div>

        <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white p-5 rounded-2xl shadow-xs">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block">
            {language === "te" ? "మొత్తం పూర్తయిన శాతం" : language === "hi" ? "समग्र पूर्णता" : "Overall Completion"}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-white mt-1">
            {totalTargetAcrossGoals > 0
              ? Math.round((totalSavedAcrossGoals / totalTargetAcrossGoals) * 100)
              : 0}
            %
          </div>
          <span className="text-xs text-emerald-200">
            {language === "te" ? "ప్రతి నెలా క్రమం తప్పకుండా పొదుపు చేయండి!" : language === "hi" ? "हर महीने नियमित जमा करते रहें!" : "Keep depositing every month!"}
          </span>
        </div>
      </div>

      {/* Goals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = Math.min(100, Math.round((goal.currentAmount / Math.max(1, goal.targetAmount)) * 100));
          const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);
          const monthsLeft =
            goal.monthlyContribution > 0 ? Math.ceil(remaining / goal.monthlyContribution) : 0;
          const isFinished = goal.currentAmount >= goal.targetAmount;

          const title = language === "te" ? goal.nameTe : language === "hi" ? goal.nameHi : goal.name;

          return (
            <div
              key={goal.id}
              className={`bg-white rounded-2xl border shadow-xs p-6 flex flex-col justify-between space-y-4 transition-all ${
                isFinished ? "border-emerald-500 bg-emerald-50/20" : "border-slate-200"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {goal.category}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 mt-1 font-serif">
                      {title}
                    </h2>
                  </div>

                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                    title={language === "te" ? "లక్ష్యాన్ని తొలగించండి" : language === "hi" ? "लक्ष्य हटाएं" : "Delete goal"}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-2xl font-black text-slate-900">
                      ₹{goal.currentAmount.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-slate-400 block">{t.currentSaved}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-700">
                      ₹{goal.targetAmount.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-slate-400 block">{t.targetAmount}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        isFinished ? "bg-emerald-600" : "bg-emerald-700"
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span className="text-emerald-800 font-bold">{progress}% {language === "te" ? "పూర్తయింది" : language === "hi" ? "पूर्ण" : "Saved"}</span>
                    <span>
                      {isFinished
                        ? t.goalAchieved
                        : language === "te"
                        ? `ఇంకా ${monthsLeft} నెలలు`
                        : language === "hi"
                        ? `और ${monthsLeft} महीने बाकी`
                        : `${monthsLeft} months to goal`}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    {language === "te" ? "నెల ప్రణాళిక:" : language === "hi" ? "मासिक योजना:" : "Planned:"} ₹{goal.monthlyContribution.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Interactive Money Adjustment Slider (Same as monthly expenses) */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>
                      {t.adjustSavingsSlider}
                    </span>
                    <span className="text-emerald-800 font-black text-sm">
                      ₹{goal.currentAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={Math.max(goal.targetAmount, 50000)}
                    step="250"
                    value={goal.currentAmount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      updateGoalProgress(goal.id, val);
                      if (val >= goal.targetAmount && goal.currentAmount < goal.targetAmount) {
                        confetti({
                          particleCount: 70,
                          spread: 60,
                          origin: { y: 0.6 },
                          colors: ["#047857", "#0D9488", "#F59E0B", "#10B981"],
                        });
                      }
                    }}
                    className="w-full accent-emerald-700 h-2 bg-slate-100 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                    <span>₹0</span>
                    <span>
                      {language === "te"
                        ? "డబ్బు సర్దుబాటు చేయడానికి జరపండి"
                        : language === "hi"
                        ? "पैसे समायोजित करने के लिए स्लाइड करें"
                        : "Slide to adjust saved money"}
                    </span>
                    <span>₹{Math.max(goal.targetAmount, 50000).toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Quick Increments */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-xs font-bold text-slate-700 block">
                  {language === "te"
                    ? "త్వరిత మార్పులు (+/- బటన్లు):"
                    : language === "hi"
                    ? "त्वरित बदलाव (+/- बटन):"
                    : "Quick adjustments:"}
                </span>
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    key="minus-500"
                    onClick={() => updateGoalProgress(goal.id, Math.max(0, goal.currentAmount - 500))}
                    className="py-1.5 px-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-bold transition-all cursor-pointer text-center"
                  >
                    -₹500
                  </button>
                  {[500, 1000, 2000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => handleDeposit(goal.id, amt)}
                      className="py-1.5 px-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold hover:bg-emerald-100 active:scale-95 transition-all cursor-pointer text-center"
                    >
                      +₹{amt}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    openChat(
                      language === "te"
                        ? `నేను "${title}" కోసం ₹${goal.targetAmount} పొదుపు చేయాలనుకుంటున్నాను. నెలకు ₹${userProfile.income || 15000} సంపాదనలో ఇది త్వరగా సాధించడానికి సలహా ఇవ్వండి.`
                        : language === "hi"
                        ? `मैं "${title}" के लिए ₹${goal.targetAmount} जोड़ना चाहती हूँ। ₹${userProfile.income || 15000} की मासिक आय में इसे जल्दी पूरा करने की सलाह दें।`
                        : `I want to save for "${title}" with a target of ₹${goal.targetAmount}. How can I achieve this quickly on a ₹${userProfile.income || 15000} monthly income?`
                    )
                  }
                  className="w-full mt-2 py-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5 text-emerald-600" />
                  <span>
                    {language === "te"
                      ? "త్వరగా సాధించే మార్గం AI ని అడగండి →"
                      : language === "hi"
                      ? "जल्दी लक्ष्य पाने का उपाय AI से पूछें →"
                      : "Ask AI how to reach faster →"}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for adding new goal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 bg-emerald-800 text-white flex items-center justify-between">
              <h3 className="text-lg font-bold font-serif">
                {language === "te"
                  ? "కొత్త పొదుపు లక్ష్యాన్ని నిర్ణయించండి"
                  : language === "hi"
                  ? "नया बचत लक्ष्य निर्धारित करें"
                  : "Create New Savings Target"}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-emerald-200 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddGoal} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {language === "te" ? "లక్ష్యం పేరు" : language === "hi" ? "लक्ष्य का नाम" : "Goal Name"}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={
                    language === "te"
                      ? "ఉదా: పిల్లల కాలేజ్ ఫీజు, గేదె కొనుగోలు"
                      : language === "hi"
                      ? "उदा: बेटी की कॉलेज फीस, दुधारू पशु"
                      : "e.g. Daughter's College Fees, Dairy Buffalo"
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t.targetAmount} (₹)
                  </label>
                  <input
                    type="number"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(Number(e.target.value))}
                    min="1000"
                    step="500"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {language === "te" ? "నెల ప్రణాళిక (₹)" : language === "hi" ? "मासिक जमा (₹)" : "Monthly Plan (₹)"}
                  </label>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    min="100"
                    step="100"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {language === "te" ? "వర్గం" : language === "hi" ? "श्रेणी" : "Category"}
                </label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Education">
                    {language === "te" ? "విద్య / చదువు" : language === "hi" ? "शिक्षा / पढ़ाई" : "Education"}
                  </option>
                  <option value="Emergency">
                    {language === "te" ? "అత్యవసర నిధి" : language === "hi" ? "आपातकालीन फंड" : "Emergency"}
                  </option>
                  <option value="Business">
                    {language === "te" ? "వ్యాపారం / వ్యవసాయం" : language === "hi" ? "व्यापार / खेती" : "Business / Farming"}
                  </option>
                  <option value="Family">
                    {language === "te" ? "కుటుంబం / గృహం" : language === "hi" ? "परिवार / घर" : "Family / Home"}
                  </option>
                  <option value="Other">
                    {language === "te" ? "ఇతర" : language === "hi" ? "अन्य" : "Other"}
                  </option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  {language === "te" ? "రద్దు" : language === "hi" ? "रद्द करें" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-black bg-emerald-800 text-white rounded-xl hover:bg-emerald-900 shadow-xs"
                >
                  {language === "te" ? "లక్ష్యాన్ని దాచండి" : language === "hi" ? "लक्ष्य सहेजें" : "Save Goal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
