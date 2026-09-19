/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AiChatModal } from "./components/AiChatModal";
import { OnboardingModal } from "./components/OnboardingModal";
import { AuthModal } from "./components/AuthModal";
import { AuthScreen } from "./components/AuthScreen";
import { HomePage } from "./pages/HomePage";
import { DashboardPage } from "./pages/DashboardPage";
import { BudgetPage } from "./pages/BudgetPage";
import { LearnPage } from "./pages/LearnPage";
import { GoalsPage } from "./pages/GoalsPage";
import { SafetyPage } from "./pages/SafetyPage";
import { SchemesPage } from "./pages/SchemesPage";
import { ProfilePage } from "./pages/ProfilePage";

const MainContent: React.FC = () => {
  const { activePage, easyReadMode, isLoggedIn, isAuthModalOpen, closeAuthModal } = useApp();

  // If user is not logged in, open the Login Interface first (blocking website until login)
  if (!isLoggedIn) {
    return (
      <div
        className={`min-h-screen ${
          easyReadMode ? "text-lg font-medium leading-relaxed" : "text-base"
        }`}
      >
        <AuthScreen isModal={false} />
      </div>
    );
  }

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <HomePage />;
      case "dashboard":
        return <DashboardPage />;
      case "budget":
        return <BudgetPage />;
      case "learn":
        return <LearnPage />;
      case "goals":
        return <GoalsPage />;
      case "safety":
        return <SafetyPage />;
      case "schemes":
        return <SchemesPage />;
      case "profile":
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[#F9FAF8] text-slate-900 transition-all ${
        easyReadMode ? "text-lg font-medium leading-relaxed" : "text-base"
      }`}
    >
      <Navbar />
      <main className="flex-1 pb-16 xl:pb-0">{renderPage()}</main>
      <Footer />

      {/* Global Modals */}
      <AiChatModal />
      <OnboardingModal />
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
