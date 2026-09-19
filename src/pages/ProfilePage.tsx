import React, { useState, useEffect } from "react";
import {
  User,
  Settings,
  RotateCcw,
  Globe,
  Wallet,
  Shield,
  Award,
  Check,
  Type,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Language } from "../types";
import { AudioNarrationButton } from "../components/AudioNarrationButton";

export const ProfilePage: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    resetDemoData,
    language,
    setLanguage,
    easyReadMode,
    toggleEasyReadMode,
    quizScore,
    t,
  } = useApp();

  const isDefaultName =
    !userProfile.name ||
    userProfile.name === "Lakshmi" ||
    userProfile.name === "Lakshmi Devi" ||
    userProfile.name === "లక్ష్మీ దేవి" ||
    userProfile.name === "लक्ष्मी देवी";

  const isDefaultOccupation =
    !userProfile.occupation ||
    userProfile.occupation.includes("Dairy") ||
    userProfile.occupation.includes("వ్యవసాయం") ||
    userProfile.occupation.includes("खेती");

  const localizedDefaultName =
    language === "te" ? "లక్ష్మీ దేవి" : language === "hi" ? "लक्ष्मी देवी" : "Lakshmi Devi";

  const localizedDefaultOccupation =
    language === "te"
      ? "వ్యవసాయం & పాడి పరిశ్రమ"
      : language === "hi"
      ? "खेती और पशुपालन / डेयरी"
      : "Farming & Dairy";

  const displayName = isDefaultName ? localizedDefaultName : userProfile.name;
  const displayOccupation = isDefaultOccupation ? localizedDefaultOccupation : userProfile.occupation;

  const [name, setName] = useState(displayName);
  const [occupation, setOccupation] = useState(displayOccupation);
  const [income, setIncome] = useState(userProfile.income);
  const [expenses, setExpenses] = useState(userProfile.expenses);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync state when userProfile or language changes
  useEffect(() => {
    setName(displayName);
    setOccupation(displayOccupation);
    setIncome(userProfile.income);
    setExpenses(userProfile.expenses);
  }, [userProfile, language, displayName, displayOccupation]);

  const handleLanguageSelect = (newLang: Language) => {
    setLanguage(newLang);
    if (isDefaultName || isDefaultOccupation) {
      updateUserProfile({
        ...(isDefaultName
          ? { name: newLang === "te" ? "లక్ష్మీ దేవి" : newLang === "hi" ? "लक्ष्मी देवी" : "Lakshmi Devi" }
          : {}),
        ...(isDefaultOccupation
          ? {
              occupation:
                newLang === "te"
                  ? "వ్యవసాయం & పాడి పరిశ్రమ"
                  : newLang === "hi"
                  ? "खेती और पशुपालन / डेयरी"
                  : "Farming & Dairy",
            }
          : {}),
        preferredLanguage: newLang,
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: (name || "").trim() || displayName,
      occupation: (occupation || "").trim() || displayOccupation,
      income: Number(income) || 15000,
      expenses: Number(expenses) || 10000,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const profileNarration =
    language === "te"
      ? `మీ ప్రొఫైల్ వివరాలు. పేరు: ${displayName}. వృత్తి: ${displayOccupation}. నెలవారీ ఆదాయం: ₹${userProfile.income}. నెలవారీ ఖర్చులు: ₹${userProfile.expenses}. భాష: తెలుగు.`
      : language === "hi"
      ? `आपकी प्रोफ़ाइल जानकारी। नाम: ${displayName}। पेशा: ${displayOccupation}। मासिक आय: ₹${userProfile.income}। मासिक खर्च: ₹${userProfile.expenses}। भाषा: हिन्दी।`
      : `Your profile details. Name: ${displayName}. Occupation: ${displayOccupation}. Monthly income: ₹${userProfile.income}. Monthly expenses: ₹${userProfile.expenses}. Language: English.`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-bold text-xl font-serif shadow-sm">
            {displayName.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 font-serif">
              {displayName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {displayOccupation} • {t.preferredLangBadge}: {language === "te" ? "తెలుగు" : language === "hi" ? "हिन्दी" : "English"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <AudioNarrationButton
            text={profileNarration}
            label={language === "te" ? "ప్రొఫైల్ వినండి" : language === "hi" ? "प्रोफ़ाइल सुनें" : "Listen Profile"}
            size="sm"
          />
          <button
            onClick={resetDemoData}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title={t.resetDemoData}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetDemoData}</span>
          </button>
        </div>
      </div>

      {/* Edit Profile Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-serif border-b border-slate-100 pb-2">
            {t.profileTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {t.profileSubtitle}
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {t.nameLabel}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {t.occupationLabel}
              </label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {t.incomeLabel} (₹)
              </label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                step="500"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {t.monthlyBasicExpenses}
              </label>
              <input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(Number(e.target.value))}
                step="500"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none font-medium"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            {savedSuccess ? (
              <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <Check className="w-4 h-4 text-emerald-600" /> {t.profileUpdated}
              </span>
            ) : (
              <div />
            )}

            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
            >
              {t.saveChanges}
            </button>
          </div>
        </form>
      </div>

      {/* Accessibility & Language Preferences */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 font-serif border-b border-slate-100 pb-3">
          {t.accessibilityTitle}
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <Type className="w-5 h-5 text-amber-700 shrink-0" />
              <div>
                <span className="text-sm font-bold text-slate-900 block">
                  {t.easyReadMode}
                </span>
                <span className="text-xs text-slate-500">
                  {t.easyReadDesc}
                </span>
              </div>
            </div>

            <button
              onClick={toggleEasyReadMode}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 ${
                easyReadMode
                  ? "bg-amber-500 text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              {easyReadMode ? t.enabled : t.disabled}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-700" />
              <span className="text-sm font-bold text-slate-900">
                {t.preferredLang}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1">
              {(
                [
                  { code: "en", label: "English" },
                  { code: "te", label: "తెలుగు (Telugu)" },
                  { code: "hi", label: "हिन्दी (Hindi)" },
                ] as { code: Language; label: string }[]
              ).map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleLanguageSelect(l.code)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    language === l.code
                      ? "bg-emerald-800 text-white border-emerald-800 shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
