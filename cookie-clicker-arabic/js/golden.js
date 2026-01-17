/**
 * Cookie Clicker Arabic - نظام الكوكيز الذهبي
 * يدير ظهور الكوكيز الذهبي والمكافآت
 */

const GoldenCookie = {
    // إعدادات الكوكيز الذهبي
    settings: {
        minSpawnTime: 60000,      // الحد الأدنى للظهور (60 ثانية)
        maxSpawnTime: 300000,     // الحد الأقصى للظهور (5 دقائق)
        displayDuration: 13000,   // مدة البقاء على الشاشة (13 ثانية)
        clickMultiplier: 7,       // مضاعف النقر
        frenzyDuration: 77,       // مدة الجنون (ثانية)
        luckyMultiplier: 0.15,    // نسبة الحظ من الكوكيز الحالي
    },

    // حالة الكوكيز الذهبي
    isActive: false,
    element: null,
    spawnTimer: null,
    despawnTimer: null,
    
    // حالة التأثيرات النشطة
    activeEffects: {
        frenzy: false,
        clickFrenzy: false,
        lucky: false
    },
    effectTimers: {},

    // إحصائيات
    stats: {
        totalClicked: 0,
        totalMissed: 0
    },

    /**
     * تهيئة نظام الكوكيز الذهبي
     */
    init: function() {
        this.createGoldenCookieElement();
        this.scheduleNextSpawn();
        console.log('🌟 تم تفعيل نظام الكوكيز الذهبي');
    },

    /**
     * إنشاء عنصر الكوكيز الذهبي
     */
    createGoldenCookieElement: function() {
        this.element = document.createElement('div');
        this.element.id = 'golden-cookie';
        this.element.className = 'golden-cookie hidden';
        this.element.innerHTML = '🍪';
        this.element.addEventListener('click', () => this.onClick());
        document.body.appendChild(this.element);
    },

    /**
     * جدولة الظهور التالي
     */
    scheduleNextSpawn: function() {
        const delay = this.getRandomSpawnTime();
        this.spawnTimer = setTimeout(() => this.spawn(), delay);
    },

    /**
     * الحصول على وقت ظهور عشوائي
     */
    getRandomSpawnTime: function() {
        return Math.random() * (this.settings.maxSpawnTime - this.settings.minSpawnTime) + this.settings.minSpawnTime;
    },

    /**
     * ظهور الكوكيز الذهبي
     */
    spawn: function() {
        if (this.isActive) return;

        this.isActive = true;
        
        // موقع عشوائي
        const maxX = window.innerWidth - 80;
        const maxY = window.innerHeight - 80;
        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        this.element.classList.remove('hidden');
        this.element.classList.add('spawning');

        // إشعار صوتي (اهتزاز خفيف إن أمكن)
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }

        // مؤقت الاختفاء
        this.despawnTimer = setTimeout(() => this.despawn(true), this.settings.displayDuration);

        console.log('🌟 ظهر كوكيز ذهبي!');
    },

    /**
     * اختفاء الكوكيز الذهبي
     */
    despawn: function(missed = false) {
        if (!this.isActive) return;

        this.isActive = false;
        this.element.classList.add('hidden');
        this.element.classList.remove('spawning');

        if (missed) {
            this.stats.totalMissed++;
            console.log('😢 فاتك الكوكيز الذهبي!');
        }

        clearTimeout(this.despawnTimer);
        this.scheduleNextSpawn();
    },

    /**
     * النقر على الكوكيز الذهبي
     */
    onClick: function() {
        if (!this.isActive) return;

        this.stats.totalClicked++;
        this.despawn(false);

        // اختيار تأثير عشوائي
        const effect = this.getRandomEffect();
        this.applyEffect(effect);

        // تأثير بصري
        this.showClickEffect();
    },

    /**
     * الحصول على تأثير عشوائي
     */
    getRandomEffect: function() {
        const effects = ['frenzy', 'clickFrenzy', 'lucky', 'cookieStorm'];
        const weights = [0.4, 0.25, 0.25, 0.1]; // احتمالات كل تأثير
        
        const random = Math.random();
        let cumulative = 0;
        
        for (let i = 0; i < effects.length; i++) {
            cumulative += weights[i];
            if (random < cumulative) {
                return effects[i];
            }
        }
        
        return effects[0];
    },

    /**
     * تطبيق التأثير
     */
    applyEffect: function(effect) {
        switch (effect) {
            case 'frenzy':
                this.activateFrenzy();
                break;
            case 'clickFrenzy':
                this.activateClickFrenzy();
                break;
            case 'lucky':
                this.activateLucky();
                break;
            case 'cookieStorm':
                this.activateCookieStorm();
                break;
        }
    },

    /**
     * تفعيل الجنون (مضاعفة الإنتاج)
     */
    activateFrenzy: function() {
        const duration = this.settings.frenzyDuration * 1000;
        const multiplier = 7;

        this.activeEffects.frenzy = true;
        Game.productionMultiplier = (Game.productionMultiplier || 1) * multiplier;

        UI.showNotification(`🔥 جنون الكوكيز! إنتاج x${multiplier} لمدة ${this.settings.frenzyDuration} ثانية`, 'golden');
        this.showEffectIndicator('frenzy', `🔥 جنون x${multiplier}`, duration);

        this.effectTimers.frenzy = setTimeout(() => {
            this.activeEffects.frenzy = false;
            Game.productionMultiplier = (Game.productionMultiplier || multiplier) / multiplier;
            this.hideEffectIndicator('frenzy');
        }, duration);
    },

    /**
     * تفعيل جنون النقر
     */
    activateClickFrenzy: function() {
        const duration = 13000;
        const multiplier = 777;

        this.activeEffects.clickFrenzy = true;
        Game.clickMultiplier = (Game.clickMultiplier || 1) * multiplier;

        UI.showNotification(`👆 جنون النقر! نقرات x${multiplier} لمدة 13 ثانية`, 'golden');
        this.showEffectIndicator('clickFrenzy', `👆 نقر x${multiplier}`, duration);

        this.effectTimers.clickFrenzy = setTimeout(() => {
            this.activeEffects.clickFrenzy = false;
            Game.clickMultiplier = (Game.clickMultiplier || multiplier) / multiplier;
            this.hideEffectIndicator('clickFrenzy');
        }, duration);
    },

    /**
     * تفعيل الحظ
     */
    activateLucky: function() {
        const cps = Shop.getTotalCps();
        const maxReward = cps * 60 * 15; // 15 دقيقة من الإنتاج
        const reward = Math.min(Game.cookies * this.settings.luckyMultiplier, maxReward);
        const finalReward = Math.max(reward, cps * 60); // على الأقل دقيقة من الإنتاج

        Game.cookies += finalReward;
        Game.totalCookies += finalReward;

        UI.showNotification(`🍀 حظ سعيد! +${UI.formatNumber(finalReward)} كوكيز`, 'golden');
        UI.updateCookieDisplay();
    },

    /**
     * تفعيل عاصفة الكوكيز
     */
    activateCookieStorm: function() {
        const duration = 7000;
        const cookieCount = 20;
        
        UI.showNotification('🌧️ عاصفة الكوكيز!', 'golden');

        for (let i = 0; i < cookieCount; i++) {
            setTimeout(() => {
                this.spawnFallingCookie();
            }, i * (duration / cookieCount));
        }
    },

    /**
     * إنشاء كوكيز متساقط
     */
    spawnFallingCookie: function() {
        const cookie = document.createElement('div');
        cookie.className = 'falling-cookie';
        cookie.innerHTML = '🍪';
        cookie.style.left = `${Math.random() * (window.innerWidth - 40)}px`;
        cookie.style.top = '-50px';
        
        const reward = Math.floor(Shop.getTotalCps() * (Math.random() * 5 + 1));
        
        cookie.addEventListener('click', () => {
            Game.cookies += reward;
            Game.totalCookies += reward;
            UI.showClickEffect(
                parseFloat(cookie.style.left) + 20,
                parseFloat(cookie.style.top) + 20,
                reward
            );
            UI.updateCookieDisplay();
            cookie.remove();
        });

        document.body.appendChild(cookie);

        // أنيميشن السقوط
        let top = -50;
        const fall = setInterval(() => {
            top += 5;
            cookie.style.top = `${top}px`;
            
            if (top > window.innerHeight) {
                clearInterval(fall);
                cookie.remove();
            }
        }, 20);
    },

    /**
     * إظهار تأثير النقر
     */
    showClickEffect: function() {
        const effect = document.createElement('div');
        effect.className = 'golden-click-effect';
        effect.innerHTML = '✨';
        effect.style.left = this.element.style.left;
        effect.style.top = this.element.style.top;
        document.body.appendChild(effect);

        setTimeout(() => effect.remove(), 1000);
    },

    /**
     * إظهار مؤشر التأثير النشط
     */
    showEffectIndicator: function(effectId, text, duration) {
        let container = document.getElementById('effect-indicators');
        if (!container) {
            container = document.createElement('div');
            container.id = 'effect-indicators';
            document.body.appendChild(container);
        }

        const indicator = document.createElement('div');
        indicator.id = `effect-${effectId}`;
        indicator.className = 'effect-indicator';
        indicator.innerHTML = `
            <span class="effect-text">${text}</span>
            <div class="effect-timer">
                <div class="effect-timer-bar" style="animation-duration: ${duration}ms"></div>
            </div>
        `;
        container.appendChild(indicator);
    },

    /**
     * إخفاء مؤشر التأثير
     */
    hideEffectIndicator: function(effectId) {
        const indicator = document.getElementById(`effect-${effectId}`);
        if (indicator) {
            indicator.classList.add('fade-out');
            setTimeout(() => indicator.remove(), 300);
        }
    },

    /**
     * الحصول على الإحصائيات
     */
    getStats: function() {
        return {
            clicked: this.stats.totalClicked,
            missed: this.stats.totalMissed,
            total: this.stats.totalClicked + this.stats.totalMissed
        };
    },

    /**
     * تحميل الإحصائيات
     */
    loadStats: function(stats) {
        if (stats) {
            this.stats.totalClicked = stats.clicked || 0;
            this.stats.totalMissed = stats.missed || 0;
        }
    }
};
