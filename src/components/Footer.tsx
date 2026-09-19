import React from "react";
import { Sprout, ShieldCheck, Lock, Heart, Phone } from "lucide-react";
import { useApp } from "../context/AppContext";

export const Footer: React.FC = () => {
  const { setActivePage, t } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-24 xl:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Security & Privacy Banner */}
        <div className="bg-slate-800/80 rounded-2xl p-4 sm:p-6 border border-slate-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
                Your Privacy & Safety Matter
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 font-extrabold px-2 py-0.5 rounded">
                  100% Non-Transactional
                </span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5 max-w-2xl">
                Never enter real passwords, OTPs, UPI PINs, or debit card numbers. DhanRaksha is strictly an educational digital & financial literacy platform and will NEVER request banking credentials.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 bg-emerald-950/60 border border-emerald-800/50 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-300">
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>National Cyber Fraud Helpline: 1930</span>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5 text-emerald-100" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-serif">
                DhanRaksha
              </span>
            </div>
            <p className="text-emerald-400 font-bold text-sm">
              "{t.tagline}"
            </p>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Empowering rural women and first-time digital users across India with simple, accessible, and voice-guided digital and financial education, safe payment simulations, and fraud protection.
            </p>
          </div>

          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Explore
            </h5>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => setActivePage("home")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage("dashboard")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Personalized Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage("budget")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Smart Budgeting
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage("goals")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Savings Goals
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-3">
              Safety & Knowledge
            </h5>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => setActivePage("learn")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Learn Finance — Made Simple
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage("safety")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Fraud & Scam Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage("schemes")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Government Schemes
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage("quiz")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Financial Literacy Quiz
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-500 space-y-2 text-center sm:text-left">
          <p className="leading-relaxed">
            <strong className="text-slate-400">Disclaimer:</strong> DhanRaksha is an educational digital and financial inclusion platform for rural women. It is not a substitute for banking advice. Always verify with your local bank branch or official government CSC centers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-2 text-slate-500">
            <span>© 2026 DhanRaksha. Built for Digital & Financial Inclusion.</span>
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-rose-500 inline" /> for Rural Financial Empowerment
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
