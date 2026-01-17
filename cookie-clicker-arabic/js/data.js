/**
 * Cookie Clicker Arabic - ملف البيانات
 * يحتوي على بيانات الترقيات والإنجازات
 */

// بيانات الترقيات
const UPGRADES_DATA = [
    {
        id: 'cursor',
        name: 'المؤشر',
        description: 'ينقر تلقائياً على الكوكيز',
        basePrice: 15,
        baseCps: 0.1, // كوكيز في الثانية
        icon: '👆'
    },
    {
        id: 'grandma',
        name: 'الجدة',
        description: 'جدة لطيفة تخبز الكوكيز',
        basePrice: 100,
        baseCps: 1,
        icon: '👵'
    },
    {
        id: 'farm',
        name: 'المزرعة',
        description: 'تزرع شجر الكوكيز',
        basePrice: 1100,
        baseCps: 8,
        icon: '🌾'
    },
    {
        id: 'mine',
        name: 'المنجم',
        description: 'يستخرج عجينة الكوكيز من الأرض',
        basePrice: 12000,
        baseCps: 47,
        icon: '⛏️'
    },
    {
        id: 'factory',
        name: 'المصنع',
        description: 'ينتج الكوكيز بكميات ضخمة',
        basePrice: 130000,
        baseCps: 260,
        icon: '🏭'
    },
    {
        id: 'bank',
        name: 'البنك',
        description: 'يولد الكوكيز من الفوائد',
        basePrice: 1400000,
        baseCps: 1400,
        icon: '🏦'
    },
    {
        id: 'temple',
        name: 'المعبد',
        description: 'يصلي من أجل المزيد من الكوكيز',
        basePrice: 20000000,
        baseCps: 7800,
        icon: '🛕'
    },
    {
        id: 'wizard',
        name: 'برج السحر',
        description: 'يستحضر الكوكيز بالسحر',
        basePrice: 330000000,
        baseCps: 44000,
        icon: '🧙'
    },
    {
        id: 'shipment',
        name: 'السفينة الفضائية',
        description: 'تجلب الكوكيز من الفضاء الخارجي',
        basePrice: 5100000000,
        baseCps: 260000,
        icon: '🚀'
    },
    {
        id: 'alchemy',
        name: 'مختبر الكيمياء',
        description: 'يحول الذهب إلى كوكيز',
        basePrice: 75000000000,
        baseCps: 1600000,
        icon: '⚗️'
    },
    {
        id: 'portal',
        name: 'البوابة',
        description: 'تفتح بوابة لعالم الكوكيز',
        basePrice: 1000000000000,
        baseCps: 10000000,
        icon: '🌀'
    },
    {
        id: 'timemachine',
        name: 'آلة الزمن',
        description: 'تجلب الكوكيز من الماضي',
        basePrice: 14000000000000,
        baseCps: 65000000,
        icon: '⏰'
    },
    {
        id: 'antimatter',
        name: 'مكثف المادة المضادة',
        description: 'يحول المادة المضادة إلى كوكيز',
        basePrice: 170000000000000,
        baseCps: 430000000,
        icon: '⚛️'
    }
];

// بيانات الإنجازات
const ACHIEVEMENTS_DATA = [
    // إنجازات عدد الكوكيز
    {
        id: 'first_cookie',
        name: 'أول كوكيز',
        description: 'اصنع أول كوكيز',
        requirement: { type: 'cookies', value: 1 },
        icon: '🍪'
    },
    {
        id: 'beginner',
        name: 'مبتدئ',
        description: 'اصنع 100 كوكيز',
        requirement: { type: 'cookies', value: 100 },
        icon: '🥉'
    },
    {
        id: 'amateur',
        name: 'هاوي',
        description: 'اصنع 1,000 كوكيز',
        requirement: { type: 'cookies', value: 1000 },
        icon: '🥈'
    },
    {
        id: 'professional',
        name: 'محترف',
        description: 'اصنع 10,000 كوكيز',
        requirement: { type: 'cookies', value: 10000 },
        icon: '🥇'
    },
    {
        id: 'expert',
        name: 'خبير',
        description: 'اصنع 100,000 كوكيز',
        requirement: { type: 'cookies', value: 100000 },
        icon: '🏆'
    },
    {
        id: 'legend',
        name: 'أسطورة',
        description: 'اصنع 1,000,000 كوكيز',
        requirement: { type: 'cookies', value: 1000000 },
        icon: '👑'
    },
    {
        id: 'mythical',
        name: 'أسطوري',
        description: 'اصنع 100,000,000 كوكيز',
        requirement: { type: 'cookies', value: 100000000 },
        icon: '⭐'
    },
    {
        id: 'godlike',
        name: 'إلهي',
        description: 'اصنع 1,000,000,000 كوكيز',
        requirement: { type: 'cookies', value: 1000000000 },
        icon: '🌟'
    },

    // إنجازات النقر
    {
        id: 'clicker_1',
        name: 'نقرة واحدة',
        description: 'انقر 100 مرة',
        requirement: { type: 'clicks', value: 100 },
        icon: '👆'
    },
    {
        id: 'clicker_2',
        name: 'نقّار',
        description: 'انقر 1,000 مرة',
        requirement: { type: 'clicks', value: 1000 },
        icon: '✌️'
    },
    {
        id: 'clicker_3',
        name: 'نقّار محترف',
        description: 'انقر 10,000 مرة',
        requirement: { type: 'clicks', value: 10000 },
        icon: '🖐️'
    },

    // إنجازات الترقيات
    {
        id: 'first_upgrade',
        name: 'أول ترقية',
        description: 'اشترِ أول ترقية',
        requirement: { type: 'totalUpgrades', value: 1 },
        icon: '🛒'
    },
    {
        id: 'collector',
        name: 'جامع',
        description: 'اشترِ 10 ترقيات',
        requirement: { type: 'totalUpgrades', value: 10 },
        icon: '📦'
    },
    {
        id: 'hoarder',
        name: 'مكتنز',
        description: 'اشترِ 50 ترقية',
        requirement: { type: 'totalUpgrades', value: 50 },
        icon: '🏪'
    },
    {
        id: 'industrialist',
        name: 'صناعي',
        description: 'اشترِ 100 ترقية',
        requirement: { type: 'totalUpgrades', value: 100 },
        icon: '🏭'
    },

    // إنجازات الكوكيز الذهبي
    {
        id: 'golden_1',
        name: 'لمسة ذهبية',
        description: 'انقر على أول كوكيز ذهبي',
        requirement: { type: 'goldenClicked', value: 1 },
        icon: '🌟'
    },
    {
        id: 'golden_7',
        name: 'صياد الذهب',
        description: 'انقر على 7 كوكيز ذهبي',
        requirement: { type: 'goldenClicked', value: 7 },
        icon: '💫'
    },
    {
        id: 'golden_27',
        name: 'ملك الذهب',
        description: 'انقر على 27 كوكيز ذهبي',
        requirement: { type: 'goldenClicked', value: 27 },
        icon: '👑'
    },

    // إنجازات الكوكيز الكبيرة
    {
        id: 'trillion',
        name: 'تريليونير',
        description: 'اصنع 1,000,000,000,000 كوكيز',
        requirement: { type: 'cookies', value: 1000000000000 },
        icon: '💎'
    },
    {
        id: 'quadrillion',
        name: 'كوادريليونير',
        description: 'اصنع 1,000,000,000,000,000 كوكيز',
        requirement: { type: 'cookies', value: 1000000000000000 },
        icon: '🌌'
    },

    // إنجازات الإنتاج
    {
        id: 'cps_100',
        name: 'منتج',
        description: 'أنتج 100 كوكيز في الثانية',
        requirement: { type: 'cps', value: 100 },
        icon: '⚡'
    },
    {
        id: 'cps_10000',
        name: 'مصنع كوكيز',
        description: 'أنتج 10,000 كوكيز في الثانية',
        requirement: { type: 'cps', value: 10000 },
        icon: '🔥'
    },
    {
        id: 'cps_1000000',
        name: 'إمبراطورية الكوكيز',
        description: 'أنتج 1,000,000 كوكيز في الثانية',
        requirement: { type: 'cps', value: 1000000 },
        icon: '🏰'
    },

    // إنجازات خاصة
    {
        id: 'speed_clicker',
        name: 'نقّار سريع',
        description: 'انقر 15 مرة في ثانية واحدة',
        requirement: { type: 'clickSpeed', value: 15 },
        icon: '⚡'
    },
    {
        id: 'patient',
        name: 'صبور',
        description: 'العب لمدة ساعة',
        requirement: { type: 'playTime', value: 3600 },
        icon: '⏳'
    },
    {
        id: 'dedicated',
        name: 'مخلص',
        description: 'العب لمدة 10 ساعات',
        requirement: { type: 'playTime', value: 36000 },
        icon: '🎖️'
    }
];

// تجميد البيانات
Object.freeze(UPGRADES_DATA);
Object.freeze(ACHIEVEMENTS_DATA);
