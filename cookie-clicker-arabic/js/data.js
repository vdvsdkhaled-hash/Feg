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
    }
];

// تجميد البيانات
Object.freeze(UPGRADES_DATA);
Object.freeze(ACHIEVEMENTS_DATA);
