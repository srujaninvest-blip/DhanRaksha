import React, { useState } from "react";
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Wallet,
  PiggyBank,
  GraduationCap,
  Briefcase,
  Home,
  Shield,
  ArrowRight,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Language } from "../types";

export const OnboardingModal: React.FC = () => {
  const {
    isOnboardingOpen,
    closeOnboarding,
    userProfile,
    updateUserProfile,
    setActivePage,
    language,
    setLanguage,
  } = useApp();

  const [step, setStep] = useState(1);
  const [name, setName] = useState(userProfile.name || "Lakshmi");
  const [selectedNeed, setSelectedNeed] = useState<string>("Saving Money");
  const [selectedIncome, setSelectedIncome] = useState<number>(userProfile.income || 15000);
  const [selectedExpense, setSelectedExpense] = useState<number>(userProfile.expenses || 10000);
  const [selectedGoal, setSelectedGoal] = useState<string>("Education");
  const [preferredLang, setPreferredLang] = useState<Language>(language);

  if (!isOnboardingOpen) return null;

  const helpNeeds = [
    { id: "Managing Money", label: "Managing Money", labelTe: "డబ్బు నిర్వహణ", icon: Wallet },
    { id: "Saving Money", label: "Saving Money", labelTe: "పొదుపు చేయడం", icon: PiggyBank },
    { id: "Learning Finance", label: "Learning Finance", labelTe: "ఆర్థిక విషయాలు నేర్చుకోవడం", icon: GraduationCap },
    { id: "Planning a Goal", label: "Planning a Goal", labelTe: "లక్ష్యానికి ప్రణాళిక", icon: Sparkles },
    { id: "Starting a Business", label: "Starting a Business", labelTe: "వ్యాపారం ప్రారంభించడం", icon: Briefcase },
  ];

  const incomeTiers = [
    { label: "Below ₹10,000", value: 8000 },
    { label: "₹10,000 – ₹20,000", value: 15000 },
    { label: "₹20,000 – ₹30,000", value: 25000 },
    { label: "Above ₹30,000", value: 35000 },
    { label: "Prefer not to say", value: 15000 },
  ];

  const expenseTiers = [
    { label: "Below ₹8,000", value: 6000 },
    { label: "₹8,000 – ₹15,000", value: 10000 },
    { label: "₹15,000 – ₹25,000", value: 18000 },
    { label: "Above ₹25,000", value: 26000 },
  ];

  const goalOptions = [
    { id: "Emergency Fund", label: "Emergency Fund", labelTe: "అత్యవసర నిధి", icon: Shield },
    { id: "Education", label: "Education", labelTe: "పిల్లల చదువు", icon: GraduationCap },
    { id: "Business", label: "Business / Livestock", labelTe: "వ్యాపారం / పాడి పరిశ్రమ", icon: Briefcase },
    { id: "Household", label: "Household Upgrade", labelTe: "ఇంటి అవసరాలు", icon: Home },
    { id: "Personal Savings", label: "Personal Savings", labelTe: "వ్యక్తిగత పొదుపు", icon: PiggyBank },
  ];

  const handleFinish = () => {
    updateUserProfile({
      name: name.trim() || "Lakshmi",
      income: selectedIncome,
      expenses: selectedExpense,
      mainGoal: selectedGoal,
      preferredLanguage: preferredLang,
      onboarded: true,
    });
    setLanguage(preferredLang);
    closeOnboarding();
    setActivePage("dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-800 text-white">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
              Step {step} of 4
            </span>
            <h2 className="text-lg sm:text-xl font-bold font-serif">
              Personalized Plan for You
            </h2>
          </div>
          <button
            onClick={closeOnboarding}
            className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-emerald-950/20 h-1.5">
          <div
            className="bg-amber-400 h-1.5 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-bold text-slate-900">
                  {language === "te"
                    ? "మీ పేరు & మీరు దేనిలో సహాయం కోరుకుంటున్నారు?"
                    : "What is your name & what would you like help with?"}
                </h3>
                <p className="text-sm text-slate-500">
                  {language === "te"
                    ? "ధనరక్ష మీకు ఏ విషయంలో సహాయం చేయాలో ఎంచుకోండి."
                    : language === "hi"
                    ? "चुनें कि धनरक्षा आपकी किस विषय में सहायता करे।"
                    : "Choose the primary area you want DhanRaksha to guide you on."}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Lakshmi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Preferred Language
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: "en", label: "English" },
                      { id: "te", label: "తెలుగు (Telugu)" },
                      { id: "hi", label: "हिन्दी (Hindi)" },
                    ] as { id: Language; label: string }[]
                  ).map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setPreferredLang(l.id)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                        preferredLang === l.id
                          ? "bg-emerald-800 text-white border-emerald-800 shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Assistance Focus
                </label>
                {helpNeeds.map((need) => {
                  const Icon = need.icon;
                  const isSelected = selectedNeed === need.id;
                  return (
                    <button
                      key={need.id}
                      type="button"
                      onClick={() => setSelectedNeed(need.id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left cursor-pointer ${
                        isSelected
                          ? "bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/20"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            isSelected ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 text-sm block">
                            {need.label}
                          </span>
                          <span className="text-xs text-slate-500">{need.labelTe}</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-emerald-700" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {language === "te"
                    ? "మీ సుమారు నెలవారీ ఆదాయం ఎంత?"
                    : "What is your approximate monthly income?"}
                </h3>
                <p className="text-sm text-slate-500">
                  This helps calculate how much you can comfortably set aside.
                </p>
              </div>

              <div className="space-y-2.5">
                {incomeTiers.map((tier, idx) => {
                  const isSelected = selectedIncome === tier.value;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedIncome(tier.value)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border text-left font-bold text-sm transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-600/20"
                          : "bg-white border-slate-200 text-slate-800 hover:border-slate-300"
                      }`}
                    >
                      <span>{tier.label}</span>
                      {isSelected && <Check className="w-5 h-5 text-emerald-700" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {language === "te"
                    ? "మీ సుమారు నెలవారీ ఖర్చులు ఎంత?"
                    : "What are your approximate monthly expenses?"}
                </h3>
                <p className="text-sm text-slate-500">
                  Includes food, school fees, electricity, healthcare, and household.
                </p>
              </div>

              <div className="space-y-2.5">
                {expenseTiers.map((tier, idx) => {
                  const isSelected = selectedExpense === tier.value;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedExpense(tier.value)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border text-left font-bold text-sm transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-600/20"
                          : "bg-white border-slate-200 text-slate-800 hover:border-slate-300"
                      }`}
                    >
                      <span>{tier.label}</span>
                      {isSelected && <Check className="w-5 h-5 text-emerald-700" />}
                    </button>
                  );
                })}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900">
                Estimated available margin:{" "}
                <span className="font-black text-amber-950">
                  ₹{Math.max(0, selectedIncome - selectedExpense).toLocaleString("en-IN")}
                </span>{" "}
                per month to save or allocate to goals.
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {language === "te"
                    ? "మీ ప్రధాన ఆర్థిక లక్ష్యం ఏమిటి?"
                    : "What is your main financial goal?"}
                </h3>
                <p className="text-sm text-slate-500">
                  We will build a personalized savings roadmap tailored to this goal.
                </p>
              </div>

              <div className="space-y-2.5">
                {goalOptions.map((goal) => {
                  const Icon = goal.icon;
                  const isSelected = selectedGoal === goal.id;
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => setSelectedGoal(goal.id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/20"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                            isSelected ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 text-sm block">
                            {goal.label}
                          </span>
                          <span className="text-xs text-slate-500">{goal.labelTe}</span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-emerald-700" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-sm font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              Next Step
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white rounded-xl text-sm font-black flex items-center gap-2 shadow-md shadow-emerald-800/20 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Create My Financial Plan
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
