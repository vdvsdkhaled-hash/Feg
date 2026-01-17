/**
 * Cookie Clicker Arabic - نظام الإنجازات
 * يدير فتح الإنجازات والتحقق منها
 */

const Achievements = {
    /**
     * التحقق من جميع الإنجازات
     */
    check: function() {
        ACHIEVEMENTS_DATA.forEach(achievement => {
            if (!Game.unlockedAchievements.includes(achievement.id)) {
                if (this.checkRequirement(achievement)) {
                    this.unlock(achievement.id);
                }
            }
        });
    },

    /**
     * التحقق من متطلبات إنجاز معين
     */
    checkRequirement: function(achievement) {
        const req = achievement.requirement;
        
        switch (req.type) {
            case 'cookies':
                return Game.totalCookies >= req.value;
            
            case 'clicks':
                return Game.clicks >= req.value;
            
            case 'totalUpgrades':
                return Game.stats.totalUpgrades >= req.value;
            
            case 'upgrade':
                return (Game.upgrades[req.upgradeId] || 0) >= req.value;
            
            default:
                return false;
        }
    },

    /**
     * فتح إنجاز
     */
    unlock: function(achievementId) {
        if (!Game.unlockedAchievements.includes(achievementId)) {
            Game.unlockedAchievements.push(achievementId);
            
            const achievement = ACHIEVEMENTS_DATA.find(a => a.id === achievementId);
            if (achievement) {
                // إظهار إشعار الإنجاز
                UI.showAchievementNotification(achievement);
                
                // تحديث عرض الإنجازات
                UI.updateAchievements();
                
                console.log(`🏆 تم فتح إنجاز: ${achievement.name}`);
            }
        }
    },

    /**
     * التحقق من فتح إنجاز
     */
    isUnlocked: function(achievementId) {
        return Game.unlockedAchievements.includes(achievementId);
    },

    /**
     * الحصول على عدد الإنجازات المفتوحة
     */
    getUnlockedCount: function() {
        return Game.unlockedAchievements.length;
    },

    /**
     * الحصول على إجمالي الإنجازات
     */
    getTotalCount: function() {
        return ACHIEVEMENTS_DATA.length;
    },

    /**
     * الحصول على نسبة الإكمال
     */
    getCompletionPercentage: function() {
        return Math.floor((this.getUnlockedCount() / this.getTotalCount()) * 100);
    },

    /**
     * الحصول على الإنجاز التالي
     */
    getNextAchievement: function() {
        for (const achievement of ACHIEVEMENTS_DATA) {
            if (!this.isUnlocked(achievement.id)) {
                return achievement;
            }
        }
        return null;
    }
};
