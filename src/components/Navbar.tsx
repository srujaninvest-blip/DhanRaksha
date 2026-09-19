import React, { useState } from "react";
import {
  Home,
  LayoutDashboard,
  Wallet,
  BookOpen,
  Target,
  ShieldCheck,
  Award,
  User,
  Bot,
  Menu,
  X,
  Type,
  Phone,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Language } from "../types";

interface NavbarProps {
  onOpenPhoneAuth?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPhoneAuth }) => {
  const {
    activePage,
    setActivePage,
    language,
    setLanguage,
    easyReadMode,
    toggleEasyReadMode,
    openChat,
    userProfile,
    isLoggedIn,
    openAuthModal,
    logout,
    demoMode,
    t,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: t.home, icon: Home },
    { id: "dashboard", label: t.dashboard, icon: LayoutDashboard },
    { id: "budget", label: t.budget, icon: Wallet },
    { id: "learn", label: t.learn, icon: BookOpen },
    { id: "goals", label: t.goals, icon: Target },
    { id: "safety", label: t.safety, icon: ShieldCheck },
    { id: "schemes", label: t.schemes, icon: Award },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const languages: { code: Language; label: string; sub: string }[] = [
    { code: "en", label: "English", sub: "English" },
    { code: "te", label: "తెలుగు", sub: "Telugu" },
    { code: "hi", label: "हिन्दी", sub: "Hindi" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 shadow-xs">
        {/* Top announcement / Trust bar */}
        <div className="bg-emerald-900 text-emerald-100 text-xs px-4 py-1.5 font-medium flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {language === "te"
                  ? "గ్రామీణ మహిళల కోసం ప్రత్యేక AI ఆర్థిక మార్గదర్శి"
                  : language === "hi"
                  ? "ग्रामीण महिलाओं के लिए विशेष एआई वित्तीय मार्गदर्शक"
                  : "AI-Powered Financial Companion for Rural Women"}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[11px]">
              <span className="bg-emerald-800/80 px-2 py-0.5 rounded text-emerald-200">
                {t.emergencyHelpline}
              </span>
              {userProfile.phone ? (
                <span className="bg-emerald-800 text-emerald-200 border border-emerald-700 px-2 py-0.5 rounded-full font-bold">
                  +91 {userProfile.phone}
                </span>
              ) : demoMode ? (
                <span className="bg-amber-400/20 text-amber-200 border border-amber-300/30 px-2 py-0.5 rounded-full font-bold">
                  {t.demoModeBadge}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo: ONLY DhanRaksha, NO Sakhi */}
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick("home")}
              className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-800 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-800/20 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-emerald-950 font-serif block">
                  {t.appName}
                </span>
                <p className="text-[11px] font-bold text-emerald-700/90 leading-none">
                  {t.tagline}
                </p>
              </div>
            </button>

            {/* Direct High-Visibility Language Switcher (Single language selector, no duplicate globe) */}
            <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200 gap-1">
              {languages.map((l) => (
                <button
                  key={l.code}
                  id={`lang-btn-${l.code}`}
                  onClick={() => setLanguage(l.code)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    language === l.code
                      ? "bg-emerald-800 text-white shadow-xs"
                      : "text-slate-700 hover:text-emerald-900 hover:bg-slate-200/60"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "bg-emerald-800 text-white shadow-xs"
                        : "text-slate-700 hover:text-emerald-900 hover:bg-emerald-50/70"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Easy Read Mode Toggle */}
              <button
                id="toggle-easy-read-mode"
                onClick={toggleEasyReadMode}
                title="Toggle larger high-contrast readable text for rural accessibility"
                className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
                  easyReadMode
                    ? "bg-amber-100 border-amber-400 text-amber-950 shadow-xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>{easyReadMode ? "Easy Read: ON" : "Easy Read"}</span>
              </button>

              {/* Login / User Status Button */}
              {isLoggedIn ? (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    id="nav-user-badge-btn"
                    onClick={() => handleNavClick("profile")}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-colors cursor-pointer text-left"
                    title="View Profile & Dashboard"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-800 text-white font-black text-xs flex items-center justify-center">
                      {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-xs font-black text-emerald-950 truncate max-w-[100px]">
                        {userProfile.name}
                      </div>
                      <div className="text-[10px] text-emerald-700 font-semibold leading-tight">
                        {userProfile.phone ? `+91 ${userProfile.phone.slice(-4)}` : userProfile.email ? userProfile.email.split("@")[0] : "Connected"}
                      </div>
                    </div>
                  </button>

                  <button
                    id="nav-logout-btn"
                    onClick={() => logout()}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-xs font-bold"
                    title={language === "te" ? "లాగ్ అవుట్ చేయండి" : language === "hi" ? "लॉग आउट करें" : "Log out"}
                  >
                    <span className="hidden sm:inline">{language === "te" ? "లాగ్ అవుట్" : language === "hi" ? "लॉग आउट" : "Logout"}</span>
                    <span className="sm:hidden text-[10px]">✕</span>
                  </button>
                </div>
              ) : (
                <button
                  id="auth-login-btn"
                  onClick={openAuthModal}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 shadow-md shadow-amber-400/20 active:scale-95 transition-all cursor-pointer"
                  title="Phone OTP or Gmail Login"
                >
                  <Phone className="w-3.5 h-3.5 text-slate-950" />
                  <span>
                    {language === "te"
                      ? "లాగిన్ / నమోదు"
                      : language === "hi"
                      ? "लॉगिन / रजिस्टर"
                      : "Login / Register"}
                  </span>
                </button>
              )}

              {/* Ask AI Voice CTA Button */}
              <button
                id="ask-ai-ruralfin-nav-cta"
                onClick={() => openChat()}
                className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-emerald-800/20 active:scale-95 transition-all cursor-pointer"
              >
                <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-200" />
                <span className="whitespace-nowrap">{t.askAi}</span>
              </button>

              {/* Profile button */}
              <button
                id="nav-profile-btn"
                onClick={() => handleNavClick("profile")}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  activePage === "profile"
                    ? "bg-emerald-100 border-emerald-400 text-emerald-900"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
                title="User Profile"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Mobile Hamburger toggle */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left cursor-pointer ${
                      isActive
                        ? "bg-emerald-800 text-white shadow-xs"
                        : "bg-slate-50 text-slate-800 hover:bg-emerald-50"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  toggleEasyReadMode();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-950 text-sm font-semibold"
              >
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-amber-700" />
                  <span>{t.easyReadMode} (High Contrast)</span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 bg-amber-200 rounded">
                  {easyReadMode ? "ON" : "OFF"}
                </span>
              </button>

              {isLoggedIn ? (
                <div className="flex items-center justify-between p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-800 text-white font-black text-xs flex items-center justify-center">
                      {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">{userProfile.name}</div>
                      <div className="text-[10px] text-emerald-700 font-semibold">
                        {userProfile.phone ? `+91 ${userProfile.phone}` : userProfile.email || "Active Member"}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold rounded-lg"
                  >
                    {language === "te" ? "లాగ్ అవుట్" : language === "hi" ? "लॉग आउट" : "Logout"}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal();
                  }}
                  className="w-full py-2.5 text-center font-bold text-sm bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl flex items-center justify-center gap-2 shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>
                    {language === "te"
                      ? "లాగిన్ / నమోదు (ఫోన్ & జీమెయిల్)"
                      : language === "hi"
                      ? "लॉगिन / रजिस्टर (फ़ोन और जीमेल)"
                      : "Login / Register (Phone & Gmail)"}
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg flex items-center justify-around">
        <button
          onClick={() => handleNavClick("home")}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            activePage === "home" ? "text-emerald-800" : "text-slate-500"
          }`}
        >
          <Home className="w-5 h-5" />
          <span>{t.home}</span>
        </button>

        <button
          onClick={() => handleNavClick("dashboard")}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            activePage === "dashboard" ? "text-emerald-800" : "text-slate-500"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>{t.dashboard}</span>
        </button>

        {/* Floating Center Ask AI CTA */}
        <button
          onClick={() => openChat()}
          className="flex flex-col items-center -mt-5 bg-gradient-to-tr from-emerald-700 to-teal-600 text-white w-14 h-14 rounded-full shadow-lg shadow-emerald-700/30 items-center justify-center active:scale-95 transition-transform"
        >
          <Bot className="w-6 h-6" />
          <span className="text-[9px] font-black leading-none mt-0.5">{t.appName}</span>
        </button>

        <button
          onClick={() => handleNavClick("budget")}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            activePage === "budget" ? "text-emerald-800" : "text-slate-500"
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span>{t.budget}</span>
        </button>

        <button
          onClick={() => handleNavClick("safety")}
          className={`flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-bold ${
            activePage === "safety" ? "text-emerald-800" : "text-slate-500"
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span>{t.safety}</span>
        </button>
      </div>
    </>
  );
};
