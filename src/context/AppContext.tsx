import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, SavingsGoal, BudgetCategory, Language } from "../types";
import {
  UNLOGGED_USER,
  DEMO_USER,
  INITIAL_BUDGET_CATEGORIES,
  INITIAL_GOALS,
  BLANK_BUDGET_CATEGORIES,
  BLANK_GOALS,
  generateBudgetCategoriesForExpenses,
  generateGoalsForUser,
} from "../data/initialData";
import { TRANSLATIONS, Translations } from "../data/translations";

interface AppContextType {
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  resetDemoData: () => void;
  goals: SavingsGoal[];
  addGoal: (goal: Omit<SavingsGoal, "id">) => void;
  updateGoalProgress: (id: string, newAmount: number) => void;
  deleteGoal: (id: string) => void;
  budgetCategories: BudgetCategory[];
  addBudgetCategory: (category: Omit<BudgetCategory, "id">) => void;
  updateBudgetCategoryAmount: (id: string, amount: number) => void;
  removeBudgetCategory: (id: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  easyReadMode: boolean;
  toggleEasyReadMode: () => void;
  demoMode: boolean;
  toggleDemoMode: () => void;
  activePage: string;
  setActivePage: (page: string) => void;
  isChatOpen: boolean;
  openChat: (initialPrompt?: string) => void;
  closeChat: () => void;
  initialChatPrompt: string;
  isOnboardingOpen: boolean;
  openOnboarding: () => void;
  closeOnboarding: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isLoggedIn: boolean;
  loginUser: (user: Partial<UserProfile>, token?: string) => void;
  logout: () => Promise<void>;
  quizScore: number;
  addQuizPoints: (points: number) => void;
  resetQuizScore: () => void;
  t: Translations;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const USER_STORAGE_KEY = "ruralfin_user_profile_v1";
const GOALS_STORAGE_KEY = "ruralfin_goals_v1";
const BUDGET_STORAGE_KEY = "ruralfin_budget_v1";
const LANG_STORAGE_KEY = "ruralfin_language_v1";
const EASYREAD_STORAGE_KEY = "ruralfin_easyread_v1";
const QUIZ_STORAGE_KEY = "ruralfin_quiz_score_v1";
const AUTH_TOKEN_KEY = "ruralfin_auth_token_v1";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.isLoggedIn && parsed.name && parsed.income > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not read user profile from storage:", e);
    }
    return UNLOGGED_USER;
  });

  // Goals (Dynamic based on login status)
  const [goals, setGoals] = useState<SavingsGoal[]>(() => {
    try {
      const saved = localStorage.getItem(GOALS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not read goals from storage:", e);
    }
    return BLANK_GOALS;
  });

  // Budget Categories (Dynamic based on login status)
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>(() => {
    try {
      const saved = localStorage.getItem(BUDGET_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not read budget categories from storage:", e);
    }
    return BLANK_BUDGET_CATEGORIES;
  });

  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === "en" || saved === "te" || saved === "hi") return saved;
    } catch {}
    return "te";
  });

  // Easy Read Mode (High contrast, large fonts)
  const [easyReadMode, setEasyReadMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem(EASYREAD_STORAGE_KEY) === "true";
    } catch {}
    return false;
  });

  const [demoMode, setDemoMode] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>("home");
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [initialChatPrompt, setInitialChatPrompt] = useState<string>("");
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(() => {
    try {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    } catch {
      return null;
    }
  });

  const isLoggedIn = Boolean(userProfile.isLoggedIn && userProfile.name && userProfile.income > 0);

  // Verify backend session on mount if token or phone exists
  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        const phone = userProfile.phone;
        const email = userProfile.email;
        const query = token ? `token=${encodeURIComponent(token)}` : phone ? `phone=${encodeURIComponent(phone)}` : email ? `email=${encodeURIComponent(email)}` : "";
        if (!query) return;

        const res = await fetch(`/api/auth/me?${query}`);
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUserProfile((prev) => ({
              ...prev,
              name: data.user.name || prev.name,
              phone: data.user.phone || prev.phone,
              email: data.user.email || prev.email,
              income: data.user.salary || prev.income,
              expenses: data.user.expenses || prev.expenses,
              occupation: data.user.occupation || prev.occupation,
              mainGoal: data.user.mainGoal || prev.mainGoal,
              preferredLanguage: (data.user.language as Language) || prev.preferredLanguage,
              authMethod: data.user.authMethod || prev.authMethod,
              isLoggedIn: true,
              onboarded: true,
            }));
          }
        }
      } catch (err) {
        console.warn("Backend auth check skipped:", err);
      }
    };
    checkSession();
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const loginUser = (user: Partial<UserProfile>, token?: string) => {
    if (token) {
      try {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        setAuthToken(token);
      } catch {}
    }
    const updatedUser: UserProfile = {
      ...userProfile,
      ...user,
      isLoggedIn: true,
      onboarded: true,
    };
    setUserProfile(updatedUser);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    } catch {}

    // Populate customized budget categories and savings goals
    const income = updatedUser.income || 0;
    const expenses = updatedUser.expenses || 0;
    const newBudgetCategories = generateBudgetCategoriesForExpenses(expenses);
    setBudgetCategories(newBudgetCategories);
    try {
      localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(newBudgetCategories));
    } catch {}

    const newGoals = generateGoalsForUser(income, expenses, updatedUser.mainGoal);
    setGoals(newGoals);
    try {
      localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(newGoals));
    } catch {}
  };

  const logout = async () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    try {
      if (token) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
      }
    } catch {}
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(BUDGET_STORAGE_KEY);
      localStorage.removeItem(GOALS_STORAGE_KEY);
    } catch {}
    setAuthToken(null);
    setUserProfile(UNLOGGED_USER);
    setBudgetCategories(BLANK_BUDGET_CATEGORIES);
    setGoals(BLANK_GOALS);
    setActivePage("home");
  };
  const [quizScore, setQuizScore] = useState<number>(() => {
    try {
      const s = localStorage.getItem(QUIZ_STORAGE_KEY);
      return s ? parseInt(s, 10) : 0;
    } catch {}
    return 0;
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userProfile));
    } catch {}
  }, [userProfile]);

  useEffect(() => {
    try {
      localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals));
    } catch {}
  }, [goals]);

  useEffect(() => {
    try {
      localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(budgetCategories));
    } catch {}
  }, [budgetCategories]);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, language);
    } catch {}
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem(EASYREAD_STORAGE_KEY, String(easyReadMode));
    } catch {}
  }, [easyReadMode]);

  useEffect(() => {
    try {
      localStorage.setItem(QUIZ_STORAGE_KEY, String(quizScore));
    } catch {}
  }, [quizScore]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setUserProfile((prev) => ({ ...prev, preferredLanguage: lang }));
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }));
  };

  const resetDemoData = () => {
    setUserProfile(DEMO_USER);
    setGoals(INITIAL_GOALS);
    setBudgetCategories(INITIAL_BUDGET_CATEGORIES);
    setLanguageState("te");
    setQuizScore(0);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(GOALS_STORAGE_KEY);
    localStorage.removeItem(BUDGET_STORAGE_KEY);
    localStorage.removeItem(QUIZ_STORAGE_KEY);
  };

  const addGoal = (newGoal: Omit<SavingsGoal, "id">) => {
    const goal: SavingsGoal = {
      ...newGoal,
      id: `goal-${Date.now()}`,
    };
    setGoals((prev) => [goal, ...prev]);
  };

  const updateGoalProgress = (id: string, newAmount: number) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, currentAmount: Math.max(0, newAmount) } : g))
    );
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const addBudgetCategory = (cat: Omit<BudgetCategory, "id">) => {
    const newCat: BudgetCategory = {
      ...cat,
      id: `cat-${Date.now()}`,
    };
    setBudgetCategories((prev) => [...prev, newCat]);
  };

  const updateBudgetCategoryAmount = (id: string, amount: number) => {
    setBudgetCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, amount: Math.max(0, amount) } : c))
    );
  };

  const removeBudgetCategory = (id: string) => {
    setBudgetCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleEasyReadMode = () => {
    setEasyReadMode((prev) => !prev);
  };

  const toggleDemoMode = () => {
    setDemoMode((prev) => !prev);
  };

  const openChat = (prompt?: string) => {
    if (prompt) {
      setInitialChatPrompt(prompt);
    } else {
      setInitialChatPrompt("");
    }
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const openOnboarding = () => setIsOnboardingOpen(true);
  const closeOnboarding = () => setIsOnboardingOpen(false);

  const addQuizPoints = (points: number) => {
    setQuizScore((prev) => prev + points);
  };

  const resetQuizScore = () => {
    setQuizScore(0);
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <AppContext.Provider
      value={{
        userProfile,
        updateUserProfile,
        resetDemoData,
        goals,
        addGoal,
        updateGoalProgress,
        deleteGoal,
        budgetCategories,
        addBudgetCategory,
        updateBudgetCategoryAmount,
        removeBudgetCategory,
        language,
        setLanguage,
        easyReadMode,
        toggleEasyReadMode,
        demoMode,
        toggleDemoMode,
        activePage,
        setActivePage,
        isChatOpen,
        openChat,
        closeChat,
        initialChatPrompt,
        isOnboardingOpen,
        openOnboarding,
        closeOnboarding,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        isLoggedIn,
        loginUser,
        logout,
        quizScore,
        addQuizPoints,
        resetQuizScore,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
