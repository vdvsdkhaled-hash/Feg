/**
 * Cookie Clicker Arabic - نظام المتجر
 * يدير شراء الترقيات وحساب الأسعار
 */

const Shop = {
    /**
     * حساب سعر الترقية
     */
    getPrice: function(upgradeId) {
        const upgradeData = UPGRADES_DATA.find(u => u.id === upgradeId);
        if (!upgradeData) return 0;

        const owned = Game.upgrades[upgradeId] || 0;
        return Math.floor(upgradeData.basePrice * Math.pow(CONFIG.SHOP.PRICE_MULTIPLIER, owned));
    },

    /**
     * حساب الإنتاج لترقية معينة
     */
    getCps: function(upgradeId) {
        const upgradeData = UPGRADES_DATA.find(u => u.id === upgradeId);
        if (!upgradeData) return 0;

        const owned = Game.upgrades[upgradeId] || 0;
        return upgradeData.baseCps * owned;
    },

    /**
     * حساب إجمالي الإنتاج في الثانية
     */
    getTotalCps: function() {
        let totalCps = 0;
        UPGRADES_DATA.forEach(upgrade => {
            totalCps += this.getCps(upgrade.id);
        });
        return totalCps;
    },

    /**
     * شراء ترقية
     */
    buyUpgrade: function(upgradeId) {
        const price = this.getPrice(upgradeId);
        
        if (Game.cookies >= price) {
            Game.cookies -= price;
            Game.upgrades[upgradeId] = (Game.upgrades[upgradeId] || 0) + 1;
            
            // تحديث الإحصائيات
            Game.stats.totalUpgrades++;
            
            // تحديث الواجهة
            UI.updateCookieDisplay();
            UI.updateShop();
            UI.updateStats();
            
            // التحقق من الإنجازات
            Achievements.check();
            
            // إظهار إشعار
            const upgradeData = UPGRADES_DATA.find(u => u.id === upgradeId);
            UI.showNotification(`تم شراء ${upgradeData.name}!`, 'success');
            
            return true;
        } else {
            UI.showNotification('لا يوجد كوكيز كافي!', 'error');
            return false;
        }
    },

    /**
     * التحقق من إمكانية الشراء
     */
    canAfford: function(upgradeId) {
        return Game.cookies >= this.getPrice(upgradeId);
    },

    /**
     * الحصول على عدد الترقيات المملوكة
     */
    getOwned: function(upgradeId) {
        return Game.upgrades[upgradeId] || 0;
    },

    /**
     * الحصول على إجمالي الترقيات
     */
    getTotalOwned: function() {
        let total = 0;
        Object.values(Game.upgrades).forEach(count => {
            total += count;
        });
        return total;
    }
};
