/**
 * Cookie Clicker Arabic - واجهة المستخدم
 * يدير تحديث وعرض عناصر الواجهة
 */

const UI = {
    // عناصر DOM
    elements: {},

    /**
     * تهيئة عناصر الواجهة
     */
    init: function() {
        this.elements = {
            cookie: document.getElementById('cookie'),
            cookieCount: document.getElementById('cookie-count'),
            cpsDisplay: document.getElementById('cps-display'),
            shopContainer: document.getElementById('shop-container'),
            achievementsContainer: document.getElementById('achievements-container'),
            achievementsCount: document.getElementById('achievements-count'),
            statsContainer: document.getElementById('stats-container'),
            notificationContainer: document.getElementById('notification-container'),
            clickEffect: document.getElementById('click-effect')
        };
    },

    /**
     * تحديث عرض الكوكيز
     */
    updateCookieDisplay: function() {
        if (this.elements.cookieCount) {
            this.elements.cookieCount.textContent = this.formatNumber(Math.floor(Game.cookies));
        }
        if (this.elements.cpsDisplay) {
            this.elements.cpsDisplay.textContent = `${this.formatNumber(Shop.getTotalCps())} كوكيز/ثانية`;
        }
    },

    /**
     * تحديث المتجر
     */
    updateShop: function() {
        if (!this.elements.shopContainer) return;

        this.elements.shopContainer.innerHTML = '';

        UPGRADES_DATA.forEach(upgrade => {
            const price = Shop.getPrice(upgrade.id);
            const owned = Shop.getOwned(upgrade.id);
            const canAfford = Shop.canAfford(upgrade.id);
            const cps = upgrade.baseCps;

            const item = document.createElement('div');
            item.className = `shop-item ${canAfford ? 'affordable' : 'expensive'}`;
            item.onclick = () => Shop.buyUpgrade(upgrade.id);

            item.innerHTML = `
                <div class="shop-item-icon">${upgrade.icon}</div>
                <div class="shop-item-info">
                    <div class="shop-item-name">${upgrade.name}</div>
                    <div class="shop-item-desc">${upgrade.description}</div>
                    <div class="shop-item-cps">+${cps} كوكيز/ثانية</div>
                </div>
                <div class="shop-item-right">
                    <div class="shop-item-price">${this.formatNumber(price)} 🍪</div>
                    <div class="shop-item-owned">${owned}</div>
                </div>
            `;

            this.elements.shopContainer.appendChild(item);
        });
    },

    /**
     * تحديث الإنجازات
     */
    updateAchievements: function() {
        if (!this.elements.achievementsContainer) return;

        // تحديث العداد
        if (this.elements.achievementsCount) {
            this.elements.achievementsCount.textContent = 
                `${Achievements.getUnlockedCount()}/${Achievements.getTotalCount()}`;
        }

        this.elements.achievementsContainer.innerHTML = '';

        ACHIEVEMENTS_DATA.forEach(achievement => {
            const isUnlocked = Achievements.isUnlocked(achievement.id);

            const item = document.createElement('div');
            item.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;

            item.innerHTML = `
                <div class="achievement-icon">${isUnlocked ? achievement.icon : '🔒'}</div>
                <div class="achievement-info">
                    <div class="achievement-name">${isUnlocked ? achievement.name : '???'}</div>
                    <div class="achievement-desc">${isUnlocked ? achievement.description : 'إنجاز مخفي'}</div>
                </div>
            `;

            this.elements.achievementsContainer.appendChild(item);
        });
    },

    /**
     * تحديث الإحصائيات
     */
    updateStats: function() {
        if (!this.elements.statsContainer) return;

        this.elements.statsContainer.innerHTML = `
            <div class="stat-item">
                <span class="stat-label">إجمالي الكوكيز:</span>
                <span class="stat-value">${this.formatNumber(Game.totalCookies)}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">عدد النقرات:</span>
                <span class="stat-value">${this.formatNumber(Game.clicks)}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">إجمالي الترقيات:</span>
                <span class="stat-value">${Game.stats.totalUpgrades}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">الإنجازات:</span>
                <span class="stat-value">${Achievements.getUnlockedCount()}/${Achievements.getTotalCount()}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">الإنتاج/ثانية:</span>
                <span class="stat-value">${this.formatNumber(Shop.getTotalCps())}</span>
            </div>
        `;
    },

    /**
     * إظهار تأثير النقر
     */
    showClickEffect: function(x, y, value) {
        const effect = document.createElement('div');
        effect.className = 'click-value';
        effect.textContent = `+${value}`;
        effect.style.left = `${x}px`;
        effect.style.top = `${y}px`;
        
        document.body.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, CONFIG.CLICK.ANIMATION_DURATION);
    },

    /**
     * إظهار إشعار
     */
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        if (this.elements.notificationContainer) {
            this.elements.notificationContainer.appendChild(notification);
        } else {
            document.body.appendChild(notification);
        }

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, CONFIG.NOTIFICATIONS.DURATION);
    },

    /**
     * إظهار إشعار إنجاز
     */
    showAchievementNotification: function(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-notification-icon">${achievement.icon}</div>
            <div class="achievement-notification-text">
                <div class="achievement-notification-title">إنجاز جديد!</div>
                <div class="achievement-notification-name">${achievement.name}</div>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    },

    /**
     * تنسيق الأرقام الكبيرة
     */
    formatNumber: function(num) {
        if (num >= 1e15) return (num / 1e15).toFixed(2) + ' كوادريليون';
        if (num >= 1e12) return (num / 1e12).toFixed(2) + ' تريليون';
        if (num >= 1e9) return (num / 1e9).toFixed(2) + ' مليار';
        if (num >= 1e6) return (num / 1e6).toFixed(2) + ' مليون';
        if (num >= 1e3) return (num / 1e3).toFixed(2) + ' ألف';
        return Math.floor(num).toLocaleString('ar-EG');
    },

    /**
     * تحديث كل شيء
     */
    updateAll: function() {
        this.updateCookieDisplay();
        this.updateShop();
        this.updateAchievements();
        this.updateStats();
    }
};
