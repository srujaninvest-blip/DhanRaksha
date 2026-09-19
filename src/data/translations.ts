import { Language } from "../types";

export interface Translations {
  appName: string;
  tagline: string;
  home: string;
  dashboard: string;
  budget: string;
  learn: string;
  goals: string;
  safety: string;
  schemes: string;
  profile: string;
  askAi: string;
  getStarted: string;
  demoModeBadge: string;
  easyReadMode: string;
  emergencyHelpline: string;
  incomeLabel: string;
  expensesLabel: string;
  availableLabel: string;
  savingsGoalLabel: string;
  financialHealth: string;
  financialProgress: string;
  askForPlan: string;
  talkToRuralFin: string;
  disclaimer: string;
  practiceLab: string;
  gullak: string;
  call1930: string;
  tapToListen: string;
  fourGoldenRules: string;
  activeSavingsGoals: string;
  realProgressSubtitle: string;
  manageGoals: string;
  currentSaved: string;
  targetAmount: string;
  remainingAmount: string;
  goalAchieved: string;
  adjustSavingsSlider: string;
  spendingBreakdown: string;
  spendingSubtitle: string;
  essential: string;
  saveChanges: string;
  resetDemoData: string;
  occupationLabel: string;
  phoneLogin: string;
  loginSuccess: string;
  voiceGuide: string;
  notificationsTitle: string;
  profileTitle: string;
  profileSubtitle: string;
  nameLabel: string;
  profileUpdated: string;
  accessibilityTitle: string;
  easyReadDesc: string;
  preferredLang: string;
  enabled: string;
  disabled: string;
  preferredLangBadge: string;
  monthlyBasicExpenses: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: "DhanRaksha",
    tagline: "Safe Money. Smart Phone. Confident Women.",
    home: "Home",
    dashboard: "My Passbook",
    budget: "Monthly Spends",
    learn: "Digital Training",
    goals: "Savings Goals",
    safety: "Scam Shield",
    schemes: "Gov Schemes",
    profile: "Profile",
    askAi: "Ask DhanRaksha AI",
    getStarted: "Start Learning",
    demoModeBadge: "Demo Account",
    easyReadMode: "Large Text Mode",
    emergencyHelpline: "Cyber Fraud Helpline: 1930",
    incomeLabel: "Monthly Income",
    expensesLabel: "Monthly Expenses",
    availableLabel: "Available to Save",
    savingsGoalLabel: "Goal Progress",
    financialHealth: "Your Financial Health",
    financialProgress: "Planning Progress",
    askForPlan: "Ask DhanRaksha for a Plan",
    talkToRuralFin: "Talk to DhanRaksha Voice Assistant",
    disclaimer: "DhanRaksha is an educational digital and financial literacy platform. Never enter real OTPs or PINs. Always verify with official banks.",
    practiceLab: "Safe Practice Lab",
    gullak: "Digital Gullak",
    call1930: "Call 1930 Helpline",
    tapToListen: "Tap to Listen",
    fourGoldenRules: "4 Golden Rules of Digital Safety",
    activeSavingsGoals: "Active Savings Goals",
    realProgressSubtitle: "Real progress toward your family's key milestones",
    manageGoals: "Manage Goals",
    currentSaved: "Current Saved",
    targetAmount: "Target Amount",
    remainingAmount: "Remaining",
    goalAchieved: "Goal Achieved! 🎉",
    adjustSavingsSlider: "Adjust Saved Amount (Like Monthly Expenses)",
    spendingBreakdown: "Monthly Spending Breakdown",
    spendingSubtitle: "Compare where your money goes every month",
    essential: "Essential",
    saveChanges: "Save Profile Details",
    resetDemoData: "Reset Demo Data",
    occupationLabel: "Occupation / Source of Livelihood",
    phoneLogin: "Phone Login",
    loginSuccess: "Logged in successfully",
    voiceGuide: "Voice Guide",
    notificationsTitle: "Important Notifications & Alerts",
    profileTitle: "Profile & Settings",
    profileSubtitle: "Manage your livelihood baselines, expenses, and language preferences",
    nameLabel: "Full Name",
    profileUpdated: "Profile updated successfully!",
    accessibilityTitle: "Accessibility & App Settings",
    easyReadDesc: "Increases typography scale, high contrast borders, and line spacing for easier reading.",
    preferredLang: "Preferred Interface Language",
    enabled: "Enabled",
    disabled: "Disabled",
    preferredLangBadge: "Preferred Language",
    monthlyBasicExpenses: "Monthly Basic Expenses (₹)",
  },
  te: {
    appName: "ధనరక్ష",
    tagline: "సురక్షితమైన సొమ్ము. స్మార్ట్‌ఫోన్ శిక్షణ. మహిళా సాధికారత.",
    home: "హోమ్",
    dashboard: "నా పాస్‌బుక్",
    budget: "నెల ఖర్చులు",
    learn: "డిజిటల్ శిక్షణ",
    goals: "పొదుపు లక్ష్యాలు",
    safety: "మోసాల రక్షణ",
    schemes: "మహిళా పథకాలు",
    profile: "ప్రొఫైల్",
    askAi: "ధనరక్ష AIని అడగండి",
    getStarted: "ఇప్పుడే ప్రారంభించండి",
    demoModeBadge: "డెమో ఖాతా",
    easyReadMode: "పెద్ద అక్షరాల మోడ్",
    emergencyHelpline: "సైబర్ మోసాల హెల్ప్‌లైన్: 1930",
    incomeLabel: "నెలవారీ ఆదాయం",
    expensesLabel: "నెలవారీ ఖర్చులు",
    availableLabel: "పొదుపుకు మిగిలినది",
    savingsGoalLabel: "లక్ష్య పురోగతి",
    financialHealth: "మీ ఆర్థిక ఆరోగ్యం",
    financialProgress: "ప్రణాళికా పురోగతి",
    askForPlan: "ధనరక్ష నుండి ప్రణాళిక పొందండి",
    talkToRuralFin: "ధనరక్ష వాయిస్ అసిస్టెంట్‌తో మాట్లాడండి",
    disclaimer: "ధనరక్ష గ్రామీణ మహిళల డిజిటల్ మరియు ఆర్థిక అక్షరాస్యత కోసం రూపొందించిన వేదిక. నిజమైన OTP లేదా PIN ఎవరికీ చెప్పకండి.",
    practiceLab: "సేఫ్ ప్రాక్టీస్ ల్యాబ్",
    gullak: "డిజిటల్ పొదుపు కుండ",
    call1930: "1930 కు కాల్ చేయండి",
    tapToListen: "వినడానికి నొక్కండి",
    fourGoldenRules: "డిజిటల్ భద్రత 4 బంగారు సూత్రాలు",
    activeSavingsGoals: "చురుకైన పొదుపు లక్ష్యాలు",
    realProgressSubtitle: "మీ కుటుంబ ముఖ్య లక్ష్యాల దిశగా నిజమైన పురోగతి",
    manageGoals: "లక్ష్యాల నిర్వహణ",
    currentSaved: "ఇప్పటివరకు దాచిన మొత్తం",
    targetAmount: "లక్ష్య మొత్తం",
    remainingAmount: "ఇంకా కావలసినది",
    goalAchieved: "లక్ష్యం సాధించారు! 🎉",
    adjustSavingsSlider: "ఖర్చుల వలె పొదుపు మొత్తాన్ని సర్దుబాటు చేయండి (స్లైడర్)",
    spendingBreakdown: "నెలవారీ ఖర్చుల వివరాలు",
    spendingSubtitle: "ప్రతి నెలా మీ డబ్బు ఎక్కడికి వెళ్తుందో పరిశీలించండి",
    essential: "అత్యవసరం",
    saveChanges: "వివరాలను భద్రపరచండి",
    resetDemoData: "డెమో డేటా రీసెట్",
    occupationLabel: "వృత్తి / జీవనాధారం",
    phoneLogin: "ఫోన్ లాగిన్",
    loginSuccess: "విజయవంతంగా లాగిన్ అయ్యారు",
    voiceGuide: "వాయిస్ గైడ్",
    notificationsTitle: "ముఖ్యమైన నోటిఫికేషన్లు & అలర్ట్‌లు",
    profileTitle: "ప్రొఫైల్ & సెట్టింగ్‌లు",
    profileSubtitle: "మీ జీవనాధార వివరాలు, నెలవారీ ఖర్చులు మరియు భాషను నిర్వహించండి",
    nameLabel: "పూర్తి పేరు",
    profileUpdated: "ప్రొఫైల్ వివరాలు విజయవంతంగా భద్రపరచబడ్డాయి!",
    accessibilityTitle: "యాక్సెసిబిలిటీ & సెట్టింగ్‌లు",
    easyReadDesc: "సులభంగా చదవడానికి పెద్ద అక్షరాలు మరియు స్పష్టమైన బోర్డర్లు.",
    preferredLang: "మీకు నచ్చిన భాష",
    enabled: "ఆన్ చేయబడింది",
    disabled: "ఆఫ్ చేయబడింది",
    preferredLangBadge: "ఎంచుకున్న భాష",
    monthlyBasicExpenses: "నెలవారీ ప్రాథమిక ఖర్చులు (₹)",
  },
  hi: {
    appName: "धनरक्षा",
    tagline: "सुरक्षित पैसा. स्मार्ट फोन. सशक्त नारी.",
    home: "होम",
    dashboard: "मेरी पासबुक",
    budget: "महीने का खर्च",
    learn: "डिजिटल सीख",
    goals: "बचत लक्ष्य",
    safety: "धोखाधड़ी से बचाव",
    schemes: "सरकारी योजनाएं",
    profile: "प्रोफ़ाइल",
    askAi: "धनरक्षा AI से पूछें",
    getStarted: "सीखना शुरू करें",
    demoModeBadge: "डेमो खाता",
    easyReadMode: "बड़े अक्षरों का मोड",
    emergencyHelpline: "साइबर फ्रॉड हेल्पलाइन: 1930",
    incomeLabel: "मासिक आय",
    expensesLabel: "मासिक खर्च",
    availableLabel: "बचत के लिए शेष",
    savingsGoalLabel: "लक्ष्य प्रगति",
    financialHealth: "आपका वित्तीय स्वास्थ्य",
    financialProgress: "योजना प्रगति",
    askForPlan: "धनरक्षा से योजना मांगें",
    talkToRuralFin: "धनरक्षा वॉयस असिस्टेंट से बात करें",
    disclaimer: "धनरक्षा ग्रामीण महिलाओं के लिए डिजिटल और वित्तीय साक्षरता मंच है। कभी भी असली OTP या UPI PIN किसी को न बताएं।",
    practiceLab: "सुरक्षित अभ्यास लैब",
    gullak: "डिजिटल गुल्लक",
    call1930: "1930 पर कॉल करें",
    tapToListen: "सुनने के लिए दबाएं",
    fourGoldenRules: "डिजिटल सुरक्षा के 4 सुनहरे नियम",
    activeSavingsGoals: "सक्रिय बचत लक्ष्य",
    realProgressSubtitle: "परिवार के महत्वपूर्ण सपनों की ओर वास्तविक प्रगति",
    manageGoals: "लक्ष्य प्रबंधित करें",
    currentSaved: "अब तक की बचत",
    targetAmount: "लक्ष्य राशि",
    remainingAmount: "शेष राशि",
    goalAchieved: "लक्ष्य पूरा हुआ! 🎉",
    adjustSavingsSlider: "खर्च की तरह बचत राशि समायोजित करें (स्लाइडर)",
    spendingBreakdown: "मासिक खर्च का विवरण",
    spendingSubtitle: "देखें हर महीने आपकी कमाई कहां खर्च हो रही है",
    essential: "जरूरी",
    saveChanges: "प्रोफ़ाइल विवरण सहेजें",
    resetDemoData: "डेमो रीसेट करें",
    occupationLabel: "पेशा / आजीविका",
    phoneLogin: "फ़ोन लॉगिन",
    loginSuccess: "सफलतापूर्वक लॉगिन किया गया",
    voiceGuide: "वॉयस गाइड",
    notificationsTitle: "ज़रूरी सूचनाएं व अलर्ट",
    profileTitle: "प्रोफ़ाइल और सेटिंग्स",
    profileSubtitle: "अपनी आजीविका का विवरण, मासिक खर्च और भाषा प्राथमिकताएं प्रबंधित करें",
    nameLabel: "पूरा नाम",
    profileUpdated: "प्रोफ़ाइल सफलतापूर्वक सहेजी गई!",
    accessibilityTitle: "पहुंच और ऐप सेटिंग्स",
    easyReadDesc: "आसान पढ़ने के लिए बड़े अक्षर, उच्च कंट्रास्ट और स्पष्ट स्पेसिंग।",
    preferredLang: "पसंदीदा भाषा",
    enabled: "चालू",
    disabled: "बंद",
    preferredLangBadge: "पसंदीदा भाषा",
    monthlyBasicExpenses: "मासिक बुनियादी खर्च (₹)",
  },
};
