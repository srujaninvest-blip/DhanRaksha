export type Language = "en" | "te" | "hi";

export interface UserProfile {
  name: string;
  phone?: string;
  email?: string;
  age?: number;
  income: number;
  expenses: number;
  mainGoal: string;
  preferredLanguage: Language;
  onboarded: boolean;
  isLoggedIn?: boolean;
  authMethod?: "phone" | "google" | "gmail" | "demo";
  occupation?: string;
  avatarId?: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  nameTe: string;
  nameHi: string;
  amount: number;
  color: string;
  iconName?: string;
  isEssential?: boolean;
}

export interface SavingsGoal {
  id: string;
  title?: string;
  titleTe?: string;
  titleHi?: string;
  name?: string;
  nameTe?: string;
  nameHi?: string;
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  category:
    | "Education"
    | "Emergency"
    | "Business"
    | "Household"
    | "Personal"
    | "Family"
    | "Other";
  targetDate?: string;
  color?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  language: Language;
  audioAvailable?: boolean;
}

export interface LearningTopic {
  id: string;
  category: string;
  categoryTe?: string;
  categoryHi?: string;
  title: string;
  titleTe?: string;
  titleHi?: string;
  summary?: string;
  summaryTe?: string;
  summaryHi?: string;
  description?: string;
  descriptionTe?: string;
  descriptionHi?: string;
  explanation?: string;
  explanationTe?: string;
  explanationHi?: string;
  example?: string;
  exampleTe?: string;
  exampleHi?: string;
  actionTip?: string;
  actionTipTe?: string;
  actionTipHi?: string;
  actionableTip?: string;
  actionableTipTe?: string;
  actionableTipHi?: string;
  readTime?: string;
  readingTime?: string;
  difficulty?: string;
  iconName?: string;
}

export interface GovScheme {
  id: string;
  name: string;
  nameTe?: string;
  nameHi?: string;
  category:
    | "Women"
    | "Rural Livelihood"
    | "Entrepreneurship"
    | "Savings"
    | "Insurance"
    | "Education"
    | string;
  categoryTe?: string;
  categoryHi?: string;
  description: string;
  descriptionTe?: string;
  descriptionHi?: string;
  targetAudience?: string;
  targetAudienceTe?: string;
  targetAudienceHi?: string;
  eligibility?: string;
  eligibilityTe?: string;
  eligibilityHi?: string;
  benefits: string | string[];
  benefitsTe?: string | string[];
  benefitsHi?: string | string[];
  howToApply: string;
  howToApplyTe?: string;
  howToApplyHi?: string;
  officialSource?: string;
}

export type GovernmentScheme = GovScheme;

export interface QuizOption {
  label: string;
  labelTe?: string;
  labelHi?: string;
  isCorrect?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  questionTe?: string;
  questionHi?: string;
  category?: string;
  correctIndex?: number;
  options: (string | QuizOption)[];
  optionsTe?: string[];
  optionsHi?: string[];
  explanation: string;
  explanationTe?: string;
  explanationHi?: string;
}

export interface ScamCheckResult {
  isScam: boolean;
  riskLevel: "High" | "Medium" | "Low";
  scamType: string;
  reasons: string[];
  safeAction: string;
  summary: string;
  source?: string;
}
