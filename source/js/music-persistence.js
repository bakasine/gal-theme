/**
 * 音乐播放状态持久化管理工具
 * 用于在页面跳转后保持音乐播放状态
 */

// 音乐状态管理类
class MusicStateManager {
    constructor() {
        this.storageKey = 'gal_music_persistence';
        this.state = this.loadState();
    }

    // 加载保存的状态
    loadState() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : {
                aplayer: {
                    currentTime: 0,
                    isPlaying: false,
                    volume: 0.1,
                    currentIndex: 0
                },
                oni: {
                    currentTime: 0,
                    isPlaying: false
                },
                lastUpdate: Date.now()
            };
        } catch (error) {
            console.warn('加载音乐状态失败:', error);
            return this.getDefaultState();
        }
    }

    // 获取默认状态
    getDefaultState() {
        return {
            aplayer: {
                currentTime: 0,
                isPlaying: false,
                volume: 0.1,
                currentIndex: 0
            },
            oni: {
                currentTime: 0,
                isPlaying: false
            },
            lastUpdate: Date.now()
        };
    }

    // 保存状态
    saveState() {
        try {
            this.state.lastUpdate = Date.now();
            localStorage.setItem(this.storageKey, JSON.stringify(this.state));
        } catch (error) {
            console.warn('保存音乐状态失败:', error);
        }
    }

    // 更新APlayer状态
    updateAPlayerState(data) {
        this.state.aplayer = { ...this.state.aplayer, ...data };
        this.saveState();
    }

    // 更新欧尼酱音频状态
    updateOniState(data) {
        this.state.oni = { ...this.state.oni, ...data };
        this.saveState();
    }

    // 获取APlayer状态
    getAPlayerState() {
        return this.state.aplayer;
    }

    // 获取欧尼酱音频状态
    getOniState() {
        return this.state.oni;
    }

    // 清除所有状态
    clearState() {
        this.state = this.getDefaultState();
        localStorage.removeItem(this.storageKey);
    }

    // 检查状态是否过期（超过24小时）
    isStateExpired() {
        const now = Date.now();
        const lastUpdate = this.state.lastUpdate || 0;
        const oneDay = 24 * 60 * 60 * 1000; // 24小时
        return (now - lastUpdate) > oneDay;
    }
}

// 全局音乐状态管理器实例
window.GalMusicManager = new MusicStateManager();

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查状态是否过期，如果过期则清除
    if (window.GalMusicManager.isStateExpired()) {
        window.GalMusicManager.clearState();
    }
    
    console.log('音乐状态管理器已初始化');
});

// 页面卸载前保存状态
window.addEventListener('beforeunload', function() {
    if (window.GalMusicManager) {
        window.GalMusicManager.saveState();
    }
});

// 页面可见性变化时处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden && window.GalMusicManager) {
        window.GalMusicManager.saveState();
    }
});

// 提供全局函数用于手动控制
window.GalMusicControl = {
    // 手动保存当前状态
    saveCurrentState: function() {
        if (window.GalMusicManager) {
            window.GalMusicManager.saveState();
        }
    },
    
    // 清除所有音乐状态
    clearMusicState: function() {
        if (window.GalMusicManager) {
            window.GalMusicManager.clearState();
            console.log('音乐状态已清除');
        }
    },
    
    // 获取音乐状态信息
    getMusicInfo: function() {
        if (window.GalMusicManager) {
            return {
                aplayer: window.GalMusicManager.getAPlayerState(),
                oni: window.GalMusicManager.getOniState(),
                lastUpdate: new Date(window.GalMusicManager.state.lastUpdate).toLocaleString()
            };
        }
        return null;
    }
}; 