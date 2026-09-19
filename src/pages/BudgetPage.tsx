import React, { useState } from "react";
import {
  Wallet,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  TrendingDown,
  Sparkles,
  RefreshCw,
  Info,
  DollarSign,
  ArrowRight,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { SvgDonutChart, ChartSegment } from "../components/SvgDonutChart";
import { AudioNarrationButton } from "../components/AudioNarrationButton";

export const BudgetPage: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    budgetCategories,
    addBudgetCategory,
    updateBudgetCategoryAmount,
    removeBudgetCategory,
    openChat,
    language,
    t,
  } = useApp();

  const [newCatName, setNewCatName] = useState("");
  const [newCatAmount, setNewCatAmount] = useState(1000);
  const [showAddForm, setShowAddForm] = useState(false);

  const totalIncome = userProfile.income || 0;
  const totalExpenses = budgetCategories.reduce((sum, c) => sum + c.amount, 0);
  const remaining = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? Math.round((remaining / totalIncome) * 100) : 0;

  const chartSegments: ChartSegment[] = budgetCategories.map((c) => ({
    id: c.id,
    name: language === "te" ? c.nameTe : language === "hi" ? c.nameHi : c.name,
    value: c.amount,
    color: c.color,
  }));

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const colors = ["#047857", "#0D9488", "#F59E0B", "#6366F1", "#EC4899", "#8B5CF6", "#14B8A6"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    addBudgetCategory({
      name: newCatName.trim(),
      nameTe: newCatName.trim(),
      nameHi: newCatName.trim(),
      amount: Number(newCatAmount) || 500,
      color: randomColor,
      isEssential: true,
    });

    setNewCatName("");
    setNewCatAmount(1000);
    setShowAddForm(false);
  };

  const applyTemplate = (templateType: "balanced" | "aggressive_saver" | "minimal") => {
    if (templateType === "balanced") {
      updateBudgetCategoryAmount("cat-1", 4500); // Food
      updateBudgetCategoryAmount("cat-2", 2000); // Education
      updateBudgetCategoryAmount("cat-3", 1000); // Healthcare
      updateBudgetCategoryAmount("cat-4", 1000); // Utilities
      updateBudgetCategoryAmount("cat-5", 800);  // Transport
    } else if (templateType === "aggressive_saver") {
      updateBudgetCategoryAmount("cat-1", 4000);
      updateBudgetCategoryAmount("cat-2", 1500);
      updateBudgetCategoryAmount("cat-3", 800);
      updateBudgetCategoryAmount("cat-4", 800);
      updateBudgetCategoryAmount("cat-5", 500);
    } else if (templateType === "minimal") {
      updateBudgetCategoryAmount("cat-1", 5000);
      updateBudgetCategoryAmount("cat-2", 2500);
      updateBudgetCategoryAmount("cat-3", 1200);
      updateBudgetCategoryAmount("cat-4", 1200);
      updateBudgetCategoryAmount("cat-5", 1000);
    }
  };

  const budgetSummaryNarration =
    language === "te"
      ? `మీ మొత్తం ఆదాయం నెలకు ₹${totalIncome}. మొత్తం ప్రణాళిక చేసిన ఖర్చులు ₹${totalExpenses}. మీ పొదుపు కోసం లేదా అత్యవసర నిధి కోసం ₹${remaining} మిగిలి ఉన్నాయి.`
      : language === "hi"
      ? `आपकी कुल मासिक आय ₹${totalIncome} है। कुल नियोजित खर्च ₹${totalExpenses} है। आपकी बचत या इमरजेंसी फंड के लिए ₹${remaining} शेष बचते हैं।`
      : `Your total income is ₹${totalIncome}. Total planned expenses are ₹${totalExpenses}. You have ₹${remaining} remaining to put into your savings or emergency fund.`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
              {language === "te"
                ? "నెలవారీ బడ్జెట్ ప్రణాళిక"
                : language === "hi"
                ? "मासिक बजट योजना"
                : "Monthly Budget Planner"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif mt-1">
            {language === "te"
              ? "తెలివైన మరియు సులభమైన బడ్జెట్"
              : language === "hi"
              ? "सरल और समझदार मासिक बजट"
              : "Smart & Simple Budgeting"}
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mt-1">
            {language === "te"
              ? "ప్రతి రూపాయి ఎక్కడికి వెళ్తుందో చూడండి. ముఖ్యమైన ఖర్చులను అదుపులో ఉంచుకోవడం ద్వారా భవిష్యత్తు కోసం నిశ్చింతగా పొదుపు చేయండి."
              : language === "hi"
              ? "देखें हर रुपया कहाँ जा रहा है। ज़रूरी खर्चों को नियंत्रित रख कर भविष्य के लिए निश्चिंत होकर बचत करें।"
              : "See where every rupee goes. Keep essentials under control so you always have peace of mind and money saved for tomorrow."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <AudioNarrationButton
            text={budgetSummaryNarration}
            label={language === "te" ? "సారాంశం వినండి" : language === "hi" ? "सारांश सुनें" : "Listen to Summary"}
          />
        </div>
      </div>

      {/* Financial Equation Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left items-center">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {language === "te" ? "1. మీ నెల సంపాదన" : language === "hi" ? "1. आपकी मासिक कमाई" : "1. Your Monthly Earnings"}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              ₹{totalIncome.toLocaleString("en-IN")}
            </div>
            <span className="text-[11px] text-emerald-400 font-medium">
              {language === "te" ? "మూల ఆదాయం" : language === "hi" ? "मूल आय" : "Income base"}
            </span>
          </div>

          <div className="border-t sm:border-t-0 sm:border-l border-slate-800 pt-4 sm:pt-0 sm:pl-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {language === "te" ? "2. మొత్తం ప్రణాళిక ఖర్చులు" : language === "hi" ? "2. कुल नियोजित खर्च" : "2. Total Planned Outflow"}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
              - ₹{totalExpenses.toLocaleString("en-IN")}
            </div>
            <span className="text-[11px] text-amber-300 font-medium">
              {budgetCategories.length} {language === "te" ? "రకాల ఖర్చులు" : language === "hi" ? "श्रेणियों में" : "categories"}
            </span>
          </div>

          <div className="border-t sm:border-t-0 sm:border-l border-slate-800 pt-4 sm:pt-0 sm:pl-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {language === "te" ? "3. పొదుపుకు మిగిలిన మొత్తం" : language === "hi" ? "3. बचत के लिए शेष" : "3. Surplus to Save"}
            </span>
            <div
              className={`text-2xl sm:text-3xl font-black mt-1 ${
                remaining >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              = ₹{remaining.toLocaleString("en-IN")}
            </div>
            <span className="text-[11px] text-slate-300 font-medium">
              {remaining >= 0
                ? `${savingsRate}% ${language === "te" ? "పొదుపు శాతం" : language === "hi" ? "बचत दर" : "savings margin"}`
                : language === "te" ? "లోటు — ఖర్చులు తగ్గించండి" : language === "hi" ? "घाटा — खर्च कम करें" : "Deficit — Reduce expenses"}
            </span>
          </div>
        </div>

        {/* Warning if overspending */}
        {remaining < 0 && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>
              {language === "te"
                ? `మీ ఖర్చులు ఆదాయం కంటే ₹${Math.abs(remaining).toLocaleString("en-IN")} ఎక్కువగా ఉన్నాయి. బడ్జెట్ సమతుల్యం కోసం క్రింది ఖర్చులను తగ్గించండి.`
                : language === "hi"
                ? `आपके खर्च आय से ₹${Math.abs(remaining).toLocaleString("en-IN")} अधिक हैं। बजट संतुलित करने के लिए नीचे के खर्च घटाएं।`
                : `Your expenses exceed your income by ₹${Math.abs(remaining).toLocaleString("en-IN")}. Adjust your category amounts below to balance your budget.`}
            </span>
          </div>
        )}
      </div>

      {/* Preset Budget Templates */}
      <div className="bg-emerald-50/60 border border-emerald-200 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-700" />
          <span className="text-sm font-bold text-emerald-950">
            {language === "te" ? "శీఘ్ర బడ్జెట్ నమూనాలు:" : language === "hi" ? "त्वरित बजट मॉडल:" : "Quick Budget Presets:"}
          </span>
          <span className="text-xs text-slate-600 hidden md:inline">
            {language === "te"
              ? "ఒక్క క్లిక్‌తో సమతుల్య ప్రణాళికను వర్తింపజేయండి"
              : language === "hi"
              ? "एक क्लिक में संतुलित योजना लागू करें"
              : "Tap a preset to quickly apply a balanced plan"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => applyTemplate("balanced")}
            className="px-3 py-1.5 bg-white text-emerald-900 border border-emerald-300 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            {language === "te" ? "సమతుల్యం (50/30/20)" : language === "hi" ? "संतुलित (50/30/20)" : "Balanced (50/30/20)"}
          </button>
          <button
            onClick={() => applyTemplate("aggressive_saver")}
            className="px-3 py-1.5 bg-white text-emerald-900 border border-emerald-300 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            {language === "te" ? "అధిక పొదుపు (₹7,100 మిగులు)" : language === "hi" ? "अधिक बचत (₹7,100 शेष)" : "High Saver (₹7,100 left)"}
          </button>
          <button
            onClick={() => applyTemplate("minimal")}
            className="px-3 py-1.5 bg-white text-emerald-900 border border-emerald-300 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            {language === "te" ? "పండుగ / పంట కాలం" : language === "hi" ? "त्योहार / कटाई का समय" : "Festival / Harvest Season"}
          </button>
        </div>
      </div>

      {/* Main Budget Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Categories List (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
              {language === "te" ? "ఖర్చుల రకాలు (స్లైడర్లతో మార్చండి)" : language === "hi" ? "खर्च की श्रेणियां (स्लाइडर से बदलें)" : "Expense Categories"}
            </h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>
                {language === "te" ? "కొత్త ఖర్చు జోడించండి" : language === "hi" ? "नया खर्च जोड़ें" : "Add Custom Category"}
              </span>
            </button>
          </div>

          {/* New Category Form */}
          {showAddForm && (
            <form
              onSubmit={handleAddCategory}
              className="bg-white p-4 rounded-2xl border border-emerald-300 shadow-sm space-y-3 animate-in fade-in duration-150"
            >
              <h3 className="text-sm font-bold text-slate-900">
                {language === "te" ? "కొత్త ఖర్చు వివరాలు" : language === "hi" ? "नए खर्च का विवरण" : "Add New Expense Item"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    {language === "te" ? "ఖర్చు పేరు" : language === "hi" ? "खर्च का नाम" : "Category Name"}
                  </label>
                  <input
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder={
                      language === "te"
                        ? "ఉదా: పశువుల దాణా, దర్జీ సామాగ్రి"
                        : language === "hi"
                        ? "उदा: पशु चारा, सिलाई सामग्री"
                        : "e.g. Livestock Feed, Tailoring Supplies"
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">
                    {language === "te" ? "నెల ఖర్చు (₹)" : language === "hi" ? "मासिक राशि (₹)" : "Monthly Amount (₹)"}
                  </label>
                  <input
                    type="number"
                    value={newCatAmount}
                    onChange={(e) => setNewCatAmount(Number(e.target.value))}
                    min="50"
                    step="50"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  {language === "te" ? "రద్దు" : language === "hi" ? "रद्द करें" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold bg-emerald-800 text-white rounded-lg hover:bg-emerald-900"
                >
                  {language === "te" ? "భద్రపరచండి" : language === "hi" ? "सहेजें" : "Save Category"}
                </button>
              </div>
            </form>
          )}

          {/* Categories items list with interactive sliders */}
          <div className="space-y-3">
            {budgetCategories.map((cat) => {
              const name = language === "te" ? cat.nameTe : language === "hi" ? cat.nameHi : cat.name;
              const pctOfIncome = totalIncome > 0 ? Math.round((cat.amount / totalIncome) * 100) : 0;

              return (
                <div
                  key={cat.id}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-4 h-4 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm sm:text-base">
                            {name}
                          </span>
                          {cat.isEssential && (
                            <span className="text-[10px] font-bold px-2 py-0.2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full">
                              {t.essential}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400">
                          {pctOfIncome}% {language === "te" ? "ఆదాయంలో వాటా" : language === "hi" ? "आय का हिस्सा" : "of income"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-base sm:text-lg font-black text-slate-900">
                        ₹{cat.amount.toLocaleString("en-IN")}
                      </span>

                      {budgetCategories.length > 3 && (
                        <button
                          onClick={() => removeBudgetCategory(cat.id)}
                          className="p-1 text-slate-300 hover:text-rose-500 rounded-lg transition-colors cursor-pointer"
                          title={language === "te" ? "తొలగించండి" : language === "hi" ? "हटाएं" : "Delete"}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Slider Control */}
                  <div className="space-y-1">
                    <input
                      type="range"
                      min="0"
                      max="15000"
                      step="100"
                      value={cat.amount}
                      onChange={(e) => updateBudgetCategoryAmount(cat.id, Number(e.target.value))}
                      className="w-full accent-emerald-700 h-2 bg-slate-100 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                      <span>₹0</span>
                      <span>
                        {language === "te"
                          ? "ఖర్చు సర్దుబాటుకు జరపండి"
                          : language === "hi"
                          ? "खर्च बदलने के लिए स्लाइड करें"
                          : "Slide to adjust"}
                      </span>
                      <span>₹15,000</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Donut Chart & Advice (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
              {t.spendingBreakdown}
            </h3>
            <p className="text-xs text-slate-500">
              {t.spendingSubtitle}
            </p>

            <SvgDonutChart
              segments={chartSegments}
              totalLabel={t.expensesLabel}
              totalValue={totalExpenses}
              centerSubtitle={language === "te" ? "ప్రతి నెలా" : language === "hi" ? "प्रति माह" : "per month"}
              size={220}
            />

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                {language === "te" ? "నెలకు మిగిలినది:" : language === "hi" ? "माह की बचत:" : "Monthly Savings Cushion:"}
              </span>
              <span
                className={`font-black text-sm ${
                  remaining >= 0 ? "text-emerald-700" : "text-rose-600"
                }`}
              >
                ₹{remaining.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-200 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                {language === "te" ? "ధనరక్ష బడ్జెట్ సలహా" : language === "hi" ? "धनरक्षा बजट सलाह" : "DhanRaksha Budget Tip"}
              </span>
            </div>

            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              {language === "te"
                ? `మీరు కిరాణా మరియు కూరగాయల ఖర్చులను స్థానిక సంతలో ముందుగానే ప్లాన్ చేసుకోవడం ద్వారా నెలకు ₹500 నుండి ₹1,000 వరకు ఆదా చేయవచ్చు.`
                : language === "hi"
                ? `सप्ताहिक हाट-बाज़ार से थोक में अनाज और सब्ज़ियां खरीद कर आप हर महीने ₹500 से ₹1,000 की अतिरिक्त बचत कर सकती हैं।`
                : `By planning weekly groceries at local wholesale markets, rural families can typically save ₹500 to ₹1,000 per month.`}
            </p>

            <button
              onClick={() =>
                openChat(
                  language === "te"
                    ? "నా ఇంటి బడ్జెట్‌లో ఖర్చులు తగ్గించి మరింత పొదుపు చేయడానికి మార్గాలు చెప్పండి."
                    : language === "hi"
                    ? "मेरे घरेलू खर्च कम करके अधिक बचत करने के आसान तरीके बताएं।"
                    : "How can I reduce household spending and save more money without affecting health or education?"
                )
              }
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer pt-1"
            >
              <span>
                {language === "te"
                  ? "AI తో బడ్జెట్ చర్చించండి →"
                  : language === "hi"
                  ? "AI से बजट पर बात करें →"
                  : "Discuss budget options with AI →"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
