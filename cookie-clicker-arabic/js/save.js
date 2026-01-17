/**
 * Cookie Clicker Arabic - نظام الحفظ والتحميل
 * يدير حفظ وتحميل بيانات اللعبة
 */

const SaveSystem = {
    /**
     * حفظ اللعبة
     */
    save: function() {
        const saveData = {
            version: CONFIG.GAME.VERSION,
            timestamp: Date.now(),
            cookies: Game.cookies,
            totalCookies: Game.totalCookies,
            clicks: Game.clicks,
            upgrades: Game.upgrades,
            achievements: Game.unlockedAchievements,
            stats: Game.stats,
            maxClickSpeed: Game.maxClickSpeed,
            goldenStats: typeof GoldenCookie !== 'undefined' ? GoldenCookie.getStats() : null,
            prestige: typeof Prestige !== 'undefined' ? Prestige.getSaveData() : null
        };

        try {
            localStorage.setItem(CONFIG.SAVE.KEY, JSON.stringify(saveData));
            console.log('✅ تم حفظ اللعبة');
            return true;
        } catch (e) {
            console.error('❌ خطأ في حفظ اللعبة:', e);
            return false;
        }
    },

    /**
     * تحميل اللعبة
     */
    load: function() {
        try {
            const saveData = localStorage.getItem(CONFIG.SAVE.KEY);
            
            if (!saveData) {
                console.log('📝 لا يوجد حفظ سابق، بدء لعبة جديدة');
                return null;
            }

            const data = JSON.parse(saveData);
            console.log('✅ تم تحميل اللعبة');
            return data;
        } catch (e) {
            console.error('❌ خطأ في تحميل اللعبة:', e);
            return null;
        }
    },

    /**
     * حذف الحفظ
     */
    deleteSave: function() {
        try {
            localStorage.removeItem(CONFIG.SAVE.KEY);
            console.log('🗑️ تم حذف الحفظ');
            return true;
        } catch (e) {
            console.error('❌ خطأ في حذف الحفظ:', e);
            return false;
        }
    },

    /**
     * تصدير الحفظ كنص
     */
    exportSave: function() {
        const saveData = localStorage.getItem(CONFIG.SAVE.KEY);
        if (saveData) {
            return btoa(saveData); // تشفير Base64
        }
        return null;
    },

    /**
     * استيراد حفظ من نص
     */
    importSave: function(encodedData) {
        try {
            const saveData = atob(encodedData); // فك تشفير Base64
            const data = JSON.parse(saveData);
            
            // التحقق من صحة البيانات
            if (data.cookies !== undefined && data.upgrades !== undefined) {
                localStorage.setItem(CONFIG.SAVE.KEY, saveData);
                return true;
            }
            return false;
        } catch (e) {
            console.error('❌ خطأ في استيراد الحفظ:', e);
            return false;
        }
    },

    /**
     * بدء الحفظ التلقائي
     */
    startAutoSave: function() {
        if (CONFIG.SAVE.AUTO_SAVE) {
            setInterval(() => {
                this.save();
            }, CONFIG.GAME.SAVE_INTERVAL);
            console.log('🔄 تم تفعيل الحفظ التلقائي');
        }
    }
};
