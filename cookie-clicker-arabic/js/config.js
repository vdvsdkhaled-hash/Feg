/**
 * Cookie Clicker Arabic - ملف الإعدادات
 * هذا الملف يحتوي على جميع إعدادات اللعبة
 */

const CONFIG = {
    // إعدادات اللعبة الأساسية
    GAME: {
        NAME: 'Cookie Clicker بالعربي',
        VERSION: '2.0.0',
        SAVE_INTERVAL: 30000, // حفظ كل 30 ثانية
        TICK_INTERVAL: 100,   // تحديث كل 100 مللي ثانية
    },

    // إعدادات النقر
    CLICK: {
        BASE_VALUE: 1,        // قيمة النقرة الأساسية
        ANIMATION_DURATION: 500, // مدة أنيميشن النقر
    },

    // إعدادات المتجر
    SHOP: {
        PRICE_MULTIPLIER: 1.15, // معامل زيادة السعر
    },

    // إعدادات الحفظ
    SAVE: {
        KEY: 'cookieClickerArabic_save',
        AUTO_SAVE: true,
    },

    // إعدادات الإشعارات
    NOTIFICATIONS: {
        DURATION: 3000, // مدة ظهور الإشعار
    },

    // إعدادات الشاشة (Realme C25Y)
    SCREEN: {
        WIDTH: 720,
        HEIGHT: 1600,
    }
};

// تجميد الإعدادات لمنع التعديل
Object.freeze(CONFIG);
Object.freeze(CONFIG.GAME);
Object.freeze(CONFIG.CLICK);
Object.freeze(CONFIG.SHOP);
Object.freeze(CONFIG.SAVE);
Object.freeze(CONFIG.NOTIFICATIONS);
Object.freeze(CONFIG.SCREEN);
