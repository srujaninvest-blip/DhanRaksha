import React, { useState } from "react";
import {
  Wallet,
  TrendingUp,
  PiggyBank,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Plus,
  ArrowRight,
  Bot,
  Target,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronRight,
  PieChart,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { SvgDonutChart, ChartSegment } from "../components/SvgDonutChart";
import { AudioNarrationButton } from "../components/AudioNarrationButton";

export const DashboardPage: React.FC = () => {
  const {
    userProfile,
    goals,
    budgetCategories,
    updateGoalProgress,
    openChat,
    setActivePage,
    language,
    t,
  } = useApp();

  // Compute financial totals
  const totalIncome = userProfile.income || 0;
  const totalExpenses = budgetCategories.reduce((sum, cat) => sum + cat.amount, 0);
  const availableToSave = Math.max(0, totalIncome - totalExpenses);
  const savingsRate = totalIncome > 0 ? Math.round((availableToSave / totalIncome) * 100) : 0;

  // Financial health evaluation
  let healthStatus = language === "te" ? "మంచి స్థితి" : language === "hi" ? "उत्तम स्थिति" : "Good";
  let healthColor = "text-emerald-700 bg-emerald-50 border-emerald-200";
  let healthMessage =
    language === "te"
      ? "అద్భుతం! మీ ఆదాయంలో 20% కంటే ఎక్కువ మిగులు ఉంది. మీరు సురక్షితమైన మార్గంలో ఉన్నారు."
      : language === "hi"
      ? "बहुत बढ़िया! आपकी आय में से 20% से अधिक बच रहा है। आप सुरक्षित रास्ते पर हैं।"
      : "Excellent! You are saving over 20% of your earnings. You have a solid safety margin.";

  if (savingsRate < 10) {
    healthStatus = language === "te" ? "జాగ్రత్త అవసరం" : language === "hi" ? "सावधानी जरूरी" : "At Risk";
    healthColor = "text-rose-700 bg-rose-50 border-rose-200";
    healthMessage =
      language === "te"
        ? "జాగ్రత్త! మీ ఖర్చులు దాదాపు ఆదాయానికి సమానంగా ఉన్నాయి. అత్యవసరాల కోసం కొద్దిగా తగ్గించండి."
        : language === "hi"
        ? "सावधानी! आपके खर्च आय के बहुत करीब हैं। आपातकाल के लिए कुछ बचत जरूर करें।"
        : "Caution: Your expenses take up almost all your income. Look for small ways to reduce discretionary spending.";
  } else if (savingsRate < 20) {
    healthStatus = language === "te" ? "మరింత శ్రద్ధ" : language === "hi" ? "ध्यान देने योग्य" : "Needs Attention";
    healthColor = "text-amber-700 bg-amber-50 border-amber-200";
    healthMessage =
      language === "te"
        ? "బాగుంది, కానీ అత్యవసర నిధిని వేగంగా నిర్మించడానికి చిన్న ఖర్చులను సమీక్షించండి."
        : language === "hi"
        ? "ठीक है, लेकिन इमरजेंसी फंड जल्दी बनाने के लिए खर्चों पर थोड़ा और नियंत्रण रखें।"
        : "Fair: You have a small cushion. Aim to build at least 3 months of basic expenses in an emergency fund.";
  }

  // Chart segments
  const chartSegments: ChartSegment[] = budgetCategories.map((c) => ({
    id: c.id,
    name: language === "te" ? c.nameTe : language === "hi" ? c.nameHi : c.name,
    value: c.amount,
    color: c.color,
  }));

  const smartAdviceText =
    language === "te"
      ? `ధనరక్ష AI సలహా: ${userProfile.name} గారు, మీ చేతిలో ప్రతి నెలా ₹${availableToSave.toLocaleString("en-IN")} మిగులుతోంది. ఇందులో కనీసం ₹2,500 పోస్టాఫీస్ రికరింగ్ డిపాజిట్ (RD) లేదా మహిళా సంఘం (SHG) లో జమ చేస్తే పిల్లల చదువుల ఫీజులకు సమయానికి ధైర్యంగా ఉంటుంది.`
      : language === "hi"
      ? `धनरक्षा AI सलाह: ${userProfile.name} जी, हर महीने आपके पास ₹${availableToSave.toLocaleString("en-IN")} बचते हैं। इसमें से ₹2,500 डाकघर आरडी (RD) या महिला समूह (SHG) में जमा करने से बच्चों की पढ़ाई और भविष्य सुरक्षित रहेगा।`
      : `DhanRaksha AI Advice: ${userProfile.name}, since you have ₹${availableToSave.toLocaleString("en-IN")} available each month, setting aside ₹2,500 into a safe Post Office RD or Self-Help Group (SHG) will guarantee your family goals are met on time.`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Profile Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              {language === "te"
                ? "వ్యక్తిగత ఆర్థిక పాస్‌బుక్"
                : language === "hi"
                ? "व्यक्तिगत वित्तीय पासबुक"
                : "Personal Financial Passbook"}
            </span>
            <span className="text-xs font-bold text-slate-500">• {userProfile.occupation}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
            {language === "te"
              ? `స్వాగతం, ${userProfile.name} గారు`
              : language === "hi"
              ? `नमस्ते, ${userProfile.name} जी`
              : `Welcome, ${userProfile.name}`}
          </h1>
          <p className="text-sm text-slate-600">
            {language === "te"
              ? "మీ నెలవారీ బడ్జెట్, పొదుపు లక్ష్యాలు మరియు భద్రతా సమాచారం ఇక్కడ ఉన్నాయి."
              : language === "hi"
              ? "आपकी मासिक आय, खर्च, सक्रिय बचत लक्ष्य और सुरक्षा विवरण यहाँ उपलब्ध हैं।"
              : "Here is your monthly money status, active savings targets, and safety guidance."}
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              openChat(
                language === "te"
                  ? `నా నెలవారీ ఆదాయం ₹${totalIncome} మరియు ఖర్చులు ₹${totalExpenses}. నాకు అనువైన సులభమైన పొదుపు ప్రణాళిక ఇవ్వండి.`
                  : language === "hi"
                  ? `मेरी मासिक आय ₹${totalIncome} और खर्च ₹${totalExpenses} है। मुझे एक सरल बचत योजना बताएं।`
                  : `Based on my monthly income of ₹${totalIncome} and expenses of ₹${totalExpenses}, please give me a simple step-by-step savings plan.`
              )
            }
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-sm font-bold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Bot className="w-4 h-4 text-emerald-300" />
            <span>{t.askForPlan}</span>
          </button>
        </div>
      </div>

      {/* Primary Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Income Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t.incomeLabel}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              ₹{totalIncome.toLocaleString("en-IN")}
            </div>
            <span className="text-xs font-medium text-emerald-700 block">
              {userProfile.occupation}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Wallet className="w-5 h-5" />
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {t.expensesLabel}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              ₹{totalExpenses.toLocaleString("en-IN")}
            </div>
            <span className="text-xs font-medium text-slate-500 block">
              {budgetCategories.length} {language === "te" ? "ఖర్చుల రకాలు" : language === "hi" ? "खर्च श्रेणियां" : "tracked categories"}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Available to Save Card */}
        <div className="bg-emerald-900 text-white p-5 rounded-2xl shadow-md shadow-emerald-950/15 flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
              {t.availableLabel}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white">
              ₹{availableToSave.toLocaleString("en-IN")}
            </div>
            <span className="text-xs font-medium text-emerald-300 block">
              {savingsRate}% {language === "te" ? "నెలవారీ పొదుపు శాతం" : language === "hi" ? "मासिक बचत दर" : "monthly savings margin"}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-800 text-emerald-200 flex items-center justify-center">
            <PiggyBank className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Financial Health Status Meter */}
      <div className={`p-5 rounded-2xl border ${healthColor} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
        <div className="flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-white shadow-xs">
            {savingsRate >= 20 ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-700" />
            ) : savingsRate >= 10 ? (
              <AlertTriangle className="w-6 h-6 text-amber-700" />
            ) : (
              <AlertCircle className="w-6 h-6 text-rose-700" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                {t.financialHealth}
              </span>
              <span className="font-extrabold text-sm px-2 py-0.5 rounded-full bg-white border border-current">
                {healthStatus}
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-800 mt-1 max-w-2xl">
              {healthMessage}
            </p>
          </div>
        </div>

        <div className="shrink-0 flex items-center gap-2">
          <AudioNarrationButton text={healthMessage} label={language === "te" ? "వినండి" : language === "hi" ? "सुनें" : "Listen"} size="sm" />
        </div>
      </div>

      {/* Two Column Grid: Goals & Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Active Savings Goals (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                {t.activeSavingsGoals}
              </h2>
              <p className="text-xs text-slate-500">
                {t.realProgressSubtitle}
              </p>
            </div>
            <button
              onClick={() => setActivePage("goals")}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
            >
              <span>{t.manageGoals}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3.5">
            {goals.map((goal) => {
              const progressPct = Math.min(100, Math.round((goal.currentAmount / Math.max(1, goal.targetAmount)) * 100));
              const remainingAmount = Math.max(0, goal.targetAmount - goal.currentAmount);

              return (
                <div
                  key={goal.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-base">
                          {language === "te" ? goal.nameTe : language === "hi" ? goal.nameHi : goal.name}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {goal.category}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">
                        {language === "te" ? "నెల ప్రణాళిక:" : language === "hi" ? "मासिक योजना:" : "Monthly plan:"} ₹{goal.monthlyContribution.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-black text-slate-900">
                        ₹{goal.currentAmount.toLocaleString("en-IN")}
                      </div>
                      <span className="text-xs text-slate-500">
                        {t.targetAmount}: ₹{goal.targetAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-700 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-slate-600 font-medium pt-0.5">
                      <span className="text-emerald-800 font-bold">{progressPct}% {language === "te" ? "పూర్తయింది" : language === "hi" ? "पूर्ण" : "Complete"}</span>
                      <span>₹{remainingAmount.toLocaleString("en-IN")} {t.remainingAmount}</span>
                    </div>
                  </div>

                  {/* Interactive Money Adjustment Slider (Same as monthly expenses) */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                      <span>{t.adjustSavingsSlider}</span>
                      <span className="font-bold text-emerald-800">₹{goal.currentAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={Math.max(goal.targetAmount, 50000)}
                      step="250"
                      value={goal.currentAmount}
                      onChange={(e) => updateGoalProgress(goal.id, Number(e.target.value))}
                      className="w-full accent-emerald-700 h-2 bg-slate-100 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Deposit simulation buttons */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-xs text-slate-500">
                      {language === "te" ? "తక్షణ జోడింపు:" : language === "hi" ? "त्वरित जोड़ें:" : "Quick add:"}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {[200, 500, 1000].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => {
                            updateGoalProgress(goal.id, goal.currentAmount + amt);
                          }}
                          className="px-2.5 py-1 text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
                        >
                          +₹{amt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Monthly Expense Distribution & AI Tip (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Donut Chart Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                  {t.spendingBreakdown}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === "te"
                    ? `మొత్తం ₹${totalExpenses.toLocaleString("en-IN")} ఖర్చుల విభజన`
                    : language === "hi"
                    ? `कुल ₹${totalExpenses.toLocaleString("en-IN")} खर्च का विभाजन`
                    : `Distribution of your ₹${totalExpenses.toLocaleString("en-IN")} spending`}
                </p>
              </div>
              <button
                onClick={() => setActivePage("budget")}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
              >
                <span>{language === "te" ? "మార్చండి" : language === "hi" ? "बदलें" : "Edit"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <SvgDonutChart
              segments={chartSegments}
              totalLabel={t.expensesLabel}
              totalValue={totalExpenses}
              centerSubtitle={language === "te" ? "ప్రతి నెలా" : language === "hi" ? "प्रति माह" : "per month"}
              size={200}
            />
          </div>

          {/* AI Tip of the Month */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                  {language === "te" ? "ధనరక్ష AI మార్గదర్శక సూచన" : language === "hi" ? "धनरक्षा AI सलाह" : "DhanRaksha AI Smart Advice"}
                </span>
              </div>
              <AudioNarrationButton
                text={smartAdviceText}
                size="sm"
              />
            </div>

            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              "{smartAdviceText}"
            </p>

            <button
              onClick={() =>
                openChat(
                  language === "te"
                    ? "పిల్లల చదువుల కోసం పోస్టాఫీస్ రికరింగ్ డిపాజిట్ (RD) ఎలా తెరవాలి?"
                    : language === "hi"
                    ? "बच्चों की पढ़ाई के लिए डाकघर आरडी (RD) खाता कैसे खोलें?"
                    : "How can I open a Post Office recurring deposit for my child's education?"
                )
              }
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 cursor-pointer pt-1"
            >
              <span>
                {language === "te"
                  ? "పోస్టాఫీస్ RD గురించి AI ని అడగండి →"
                  : language === "hi"
                  ? "डाकघर आरडी के बारे में AI से पूछें →"
                  : "Ask AI DhanRaksha about Post Office RD →"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
