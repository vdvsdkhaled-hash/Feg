/**
 * Cookie Clicker Arabic - منطق اللعبة الأساسي
 * يدير حالة اللعبة والحلقة الرئيسية
 */

const Game = {
    // حالة اللعبة
    cookies: 0,
    totalCookies: 0,
    clicks: 0,
    clickValue: 1,
    upgrades: {},
    unlockedAchievements: [],
    stats: {
        totalUpgrades: 0,
        startTime: Date.now(),
        goldenClicked: 0,
        goldenMissed: 0
    },

    // مضاعفات
    clickMultiplier: 1,
    productionMultiplier: 1,

    // تتبع سرعة النقر
    clickTimestamps: [],
    maxClickSpeed: 0,

    // متغيرات داخلية
    lastTick: Date.now(),
    isRunning: false,

    /**
     * تهيئة اللعبة
     */
    init: function() {
        console.log('🍪 بدء تشغيل Cookie Clicker بالعربي');
        
        // تهيئة واجهة المستخدم
        UI.init();
        
        // تحميل الحفظ السابق
        this.loadGame();
        
        // تحديث الواجهة
        UI.updateAll();
        
        // بدء حلقة اللعبة
        this.startGameLoop();
        
        // بدء الحفظ التلقائي
        SaveSystem.startAutoSave();
        
        // إضافة مستمعي الأحداث
        this.setupEventListeners();
        
        // تشغيل نظام الكوكيز الذهبي
        if (typeof GoldenCookie !== 'undefined') {
            GoldenCookie.init();
        }
        
        console.log('✅ تم تشغيل اللعبة بنجاح');
    },

    /**
     * إعداد مستمعي الأحداث
     */
    setupEventListeners: function() {
        // النقر على الكوكيز
        const cookie = document.getElementById('cookie');
        if (cookie) {
            cookie.addEventListener('click', (e) => this.handleClick(e));
            cookie.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleClick(e.touches[0]);
            });
        }

        // حفظ عند إغلاق الصفحة
        window.addEventListener('beforeunload', () => {
            SaveSystem.save();
        });

        // أزرار القائمة
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
    },

    /**
     * معالجة النقر
     */
    handleClick: function(e) {
        // حساب قيمة النقرة مع المضاعفات
        const actualClickValue = this.clickValue * this.clickMultiplier;
        
        // زيادة الكوكيز
        this.cookies += actualClickValue;
        this.totalCookies += actualClickValue;
        this.clicks++;

        // تتبع سرعة النقر
        const now = Date.now();
        this.clickTimestamps.push(now);
        // الاحتفاظ فقط بالنقرات في آخر ثانية
        this.clickTimestamps = this.clickTimestamps.filter(t => now - t < 1000);
        if (this.clickTimestamps.length > this.maxClickSpeed) {
            this.maxClickSpeed = this.clickTimestamps.length;
        }

        // تأثير النقر
        const rect = document.getElementById('cookie').getBoundingClientRect();
        const x = e.clientX || (rect.left + rect.width / 2);
        const y = e.clientY || (rect.top + rect.height / 2);
        UI.showClickEffect(x, y, actualClickValue);

        // أنيميشن الكوكيز
        const cookie = document.getElementById('cookie');
        cookie.classList.add('clicked');
        setTimeout(() => cookie.classList.remove('clicked'), 100);

        // تحديث العرض
        UI.updateCookieDisplay();

        // التحقق من الإنجازات
        Achievements.check();
    },

    /**
     * بدء حلقة اللعبة
     */
    startGameLoop: function() {
        this.isRunning = true;
        this.lastTick = Date.now();
        this.gameLoop();
    },

    /**
     * حلقة اللعبة الرئيسية
     */
    gameLoop: function() {
        if (!this.isRunning) return;

        const now = Date.now();
        const delta = (now - this.lastTick) / 1000; // بالثواني
        this.lastTick = now;

        // إضافة الكوكيز من الإنتاج التلقائي مع المضاعف
        const baseCps = Shop.getTotalCps();
        const actualCps = baseCps * this.productionMultiplier;
        if (actualCps > 0) {
            const earned = actualCps * delta;
            this.cookies += earned;
            this.totalCookies += earned;
        }

        // تحديث العرض
        UI.updateCookieDisplay();

        // الاستمرار في الحلقة
        requestAnimationFrame(() => this.gameLoop());
    },

    /**
     * تبديل التبويبات
     */
    switchTab: function(tabName) {
        // إخفاء جميع المحتويات
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // إزالة التفعيل من جميع الأزرار
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // إظهار المحتوى المطلوب
        const content = document.getElementById(`${tabName}-tab`);
        if (content) {
            content.classList.add('active');
        }

        // تفعيل الزر
        const btn = document.querySelector(`[data-tab="${tabName}"]`);
        if (btn) {
            btn.classList.add('active');
        }

        // تحديث المحتوى
        if (tabName === 'shop') {
            UI.updateShop();
        } else if (tabName === 'achievements') {
            UI.updateAchievements();
        } else if (tabName === 'prestige') {
            UI.updatePrestige();
        } else if (tabName === 'stats') {
            UI.updateStats();
        }
    },

    /**
     * تحميل اللعبة
     */
    loadGame: function() {
        const saveData = SaveSystem.load();
        
        if (saveData) {
            this.cookies = saveData.cookies || 0;
            this.totalCookies = saveData.totalCookies || 0;
            this.clicks = saveData.clicks || 0;
            this.upgrades = saveData.upgrades || {};
            this.unlockedAchievements = saveData.achievements || [];
            this.stats = saveData.stats || { 
                totalUpgrades: 0, 
                startTime: Date.now(),
                goldenClicked: 0,
                goldenMissed: 0
            };
            this.maxClickSpeed = saveData.maxClickSpeed || 0;
            
            // تحميل إحصائيات الكوكيز الذهبي
            if (typeof GoldenCookie !== 'undefined' && saveData.goldenStats) {
                GoldenCookie.loadStats(saveData.goldenStats);
            }
            
            // تحميل بيانات البريستيج
            if (typeof Prestige !== 'undefined' && saveData.prestige) {
                Prestige.loadData(saveData.prestige);
            }
            
            console.log('📂 تم تحميل الحفظ السابق');
        }
    },

    /**
     * إعادة تعيين اللعبة
     */
    reset: function() {
        if (confirm('هل أنت متأكد من إعادة تعيين اللعبة؟ سيتم حذف كل التقدم!')) {
            this.cookies = 0;
            this.totalCookies = 0;
            this.clicks = 0;
            this.upgrades = {};
            this.unlockedAchievements = [];
            this.stats = { 
                totalUpgrades: 0, 
                startTime: Date.now(),
                goldenClicked: 0,
                goldenMissed: 0
            };
            this.clickMultiplier = 1;
            this.productionMultiplier = 1;
            this.maxClickSpeed = 0;
            this.clickTimestamps = [];
            
            // إعادة تعيين إحصائيات الكوكيز الذهبي
            if (typeof GoldenCookie !== 'undefined') {
                GoldenCookie.stats.totalClicked = 0;
                GoldenCookie.stats.totalMissed = 0;
            }
            
            SaveSystem.deleteSave();
            UI.updateAll();
            
            UI.showNotification('تم إعادة تعيين اللعبة', 'info');
        }
    },

    /**
     * الحصول على وقت اللعب بالثواني
     */
    getPlayTime: function() {
        return Math.floor((Date.now() - this.stats.startTime) / 1000);
    }
};

// بدء اللعبة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});
