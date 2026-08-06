/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);

const translations = {
  en: {
    blueprints: "Blueprints",

    blueprintsDescription:
      "Manage and monitor your generated software blueprints",

    newBlueprint: "New Blueprint",

    totalBlueprints: "Total Blueprints",

    searchBlueprints: "Search blueprints...",

    all: "All",

    active: "Active",

    building: "Building",

    completed: "Completed",

    failed: "Failed",

    blueprint: "Blueprint",

    owner: "Owner",

    status: "Status",

    updated: "Updated",

    action: "Action",

    // Navbar
    navProduct: "Product",
    navCouncil: "The Council",
    navHow: "How it works",
    navOutput: "Output",
    navPricing: "Pricing",
    languageToggle: "العربية",

    // Hero
    heroBadge: "A virtual software engineering company — not a chatbot",
    heroTitle1: "From raw idea to complete",
    heroTitle2: "software blueprint",
    heroSubtitle:
      "Describe your idea in a sentence. A council of eleven specialized AI agents turns it into requirements, architecture, database, API, UI/UX, security, tests and a deployment plan — exportable as PDF or Markdown.",
    heroPrimary: "Start a Blueprint →",
    heroSecondary: "See how the Council works",

    // Council
    councilTitle: "Engineering Council Room",
    councilProgress: "7 / 11 agents complete",
    agentAnalysingScope: "Analysing scope",
    agentDraftingFR: "Drafting FR-001...",
    agentLayeredArchitecture: "Layered architecture",

    // Steps
    step1Title: "Describe the idea",
    step1Text:
      "Write your idea in plain language, pick a project type, complexity, and output language.",

    step2Title: "The Council engineers it",
    step2Text:
      "Eleven agents run a structured pipeline in real time, debate, and resolve conflicts.",

    step3Title: "Download the Blueprint",
    step3Text:
      "Read, refine, and export a complete engineering document as PDF or Markdown.",

    // Blueprint Sections
    requirementsTitle: "Requirements",
    requirementsText:
      "Numbered FR & NFR with acceptance criteria and use cases.",

    architectureTitle: "Architecture",
    architectureText:
      "Layered system architecture with clear module boundaries.",

    databaseTitle: "Database",
    databaseText: "Entities, ERD and a normalized SQL schema with indexes.",

    apiTitle: "API",
    apiText:
      "REST endpoints with authentication, pagination, and error semantics.",

    uxTitle: "UX/UI",
    uxText: "User flows, wireframes and a full design system.",

    securityTitle: "Security",
    securityText: "Threat model, controls, and a security analysis.",

    testingTitle: "Testing",
    testingText: "A test plan with concrete, traceable test cases.",

    devopsTitle: "DevOps",
    devopsText: "CI/CD pipeline and a deployment strategy.",

    // Login
    loginButton: "Log in",
    loginWelcome: "Welcome",
    loginSubtitle: "Sign in to your account",

    emailLabel: "Email",
    emailPlaceholder: "Enter your email",

    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",

    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",

    loginSubmit: "Log in",

    accountPrompt: "Don't have an account?",
    registerLink: "Register",

    enterEmail: "Please enter your email.",
    enterPassword: "Please enter your password.",
    passwordMin6: "Password must be at least 6 characters.",

    invalidCredentials: "Invalid email or password.",
    loginSuccess: "✅ Login Successful!",

    loading: "Loading...",

    // Register
    signupButton: "Start a Blueprint",
    createYourAccount: "Create your account",
    startTurningIdeas: "Start turning ideas into blueprints",

    fullNameLabel: "Full name",
    enterYourName: "Enter your name",

    emailAddressLabel: "Email Address",
    userNamePlaceholder: "user-name@example.com",

    passwordPlaceholderRegister: "••••••••",

    confirmPasswordLabel: "Confirm password",

    agreeTerms: "I agree to the Terms of Service and Privacy Policy",

    createAccountButton: "Create account",

    alreadyHaveAccount: "Already have an account?",

    signIn: "Sign in",

    registrationSuccessful: "Registration successful!",

    registrationFailed: "Registration failed.",

    passwordMustContain8: "Password must contain at least 8 characters",

    passwordValid: "✔ Password length is valid",

    passwordTooShort: "✖ Password must contain at least 8 characters",

    passwordsDoNotMatch: "Passwords do not match",

    // Forgot Password
    forgotPasswordTitle: "Forgot Password?",

    forgotPasswordSubtitle:
      "Enter your email address and we'll send you a link to reset your password.",

    sendResetLink: "Send Reset Link",

    enterValidEmail: "Please enter a valid email",

    emailNotFound: "Email not found",

    serverErrorTryLater: "Server error. Try again later",

    sendingVerificationEmail: "Sending verification email...",

    // Email Verification
    verifyEmailTitle: "Verify Your Email",

    verifyEmailSubtitle:
      "We sent a verification code to your email. Please enter the code below.",

    enter6DigitCode: "Please enter the 6 digit code",

    emailVerifiedSuccessfully: "Email verified successfully",

    verifyButton: "Verify",

    didntReceiveCode: "Didn't receive the code?",

    resendCode: "Resend Code",

    resendCodeTimer: "Resend Code ({timer})",

    newCodeSent: "New code sent",

    // Reset Password
    resetPasswordTitle: "Reset Password",

    resetPasswordSubtitle: "Create your new password",

    newPasswordLabel: "New Password",

    enterNewPassword: "Enter new password",

    confirmPasswordPlaceholder: "Confirm password",

    weakPassword: "Weak Password",

    mediumPassword: "Medium Password",

    strongPassword: "Strong Password",

    resetPasswordButton: "Reset Password",

    resetPasswordFailed: "Reset password failed",

    somethingWentWrong: "Something went wrong",

    goToLogin: "Back to Login",
    // Team / AI Council
    teamTitle: "Meet the AI Engineering Council",

    teamSubtitle:
      "Eleven specialists named after pioneers of computing. Each owns one discipline, works in order, and reviews the others.",

    roleProjectDirector: "Project Director",
    roleBusinessAnalyst: "Business Analyst",
    roleRequirementsAnalyst: "Requirements Analyst",
    roleSystemArchitect: "System Architect",
    roleDatabaseEngineer: "Database Engineer",
    roleApiEngineer: "API Engineer",
    roleUiUxDesigner: "UI/UX Designer",
    roleSecurityEngineer: "Security Engineer",
    roleQaEngineer: "QA Engineer",
    roleDevOpsEngineer: "DevOps Engineer",
    roleDocumentationAgent: "Documentation Agent",

    descProjectDirector:
      "Analyses the idea, plans the pipeline, resolves conflicts and approves.",

    descBusinessAnalyst: "Stakeholders, value proposition and business rules.",

    descRequirementsAnalyst:
      "Functional and non-functional requirements and use cases.",

    descSystemArchitect: "Layered architecture and clear module boundaries.",

    descDatabaseEngineer: "Entities, ERD and normalized SQL schema.",

    descApiEngineer: "REST endpoints, authentication and error semantics.",

    descUiUxDesigner: "User flows, wireframes and the design system.",

    descSecurityEngineer: "Threat model and concrete security controls.",

    descQaEngineer: "Test plan with concrete, traceable test cases.",

    descDevOpsEngineer: "CI/CD pipeline and deployment strategy.",

    descDocumentationAgent: "Compiles everything into the final blueprint.",

    // Output
    outputHeading: "One idea in. A complete blueprint out.",

    outputSubtitle:
      "Every blueprint is an SRS/SDD-grade document covering the full analysis and design process.",

    ctaTitle: "Turn your idea into an engineered system",

    ctaText:
      "Free while in beta · English & Arabic output · Export as PDF or Markdown",

    ctaButton: "Start a Blueprint →",

    footerBrandName: "Luma Architect",

    footerBrandText: "From raw idea to complete software blueprint.",

    footerCopyright: "© 2026 Luma Architect · Graduation Project",

    // Workspace
    workspaceTitle: "Workspace",

    workspaceSubtitle: "6 blueprints · your engineering company is ready",

    workspaceSearchPlaceholder: "Search blueprints...",

    workspaceNewBlueprint: "New Blueprint",

    workspaceSortAZ: "A → Z",

    workspaceSortZA: "Z → A",

    workspaceFilterAll: "All",

    workspaceFilterDraft: "Draft",

    workspaceFilterGenerating: "Generating",

    workspaceFilterInReview: "In review",

    workspaceFilterCompleted: "Completed",

    workspaceFilterFailed: "Failed",

    workspaceShare: "Share",

    workspaceUpgrade: "Upgrade",

    workspacePublish: "Publish",

    workspaceOpen: "Open →",

    workspaceNotification1: "Blueprint generated successfully",

    workspaceNotification2: "Campus Food Delivery updated",

    workspaceNotification3: "New AI suggestion available",

    workspaceHi: "Hi, I'm Luma! 👋",

    workspaceHeroText:
      "I can help you create software blueprints, design scalable systems, optimize workflows and generate complete project architecture within minutes.",

    // Projects
    clinicAppointmentSystem: "Clinic Appointment System",

    campusFoodDelivery: "Campus Food Delivery",

    freelancerInvoicingTool: "Freelancer Invoicing Tool",

    fitnessHabitTracker: "Fitness Habit Tracker",

    smartParkingPlatform: "Smart Parking Platform",

    onlineBookstore: "Online Bookstore",

    clinicFooter: "7 / 11 agents",

    campusFooter: "11 sections · updated 2h ago",

    freelancerFooter: "3 open reviews · updated 6h ago",

    fitnessFooter: "Draft · edited yesterday",

    parkingFooter: "Fetching failed · retry available",

    bookstoreFooter: "10 sections · updated 5 days ago",

    // Status
    statusGenerating: "Generating",

    statusCompleted: "Completed",

    statusInReview: "In review",

    statusDraft: "Draft",

    statusFailed: "Failed",

    typeWebApp: "Web App",

    typeMobileApp: "Mobile App",

    typeApiService: "API Service",

    typePlatform: "Platform",

    levelComplex: "Complex",

    levelMedium: "Medium",

    levelSimple: "Simple",

    // Home / Atoms
    home: "Home",

    resources: "Resources",

    newChat: "New Chat",

    myProjects: "My Projects",

    askPlaceholder: "Ask the team to bring your idea to life",

    freePlan: "Free plan",

    upgrade: "Upgrade",

    uploadFile: "Upload file",

    addImage: "Add image",

    connectTools: "Connect tools",

    system: "System",

    light: "Light",

    dark: "Dark",

    build: "Build",

    connectAtoms: "Connect your tools to Atoms",

    recents: "Recents",

    yourChats: "Your chats will appear here",

    joinCommunity: "Join our Community",

    earnCredits: "Earn up to 25 credits",

    getFreeCredits: "Get Free Credits",

    get10Credits: "Get 10 credits each",

    homeTitle: "Your next product starts here.",

    homeTeamAriaLabel: "Atoms team",

    alexAgent: "Alex is a Product Manager",

    emmaAgent: "Emma is a UI Designer",

    noahAgent: "Noah is a Backend Developer",

    lunaAgent: "Luna is a QA Engineer",

    davidAgent: "David is a Data Analyst",

    miaAgent: "Mia is an AI Engineer",

    leoAgent: "Leo is a Marketing Expert",

    speechNotSupported: "Speech Recognition is not supported.",

    aiResponse:
      "I received your idea. I will help you implement it step by step.",

    // Settings
    settings: "Settings",

    plans: "Plans",

    profile: "Profile",

    appearance: "Appearance",

    helpCenter: "Help Center",

    homepage: "Homepage",

    signOut: "Sign out",

    domains: "Domains",

    people: "People",

    general: "General",

    connectors: "Connectors",

    plansCredits: "Plans and credits",

    cloudAI: "Cloud & AI",

    account: "Account",

    preference: "Preference",

    project: "Project",

    creditsRemaining: "Credits remaining",

    left: "left",

    allWorkspaces: "All workspaces",

    editProfile: "Edit profile",

    publicProjects: "Public Projects",

    saved: "Saved",

    otherProjects: "Other Projects",

    accountSettings: "Account Settings",

    manageAccount:
      "Manage your account status and permanently delete your account.",

    accountStatus: "Account status",

    accountActive: "Your account is currently active.",

    accountDeactivated: "Your account is currently deactivated.",

    deactivateAccount: "Deactivate account",

    activateAccount: "Activate account",

    pleaseWait: "Please wait...",

    deleteAccount: "Delete account",

    deleteAccountConfirm:
      "Are you sure you want to permanently delete your account? This action cannot be undone.",

    deleting: "Deleting...",

    inviteMembers: "Invite workspace members",

    upgradeInvite: "Upgrade to invite members and collaborate on all projects.",

    addEmails: "Add emails",

    connect: "Connect",

    planPayment: "Plan Payment",

    unlockFeatures: "Unlock more features",

    month: "month",

    language: "Language",

    changeLanguage: "Change the language used in the user interface.",

    theme: "Theme",

    customizeTheme: "Customize how Atoms looks on your device.",

    avatar: "Avatar",

    username: "Username",

    email: "Email",

    manageProfile: "Manage your profile and account information.",

    cloudBalance:
      "Your Cloud & AI Balance is crucial for keeping your published projects running.",

    defaultModel: "Default Model",

    permissions: "Permissions",

    setDefaultAccess: "Set Default Access for Projects",

    public: "Public",

    creditReminder: "Credit Balance Reminder",
    redemption: "Redemption",
    showCredits: "Show remaining credits",

    logs: "Logs",
    logsDescription: "Review system activities and events",
    refresh: "Refresh",
    searchLogs: "Search logs...",
    info: "INFO",
    warning: "WARNING",
    error: "ERROR",
    level: "Level",
    user: "User",
    message: "Message",
    date: "Date",
    noLogs: "No logs found",
    systemState: "System State",
    systemStateDescription: "Monitor platform infrastructure and health",
    loadingSystemData: "Loading System Data...",
    totalServices: "Total Services",
    systemHealth: "System Health",
    cpuUsage: "CPU Usage",
    memoryUsage: "Memory Usage",
    systemResources: "System Resources",
    cpu: "CPU",
    memory: "Memory",
    storage: "Storage",
    servicesStatus: "Services Status",
    service: "Service",
    uptime: "Uptime",
    load: "Load",
    running: "Running",
    // ================= Users =================

    usersTitle: "Users",

    usersDescription: "Manage and monitor LUMA users.",

    usersRefresh: "Refresh",

    usersLoading: "Loading...",

    usersLoadingUsers: "Loading users...",

    usersTotal: "Total Users",

    usersActive: "Active Users",

    usersInactive: "Inactive Users",

    usersSearchResults: "Search Results",

    usersAll: "All Users",

    usersAllDescription: "View registered users and their information.",

    usersSearchPlaceholder: "Search users...",

    usersUser: "User",

    usersEmail: "Email",

    usersRole: "Role",

    usersStatus: "Status",

    usersAction: "Action",

    usersView: "View",

    usersActiveStatus: "Active",

    usersInactiveStatus: "Inactive",

    usersNoUsers: "No users found",

    usersNoSearchResults: "No users match your search.",

    usersNoUsersToDisplay: "There are no users to display.",

    usersUnknownUser: "Unknown User",

    usersLoadError: "Failed to load users. Please try again.",

    usersTryAgain: "Try Again",

    usersDetails: "User Details",

    usersDetailsDescription: "View user information.",

    usersId: "ID",

    usersUsername: "Username",

    usersClose: "Close",

    usersUserRole: "User",

    usersAdminRole: "Admin",

    usersSuperAdminRole: "Super Admin",
    // ================= Overview =================

    overviewSuperAdminDashboard: "SUPER ADMIN DASHBOARD",

    overviewAdminDashboard: "ADMIN DASHBOARD",

    overviewTitle: "Overview",

    overviewDescription: "Monitor your Luma platform from one place.",

    overviewSuperAdmin: "Super Admin",

    overviewAdmin: "Admin",

    overviewSuperAdministrator: "Super Administrator",

    overviewAdministrator: "Administrator",

    overviewControlCenter: "LUMA CONTROL CENTER",

    overviewEverythingUnderControl: "Everything is under control.",

    overviewBannerDescription:
      "Track users, blueprints and platform activity from your dashboard.",

    overviewLive: "LIVE",

    overviewActive: "ACTIVE",

    overviewRecent: "RECENT",

    overviewSystem: "SYSTEM",

    overviewTotalUsers: "Total Users",

    overviewRegisteredUsers: "Registered platform users",

    overviewBlueprints: "Blueprints",

    overviewGeneratedBlueprints: "Generated project blueprints",

    overviewActivities: "Activities",

    overviewRecordedActivities: "Recorded platform activities",

    overviewSystemStatus: "System Status",

    overviewSystemMonitoring: "Platform system monitoring",

    overviewOnline: "Online",

    overviewPlatform: "PLATFORM",

    overviewSystemOverview: "System Overview",

    overviewCurrentPlatformInfo: "Current platform information",

    overviewSystemOperational: "System Operational",

    overviewNoSystemStats: "No system statistics available.",

    overviewTotalBlueprints: "Total Blueprints",

    overviewMonitoring: "MONITORING",

    overviewRecentActivity: "Recent Activity",

    overviewLatestEvents: "Latest platform events",

    overviewNoActivity: "No activity available.",

    overviewPlatformActivity: "Platform Activity",

    overviewSystemActivity: "System activity",

    overviewAiCore: "LUMA AI CORE",

    overviewAssistantReady: "Your platform assistant is ready.",

    overviewAssistantDescription:
      "Luma keeps your workspace organized, monitored and running smoothly.",
    // System Settings
    systemSettings: "System Settings",
    systemSettingsDescription:
      "Manage system configuration and platform behavior.",

    generalSettings: "General Settings",
    generalSettingsDescription:
      "Configure the main behavior of the LUMA platform.",

    maintenanceMode: "Maintenance Mode",
    maintenanceModeDescription:
      "Temporarily disable access to the platform while maintenance is being performed.",
    toggleMaintenanceMode: "Toggle maintenance mode",

    userRegistration: "User Registration",
    userRegistrationDescription:
      "Allow new users to create accounts on the platform.",
    toggleUserRegistration: "Toggle user registration",

    emailVerification: "Email Verification",
    emailVerificationDescription:
      "Require users to verify their email address before accessing the platform.",
    toggleEmailVerification: "Toggle email verification",

    platformFeatures: "Platform Features",
    platformFeaturesDescription:
      "Control which features are available to users.",

    notifications: "Notifications",
    notificationsDescription: "Enable system notifications for platform users.",
    toggleNotifications: "Toggle notifications",

    blueprintCreation: "Blueprint Creation",
    blueprintCreationDescription:
      "Allow users to create new engineering blueprints.",
    toggleBlueprintCreation: "Toggle blueprint creation",

    aiChat: "AI Chat",
    aiChatDescription: "Allow users to communicate with the LUMA AI assistant.",
    toggleAiChat: "Toggle AI chat",

    systemInformation: "System Information",
    systemInformationDescription:
      "Basic information about the current platform.",

    platform: "Platform",
    environment: "Environment",
    production: "Production",
    systemStatus: "System Status",
    operational: "Operational",
    version: "Version",
    overview: "Overview",
    users: "Users",
    logout: "Logout",
  },
  ar: {
    overview: "نظرة عامة",
    users: "المستخدمون",
    logout: "تسجيل الخروج",
    // System Settings
    systemSettings: "إعدادات النظام",
    systemSettingsDescription: "إدارة إعدادات النظام وسلوك المنصة.",

    generalSettings: "الإعدادات العامة",
    generalSettingsDescription: "تكوين السلوك الرئيسي لمنصة LUMA.",

    maintenanceMode: "وضع الصيانة",
    maintenanceModeDescription:
      "تعطيل الوصول إلى المنصة مؤقتًا أثناء إجراء أعمال الصيانة.",
    toggleMaintenanceMode: "تفعيل أو تعطيل وضع الصيانة",

    userRegistration: "تسجيل المستخدمين",
    userRegistrationDescription:
      "السماح للمستخدمين الجدد بإنشاء حسابات على المنصة.",
    toggleUserRegistration: "تفعيل أو تعطيل تسجيل المستخدمين",

    emailVerification: "التحقق من البريد الإلكتروني",
    emailVerificationDescription:
      "مطالبة المستخدمين بالتحقق من بريدهم الإلكتروني قبل الوصول إلى المنصة.",
    toggleEmailVerification: "تفعيل أو تعطيل التحقق من البريد الإلكتروني",

    platformFeatures: "ميزات المنصة",
    platformFeaturesDescription: "التحكم في الميزات المتاحة للمستخدمين.",

    notifications: "الإشعارات",
    notificationsDescription: "تفعيل إشعارات النظام لمستخدمي المنصة.",
    toggleNotifications: "تفعيل أو تعطيل الإشعارات",

    blueprintCreation: "إنشاء المخططات",
    blueprintCreationDescription:
      "السماح للمستخدمين بإنشاء مخططات هندسية جديدة.",
    toggleBlueprintCreation: "تفعيل أو تعطيل إنشاء المخططات",

    aiChat: "محادثة الذكاء الاصطناعي",
    aiChatDescription:
      "السماح للمستخدمين بالتواصل مع مساعد LUMA للذكاء الاصطناعي.",
    toggleAiChat: "تفعيل أو تعطيل محادثة الذكاء الاصطناعي",

    systemInformation: "معلومات النظام",
    systemInformationDescription: "معلومات أساسية حول المنصة الحالية.",

    platform: "المنصة",
    environment: "البيئة",
    production: "الإنتاج",
    systemStatus: "حالة النظام",
    operational: "يعمل بشكل طبيعي",
    version: "الإصدار",
    // ================= Overview =================

    overviewSuperAdminDashboard: "لوحة تحكم المدير العام",

    overviewAdminDashboard: "لوحة تحكم المدير",

    overviewTitle: "نظرة عامة",

    overviewDescription: "راقب منصة Luma الخاصة بك من مكان واحد.",

    overviewSuperAdmin: "المدير العام",

    overviewAdmin: "المدير",

    overviewSuperAdministrator: "المدير العام للنظام",

    overviewAdministrator: "المدير",

    overviewControlCenter: "مركز تحكم LUMA",

    overviewEverythingUnderControl: "كل شيء تحت السيطرة.",

    overviewBannerDescription:
      "تابع المستخدمين والمخططات ونشاط المنصة من لوحة التحكم الخاصة بك.",

    overviewLive: "مباشر",

    overviewActive: "نشط",

    overviewRecent: "حديث",

    overviewSystem: "النظام",

    overviewTotalUsers: "إجمالي المستخدمين",

    overviewRegisteredUsers: "المستخدمون المسجلون في المنصة",

    overviewBlueprints: "المخططات",

    overviewGeneratedBlueprints: "مخططات المشاريع التي تم إنشاؤها",

    overviewActivities: "الأنشطة",

    overviewRecordedActivities: "الأنشطة المسجلة على المنصة",

    overviewSystemStatus: "حالة النظام",

    overviewSystemMonitoring: "مراقبة نظام المنصة",

    overviewOnline: "متصل",

    overviewPlatform: "المنصة",

    overviewSystemOverview: "نظرة عامة على النظام",

    overviewCurrentPlatformInfo: "معلومات المنصة الحالية",

    overviewSystemOperational: "النظام يعمل بشكل طبيعي",

    overviewNoSystemStats: "لا تتوفر إحصائيات للنظام.",

    overviewTotalBlueprints: "إجمالي المخططات",

    overviewMonitoring: "المراقبة",

    overviewRecentActivity: "النشاط الأخير",

    overviewLatestEvents: "أحدث أحداث المنصة",

    overviewNoActivity: "لا يوجد نشاط متاح.",

    overviewPlatformActivity: "نشاط المنصة",

    overviewSystemActivity: "نشاط النظام",

    overviewAiCore: "نواة LUMA للذكاء الاصطناعي",

    overviewAssistantReady: "مساعد المنصة جاهز.",

    overviewAssistantDescription:
      "تحافظ Luma على تنظيم مساحة العمل ومراقبتها وتشغيلها بسلاسة.",
    // ================= المستخدمون =================

    usersTitle: "المستخدمون",

    usersDescription: "إدارة ومتابعة مستخدمي LUMA.",

    usersRefresh: "تحديث",

    usersLoading: "جارٍ التحميل...",

    usersLoadingUsers: "جارٍ تحميل المستخدمين...",

    usersTotal: "إجمالي المستخدمين",

    usersActive: "المستخدمون النشطون",

    usersInactive: "المستخدمون غير النشطين",

    usersSearchResults: "نتائج البحث",

    usersAll: "جميع المستخدمين",

    usersAllDescription: "عرض المستخدمين المسجلين ومعلوماتهم.",

    usersSearchPlaceholder: "البحث عن مستخدمين...",

    usersUser: "المستخدم",

    usersEmail: "البريد الإلكتروني",

    usersRole: "الصلاحية",

    usersStatus: "الحالة",

    usersAction: "الإجراء",

    usersView: "عرض",

    usersActiveStatus: "نشط",

    usersInactiveStatus: "غير نشط",

    usersNoUsers: "لم يتم العثور على مستخدمين",

    usersNoSearchResults: "لا يوجد مستخدمون يطابقون بحثك.",

    usersNoUsersToDisplay: "لا يوجد مستخدمون لعرضهم.",

    usersUnknownUser: "مستخدم غير معروف",

    usersLoadError: "فشل تحميل المستخدمين. يرجى المحاولة مرة أخرى.",

    usersTryAgain: "حاول مرة أخرى",

    usersDetails: "تفاصيل المستخدم",

    usersDetailsDescription: "عرض معلومات المستخدم.",

    usersId: "المعرّف",

    usersUsername: "اسم المستخدم",

    usersClose: "إغلاق",

    usersUserRole: "مستخدم",

    usersAdminRole: "مدير",

    usersSuperAdminRole: "مدير النظام",

    systemState: "حالة النظام",
    systemStateDescription: "مراقبة البنية التحتية وصحة المنصة",
    loadingSystemData: "جاري تحميل بيانات النظام...",
    totalServices: "إجمالي الخدمات",
    systemHealth: "صحة النظام",
    cpuUsage: "استخدام المعالج",
    memoryUsage: "استخدام الذاكرة",
    systemResources: "موارد النظام",
    cpu: "المعالج",
    memory: "الذاكرة",
    storage: "التخزين",
    servicesStatus: "حالة الخدمات",
    service: "الخدمة",
    status: "الحالة",
    uptime: "مدة التشغيل",
    load: "الحمل",
    running: "يعمل",
    warning: "تحذير",
    logs: "السجلات",
    logsDescription: "مراجعة أنشطة وأحداث النظام",
    refresh: "تحديث",
    searchLogs: "ابحث في السجلات...",
    all: "الكل",
    info: "معلومات",
    error: "خطأ",
    level: "المستوى",
    action: "الإجراء",
    user: "المستخدم",
    message: "الرسالة",
    date: "التاريخ",
    noLogs: "لا توجد سجلات",
    blueprints: "المخططات",

    blueprintsDescription: "إدارة ومراقبة مخططات البرمجيات التي تم إنشاؤها",

    newBlueprint: "مخطط جديد",

    totalBlueprints: "إجمالي المخططات",

    searchBlueprints: "البحث عن المخططات...",

    active: "نشط",

    building: "قيد الإنشاء",

    completed: "مكتمل",

    failed: "فشل",

    blueprint: "المخطط",

    owner: "المالك",

    updated: "آخر تحديث",

    // General
    you: "أنت",
    credits: "رصيد",
    plans: "الخطط",
    redemption: "الاسترداد",
    // Navigation
    navProduct: "المنتج",
    navCouncil: "المجلس",
    navHow: "كيف يعمل",
    navOutput: "الناتج",
    navPricing: "الأسعار",

    product: "المنتج",
    council: "المجلس",
    how: "كيف يعمل",
    output: "الناتج",
    pricing: "الأسعار",

    languageToggle: "English",

    // Authentication
    loginButton: "تسجيل الدخول",
    signupButton: "ابدأ مخططًا",

    loginWelcome: "مرحبا",
    loginSubtitle: "سجّل الدخول إلى حسابك",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "أدخل بريدك الإلكتروني",
    passwordLabel: "كلمة المرور",
    passwordPlaceholder: "أدخل كلمة المرور",
    rememberMe: "تذكرني",
    forgotPassword: "نسيت كلمة المرور؟",
    loginSubmit: "تسجيل الدخول",

    accountPrompt: "ليس لديك حساب؟",
    registerLink: "إنشاء حساب",
    signIn: "تسجيل الدخول",

    enterEmail: "يرجى إدخال بريدك الإلكتروني.",
    enterPassword: "يرجى إدخال كلمة المرور.",
    passwordMin6: "يجب أن تكون كلمة المرور 6 أحرف على الأقل.",
    invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    loginSuccess: "✅ تم تسجيل الدخول بنجاح!",
    loading: "جارٍ التحميل...",

    createYourAccount: "أنشئ حسابك",
    startTurningIdeas: "ابدأ بتحويل الأفكار إلى مخططات",
    fullNameLabel: "الاسم الكامل",
    enterYourName: "أدخل اسمك",
    emailAddressLabel: "البريد الإلكتروني",
    userNamePlaceholder: "user-name@example.com",
    passwordPlaceholderRegister: "••••••••",
    confirmPasswordLabel: "تأكيد كلمة المرور",
    agreeTerms: "أوافق على شروط الخدمة وسياسة الخصوصية",
    createAccountButton: "إنشاء حساب",
    alreadyHaveAccount: "هل لديك حساب بالفعل؟",

    termsAgreement: "أوافق على شروط الخدمة وسياسة الخصوصية",

    registrationSuccessful: "تم التسجيل بنجاح!",
    registrationFailed: "فشل التسجيل.",

    passwordMustContain8: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل",
    passwordValid: "✔ طول كلمة المرور صحيح",
    passwordTooShort: "✖ يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل",
    passwordsDoNotMatch: "كلمتا المرور غير متطابقتين",

    forgotPasswordTitle: "نسيت كلمة المرور؟",
    forgotPasswordSubtitle:
      "أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور.",
    sendResetLink: "إرسال رابط إعادة التعيين",

    enterValidEmail: "يرجى إدخال بريد إلكتروني صالح",
    emailNotFound: "البريد الإلكتروني غير موجود",
    serverErrorTryLater: "خطأ في الخادم. حاول مرة أخرى لاحقًا",

    sendingVerificationEmail: "جارٍ إرسال بريد التحقق...",
    verifyEmailTitle: "تحقق من بريدك الإلكتروني",
    verifyEmailSubtitle:
      "أرسلنا رمز تحقق إلى بريدك الإلكتروني. يرجى إدخال الرمز أدناه.",
    enter6DigitCode: "يرجى إدخال رمز مكون من 6 أرقام",
    emailVerifiedSuccessfully: "تم التحقق من البريد الإلكتروني بنجاح",

    verifyButton: "تحقق",
    didntReceiveCode: "لم يصلك الرمز؟",
    resendCode: "إعادة إرسال الرمز",
    resendCodeTimer: "إعادة إرسال الرمز ({timer})",
    newCodeSent: "تم إرسال رمز جديد",

    resetPasswordTitle: "إعادة تعيين كلمة المرور",
    resetPasswordSubtitle: "أنشئ كلمة مرور جديدة",
    newPasswordLabel: "كلمة مرور جديدة",
    enterNewPassword: "أدخل كلمة مرور جديدة",
    confirmPasswordPlaceholder: "تأكيد كلمة المرور",

    weakPassword: "كلمة مرور ضعيفة",
    mediumPassword: "كلمة مرور متوسطة",
    strongPassword: "كلمة مرور قوية",

    resetPasswordButton: "إعادة تعيين كلمة المرور",
    resetPasswordFailed: "فشل إعادة تعيين كلمة المرور",

    goToLogin: "العودة إلى تسجيل الدخول",
    rememberPassword: "تذكرت كلمة المرور؟",
    backToLogin: "العودة إلى تسجيل الدخول",

    // Hero Section
    heroBadge: "شركة هندسة برمجيات افتراضية — ليست دردشة",

    heroTitle1: "من الفكرة الأولية إلى",
    heroTitle2: "مخطط برمجي كامل",

    heroSubtitle:
      "وصف فكرتك بجملة واحدة. مجلس مكون من أحد عشر وكيل ذكاء اصطناعي يحولها إلى متطلبات، هندسة، قاعدة بيانات، واجهة برمجة تطبيقات، واجهة مستخدم، أمان، اختبارات وخطة نشر — قابلة للتصدير كملف PDF أو Markdown.",

    heroPrimary: "ابدأ مخططًا →",
    heroSecondary: "شاهد كيف يعمل المجلس",

    // Council
    councilTitle: "غرفة مجلس الهندسة",
    councilProgress: "7 / 11 وكلاء مكتملون",

    agentAnalysingScope: "يحلل النطاق",
    agentDraftingFR: "صياغة FR-001...",
    agentLayeredArchitecture: "هندسة طبقية",

    teamTitle: "تعرف على مجلس هندسة الذكاء الاصطناعي",

    teamSubtitle:
      "أحد عشر متخصصًا مسمىًّا على أسماء رواد الحوسبة. كل واحد يمتلك تخصصه، يعمل بالتتابع، ويُراجع الآخرين.",

    roleProjectDirector: "مدير المشروع",
    roleBusinessAnalyst: "محلل أعمال",
    roleRequirementsAnalyst: "محلل متطلبات",
    roleSystemArchitect: "مهندس النظام",
    roleDatabaseEngineer: "مهندس قاعدة البيانات",
    roleApiEngineer: "مهندس واجهة برمجة التطبيقات",
    roleUiUxDesigner: "مصمم واجهة المستخدم",
    roleSecurityEngineer: "مهندس الأمان",
    roleQaEngineer: "مهندس ضمان الجودة",
    roleDevOpsEngineer: "مهندس DevOps",
    roleDocumentationAgent: "وكيل التوثيق",
    // Council Descriptions
    descProjectDirector: "يحلل الفكرة، يخطط خط الأنابيب، يحل النزاعات ويوافق.",

    descBusinessAnalyst: "أصحاب المصلحة، عرض القيمة، وقواعد الأعمال.",

    descRequirementsAnalyst:
      "المتطلبات الوظيفية وغير الوظيفية وحالات الاستخدام.",

    descSystemArchitect: "هندسة طبقية وحدود وحدات واضحة.",

    descDatabaseEngineer: "الكيانات، ERD ونموذج SQL مضبوط.",

    descApiEngineer: "نقاط نهاية REST، المصادقة ومعاني الأخطاء.",

    descUiUxDesigner: "تدفقات المستخدم، الرسومات السلكية ونظام التصميم.",

    descSecurityEngineer: "نموذج التهديد وضوابط الأمان الملموسة.",

    descQaEngineer: "خطة اختبار مع حالات اختبار ملموسة وقابلة للتتبع.",

    descDevOpsEngineer: "خط أنابيب CI/CD واستراتيجية النشر.",

    descDocumentationAgent: "يجمع كل شيء في المخطط النهائي.",

    // Process Steps
    step1Title: "وصف الفكرة",
    step1Text:
      "اكتب فكرتك بلغة بسيطة، اختر نوع المشروع، مستوى التعقيد، ولغة المخرجات.",

    step2Title: "المجلس يصنعها",
    step2Text:
      "أحد عشر وكيلًا يديرون خط أنابيب منظمًا في الوقت الحقيقي، يناقشون ويحلّون التعارضات.",

    step3Title: "تحميل المخطط",
    step3Text: "اقرأ، حسّن، وصدّر وثيقة هندسية كاملة كملف PDF أو Markdown.",

    // Blueprint Output
    outputHeading: "فكرة واحدة داخلة. مخطط كامل خارج.",

    outputSubtitle:
      "كل مخطط هو وثيقة من درجة SRS/SDD تغطي كامل عملية التحليل والتصميم.",

    requirementsTitle: "المتطلبات",
    requirementsText:
      "متطلبات وظيفية وغير وظيفية مرقمة مع معايير قبول وحالات استخدام.",

    architectureTitle: "الهندسة",
    architectureText: "هندسة نظام طبقية مع حدود وحدات واضحة.",

    databaseTitle: "قاعدة البيانات",
    databaseText: "الكيانات، مخطط ERD ونموذج SQL مضبوط مع الفهارس.",

    apiTitle: "واجهة برمجة التطبيقات",
    apiText: "نقاط نهاية REST مع المصادقة، التجزئة، ومعاني الأخطاء.",

    uxTitle: "واجهة المستخدم",
    uxText: "تدفقات المستخدم، الرسومات السلكية ونظام تصميم كامل.",

    securityTitle: "الأمان",
    securityText: "نموذج التهديد، الضوابط، وتحليل الأمان.",

    testingTitle: "الاختبار",
    testingText: "خطة اختبار مع حالات اختبار ملموسة وقابلة للتتبع.",

    devopsTitle: "DevOps",
    devopsText: "خط أنابيب CI/CD واستراتيجية نشر.",

    // CTA + Footer
    ctaTitle: "حوّل فكرتك إلى نظام هندسي",

    ctaText:
      "مجاني أثناء فترة البيتا · مخرجات بالإنجليزية والعربية · تصدير كـ PDF أو Markdown",

    ctaButton: "ابدأ مخططًا →",

    footerBrandName: "Luma Architect",

    footerBrandText: "من الفكرة الأولية إلى مخطط برمجي كامل.",

    footerCopyright: "© 2026 Luma Architect · مشروع التخرج",

    sampleOutputNav: "ناتج العينة",

    // Workspace
    workspaceTitle: "مساحة العمل",

    workspaceSubtitle: "6 مخططات · شركة هندستك جاهزة",

    workspaceSearchPlaceholder: "ابحث في المخططات...",

    workspaceNewBlueprint: "مخطط جديد",

    workspaceSortAZ: "A → Z",

    workspaceSortZA: "Z → A",

    workspaceFilterAll: "الكل",

    workspaceFilterDraft: "مسودة",

    workspaceFilterGenerating: "جارٍ الإنشاء",

    workspaceFilterInReview: "قيد المراجعة",

    workspaceFilterCompleted: "مكتمل",

    workspaceFilterFailed: "فشل",

    workspaceShare: "مشاركة",

    workspaceUpgrade: "ترقية",

    workspacePublish: "نشر",

    workspaceOpen: "افتح →",

    workspaceNotification1: "تم إنشاء المخطط بنجاح",

    workspaceNotification2: "تم تحديث Campus Food Delivery",

    workspaceNotification3: "اقتراح AI جديد متاح",

    workspaceHi: "مرحبًا، أنا لوما! 👋",

    workspaceHeroText:
      "أستطيع مساعدتك في إنشاء مخططات برمجية، تصميم أنظمة قابلة للتوسع، تحسين سير العمل وإنشاء بنية مشروع كاملة خلال دقائق.",

    // Blueprint Cards
    clinicAppointmentSystem: "نظام مواعيد العيادة",

    campusFoodDelivery: "توصيل الطعام الجامعي",

    freelancerInvoicingTool: "أداة فواتير المستقلين",

    fitnessHabitTracker: "متتبع العادات الرياضية",

    smartParkingPlatform: "منصة المواقف الذكية",

    onlineBookstore: "متجر الكتب الإلكتروني",

    clinicFooter: "7 / 11 وكلاء",

    campusFooter: "11 قسم · تم التحديث منذ ساعتين",

    freelancerFooter: "3 مراجعات مفتوحة · تم التحديث منذ 6 ساعات",

    fitnessFooter: "مسودة · تم التعديل أمس",

    parkingFooter: "فشل الجلب · إعادة المحاولة متاحة",

    bookstoreFooter: "10 أقسام · تم التحديث منذ 5 أيام",
    // Status & Types
    statusGenerating: "جارٍ الإنشاء",
    statusCompleted: "مكتمل",
    statusInReview: "قيد المراجعة",
    statusDraft: "مسودة",
    statusFailed: "فشل",

    typeWebApp: "تطبيق ويب",
    typeMobileApp: "تطبيق جوال",
    typeApiService: "خدمة API",
    typePlatform: "منصة",

    levelComplex: "معقد",
    levelMedium: "متوسط",
    levelSimple: "بسيط",

    // Sidebar / Home
    home: "الرئيسية",
    homeButton: "الرئيسية",

    resources: "الموارد",
    myProjects: "مشاريعي",

    newChat: "محادثة جديدة",

    history: "السجل",

    askPlaceholder: "اطلب من الفريق تحويل فكرتك إلى مشروع",

    homeTitle: "منتجك القادم يبدأ من هنا.",

    homePromptPlaceholder: "اطلب من الفريق تحويل فكرتك إلى واقع",

    homeUploadFile: "رفع ملف",

    homeAddImage: "إضافة صورة",

    homeConnectTools: "ربط الأدوات",

    homeBuild: "إنشاء",

    build: "بناء",

    // Plans & Credits
    freePlan: "الخطة المجانية",

    homeFreePlan: "الخطة المجانية",

    creditsRemaining: "الرصيد المتبقي",

    left: "متبقي",

    upgrade: "ترقية",

    earnCredits: "اكسب حتى 25 رصيدًا",

    freeCredits: "احصل على رصيد مجاني",

    getCredits: "احصل على 10 أرصدة لكل دعوة",

    // Agents
    homeTeamAriaLabel: "فريق Atoms",

    homeAgentAlex: "Alex هو مدير منتج",

    homeAgentEmma: "Emma هي مصممة واجهات مستخدم",

    homeAgentNoah: "Noah هو مطور Backend",

    homeAgentLuna: "Luna هي مهندسة ضمان جودة",

    homeAgentDavid: "David هو محلل بيانات",

    homeAgentMia: "Mia هي مهندسة ذكاء اصطناعي",

    homeAgentLeo: "Leo هو خبير تسويق",

    alexAgent: "أليكس مدير منتجات",

    emmaAgent: "إيما مصممة واجهات",

    noahAgent: "نوح مطور Backend",

    lunaAgent: "لونا مهندسة اختبار",

    davidAgent: "ديفيد محلل بيانات",

    miaAgent: "ميا مهندسة ذكاء اصطناعي",

    leoAgent: "ليو خبير تسويق",

    // Files / Viewer
    filesTitle: "الملفات",

    siteAnalyticsTitle: "تحليلات الموقع",

    siteAnalyticsText: "ابدأ ببناء موقعك لتمكين تتبع التحليلات.",

    emptyStateMessage: "لا يوجد محتوى بعد",

    emptyStateDetail: "سيولد وكيل الذكاء الاصطناعي الخاص بك هذا المحتوى هنا",

    tabAppViewer: "عارض التطبيق",

    tabEdit: "تعديل",

    tabFiles: "الملفات",

    tabAnalysis: "التحليل",

    tabTerminal: "المحطة الطرفية",

    tabPlanner: "المخطط",

    tabBrowser: "المتصفح",

    tabNotebook: "دفتر الملاحظات",

    more: "المزيد",

    console: "وحدة التحكم",

    terminalNotActivated: "المحطة الطرفية غير مفعلة بعد.",

    plannerNotActivated: "المخطط غير مفعل بعد.",

    browserNotActivated: "المتصفح غير مفعل بعد.",

    notebookNotActivated: "دفتر الملاحظات غير مفعل بعد.",

    // Settings
    settings: "الإعدادات",

    profile: "الملف الشخصي",

    editProfile: "تعديل الملف الشخصي",

    appearance: "المظهر",

    helpCenter: "مركز المساعدة",

    homepage: "الصفحة الرئيسية",

    signOut: "تسجيل الخروج",

    domains: "النطاقات",

    people: "الأشخاص",

    general: "عام",

    connectors: "الاتصالات",

    plansCredits: "الخطط والرصيد",

    cloudAI: "السحابة والذكاء الاصطناعي",

    account: "الحساب",

    preference: "التفضيلات",

    // Account Settings
    accountSettings: "إعدادات الحساب",

    manageAccount: "إدارة حالة حسابك وحذف الحساب نهائيًا.",

    accountStatus: "حالة الحساب",

    accountActive: "حسابك نشط حاليًا.",

    accountDeactivated: "حسابك غير مفعل حاليًا.",

    deactivateAccount: "تعطيل الحساب",

    activateAccount: "تفعيل الحساب",

    accountActivated: "تم تفعيل حسابك.",

    accountDeactivatedSuccess: "تم تعطيل حسابك.",

    deleteAccount: "حذف الحساب",

    deleteAccountConfirm:
      "هل أنت متأكد من حذف حسابك نهائيًا؟ لا يمكن التراجع عن هذا الإجراء.",

    deleting: "جارٍ الحذف...",

    // Workspace Members
    inviteMembers: "دعوة أعضاء مساحة العمل",

    inviteWorkspaceMembers: "دعوة أعضاء مساحة العمل",

    upgradeInvite: "قم بالترقية لدعوة أعضاء والتعاون على جميع المشاريع.",

    upgradeToInviteMembers: "قم بالترقية لدعوة أعضاء",

    addEmails: "إضافة بريد إلكتروني",

    // Cloud & AI
    connect: "ربط",

    connectServiceData: "اربط {{name}} لإدارة خدماتك وبيانات مشروعك.",

    cloudBalance: "السحابة $25.00 / $25.00",

    aiBalance: "الذكاء الاصطناعي $1.00 / $1.00",

    cloudWarning: "رصيد Cloud & AI مهم للحفاظ على تشغيل مشاريعك المنشورة.",

    defaultModel: "النموذج الافتراضي",

    permissions: "الصلاحيات",

    public: "عام",

    setDefaultAccess: "تحديد الوصول الافتراضي للمشاريع",

    creditReminder: "تذكير الرصيد",

    showCredits: "إظهار الرصيد المتبقي",

    // Theme
    theme: "المظهر",

    customizeTheme: "تخصيص شكل Atoms على جهازك.",

    customizeAppearance: "خصص شكل Atoms على جهازك.",

    system: "النظام",

    light: "فاتح",

    dark: "داكن",

    // Other
    language: "اللغة",

    changeLanguage: "تغيير اللغة المستخدمة في واجهة المستخدم.",

    avatar: "الصورة الشخصية",

    username: "اسم المستخدم",

    email: "البريد الإلكتروني",

    publicProjects: "المشاريع العامة",

    saved: "المحفوظات",

    otherProjects: "مشاريع أخرى",

    notPublished: "لم يتم نشر المشروع بعد",

    upgradeSubscription: "قم بترقية اشتراكك",

    planPayment: "الخطة والدفع",

    unlockFeatures: "فتح المزيد من الميزات",

    month: "شهر",

    free: "مجاني",

    pro: "احترافي",

    max: "ماكس",

    speechNotSupported: "التعرف على الصوت غير مدعوم.",

    aiResponse: "وصلت فكرتك. سأساعدك في تنفيذها خطوة بخطوة.",

    pleaseWait: "يرجى الانتظار...",

    somethingWrong: "حدث خطأ ما. حاول مرة أخرى.",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (key) => translations[language]?.[key] ?? translations.en[key] ?? key,
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useTranslation must be used inside LanguageProvider");
  }

  return context;
}
