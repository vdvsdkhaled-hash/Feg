/**
 * Cookie Clicker Arabic - نظام البريستيج
 * يدير إعادة البدء مع مكافآت دائمة
 */

const Prestige = {
    // إعدادات البريستيج
    settings: {
        minCookiesForPrestige: 1000000000, // مليار كوكيز للبريستيج الأول
        chipMultiplier: 0.01, // كل شريحة تعطي 1% زيادة
    },

    // حالة البريستيج
    heavenlyChips: 0,        // الشرائح السماوية المكتسبة
    spentChips: 0,           // الشرائح المستخدمة
    prestigeLevel: 0,        // مستوى البريستيج
    unlockedUpgrades: [],    // ترقيات البريستيج المفتوحة

    // ترقيات البريستيج المتاحة
    prestigeUpgrades: [
        {
            id: 'heavenly_cookies',
            name: 'كوكيز سماوي',
            description: 'تبدأ بـ 10 كوكيز لكل شريحة سماوية',
            cost: 1,
            effect: { type: 'startingCookies', value: 10 },
            icon: '☁️'
        },
        {
            id: 'heavenly_luck',
            name: 'حظ سماوي',
            description: 'الكوكيز الذهبي يظهر 10% أسرع',
            cost: 5,
            effect: { type: 'goldenSpawnRate', value: 0.9 },
            icon: '🍀'
        },
        {
            id: 'twin_gates',
            name: 'البوابات التوأم',
            description: 'مضاعفة إنتاج البوابات',
            cost: 10,
            effect: { type: 'upgradeMultiplier', upgradeId: 'portal', value: 2 },
            icon: '🌀'
        },
        {
            id: 'heavenly_growth',
            name: 'نمو سماوي',
            description: '+5% إنتاج لكل مستوى بريستيج',
            cost: 25,
            effect: { type: 'prestigeBonus', value: 0.05 },
            icon: '📈'
        },
        {
            id: 'starter_kit',
            name: 'حزمة البداية',
            description: 'تبدأ بـ 10 مؤشرات مجاناً',
            cost: 50,
            effect: { type: 'startingUpgrade', upgradeId: 'cursor', value: 10 },
            icon: '📦'
        },
        {
            id: 'golden_switch',
            name: 'المفتاح الذهبي',
            description: 'الكوكيز الذهبي يعطي مكافآت أكبر بـ 50%',
            cost: 100,
            effect: { type: 'goldenBonus', value: 1.5 },
            icon: '🔑'
        },
        {
            id: 'persistent_memory',
            name: 'ذاكرة دائمة',
            description: 'تحتفظ بـ 10% من الكوكيز عند البريستيج',
            cost: 200,
            effect: { type: 'cookieRetention', value: 0.1 },
            icon: '🧠'
        },
        {
            id: 'heavenly_multiplier',
            name: 'المضاعف السماوي',
            description: 'مضاعفة تأثير الشرائح السماوية',
            cost: 500,
            effect: { type: 'chipMultiplier', value: 2 },
            icon: '✨'
        }
    ],

    /**
     * تهيئة نظام البريستيج
     */
    init: function() {
        console.log('👑 تم تفعيل نظام البريستيج');
    },

    /**
     * حساب الشرائح السماوية المحتملة
     */
    calculatePotentialChips: function() {
        const cookies = Game.totalCookies;
        if (cookies < this.settings.minCookiesForPrestige) return 0;
        
        // صيغة حساب الشرائح: الجذر التربيعي للكوكيز / مليون
        return Math.floor(Math.sqrt(cookies / 1000000));
    },

    /**
     * الحصول على الشرائح الجديدة عند البريستيج
     */
    getNewChips: function() {
        const potential = this.calculatePotentialChips();
        return Math.max(0, potential - this.heavenlyChips);
    },

    /**
     * التحقق من إمكانية البريستيج
     */
    canPrestige: function() {
        return this.getNewChips() > 0;
    },

    /**
     * تنفيذ البريستيج
     */
    doPrestige: function() {
        if (!this.canPrestige()) {
            UI.showNotification('تحتاج المزيد من الكوكيز للبريستيج!', 'error');
            return false;
        }

        const newChips = this.getNewChips();
        
        if (!confirm(`هل تريد البريستيج؟\n\nستحصل على ${newChips} شريحة سماوية جديدة.\nسيتم إعادة تعيين تقدمك ولكن ستحتفظ بالشرائح والترقيات السماوية.`)) {
            return false;
        }

        // حفظ الكوكيز المحتفظ بها (إن وجدت الترقية)
        let retainedCookies = 0;
        if (this.hasUpgrade('persistent_memory')) {
            retainedCookies = Game.cookies * 0.1;
        }

        // إضافة الشرائح الجديدة
        this.heavenlyChips += newChips;
        this.prestigeLevel++;

        // إعادة تعيين اللعبة
        this.softReset(retainedCookies);

        UI.showNotification(`🎉 بريستيج! حصلت على ${newChips} شريحة سماوية`, 'golden');
        
        return true;
    },

    /**
     * إعادة تعيين ناعمة (مع الاحتفاظ بالبريستيج)
     */
    softReset: function(startingCookies = 0) {
        // حساب الكوكيز البدائية من الترقيات
        if (this.hasUpgrade('heavenly_cookies')) {
            startingCookies += this.heavenlyChips * 10;
        }

        // إعادة تعيين القيم الأساسية
        Game.cookies = startingCookies;
        Game.totalCookies = startingCookies;
        Game.clicks = 0;
        Game.upgrades = {};
        Game.stats.totalUpgrades = 0;

        // تطبيق ترقية حزمة البداية
        if (this.hasUpgrade('starter_kit')) {
            Game.upgrades['cursor'] = 10;
            Game.stats.totalUpgrades = 10;
        }

        // إعادة تعيين المضاعفات
        Game.clickMultiplier = 1;
        Game.productionMultiplier = 1;

        // تحديث الواجهة
        UI.updateAll();
        SaveSystem.save();
    },

    /**
     * حساب مضاعف البريستيج
     */
    getPrestigeMultiplier: function() {
        let multiplier = 1;
        
        // المضاعف الأساسي من الشرائح
        const availableChips = this.heavenlyChips - this.spentChips;
        let chipBonus = this.settings.chipMultiplier;
        
        // مضاعفة تأثير الشرائح
        if (this.hasUpgrade('heavenly_multiplier')) {
            chipBonus *= 2;
        }
        
        multiplier += availableChips * chipBonus;

        // مكافأة النمو السماوي
        if (this.hasUpgrade('heavenly_growth')) {
            multiplier += this.prestigeLevel * 0.05;
        }

        return multiplier;
    },

    /**
     * شراء ترقية بريستيج
     */
    buyUpgrade: function(upgradeId) {
        const upgrade = this.prestigeUpgrades.find(u => u.id === upgradeId);
        if (!upgrade) return false;

        if (this.hasUpgrade(upgradeId)) {
            UI.showNotification('هذه الترقية مفتوحة بالفعل!', 'error');
            return false;
        }

        const availableChips = this.heavenlyChips - this.spentChips;
        if (availableChips < upgrade.cost) {
            UI.showNotification('لا يوجد شرائح كافية!', 'error');
            return false;
        }

        this.spentChips += upgrade.cost;
        this.unlockedUpgrades.push(upgradeId);

        UI.showNotification(`تم شراء: ${upgrade.name}`, 'success');
        this.applyUpgradeEffect(upgrade);
        
        return true;
    },

    /**
     * التحقق من امتلاك ترقية
     */
    hasUpgrade: function(upgradeId) {
        return this.unlockedUpgrades.includes(upgradeId);
    },

    /**
     * تطبيق تأثير الترقية
     */
    applyUpgradeEffect: function(upgrade) {
        // التأثيرات تُطبق تلقائياً عند الحاجة
        console.log(`✨ تم تفعيل: ${upgrade.name}`);
    },

    /**
     * الحصول على الشرائح المتاحة
     */
    getAvailableChips: function() {
        return this.heavenlyChips - this.spentChips;
    },

    /**
     * تحميل بيانات البريستيج
     */
    loadData: function(data) {
        if (data) {
            this.heavenlyChips = data.heavenlyChips || 0;
            this.spentChips = data.spentChips || 0;
            this.prestigeLevel = data.prestigeLevel || 0;
            this.unlockedUpgrades = data.unlockedUpgrades || [];
        }
    },

    /**
     * الحصول على بيانات البريستيج للحفظ
     */
    getSaveData: function() {
        return {
            heavenlyChips: this.heavenlyChips,
            spentChips: this.spentChips,
            prestigeLevel: this.prestigeLevel,
            unlockedUpgrades: this.unlockedUpgrades
        };
    }
};
