// ===== DATA SIMULATION =====
class TrendDataSimulator {
    constructor() {
        this.categories = ['Dans', 'Komedi', 'Müzik', 'Eğitim', 'Yemek', 'Moda', 'Spor', 'Teknoloji', 'Seyahat', 'Hayvanlar'];
        this.hashtags = [
            '#keşfet', '#fyp', '#viral', '#trend', '#türkiye', '#istanbul',
            '#dans', '#komedi', '#müzik', '#challenge', '#duet', '#transition',
            '#makeup', '#fashion', '#food', '#travel', '#fitness', '#gaming'
        ];
        this.musicTracks = [
            'Trending Sound 2024', 'Viral Beat Mix', 'Popular Song Remix',
            'Dance Challenge Music', 'Emotional Piano', 'Upbeat Pop Track',
            'Chill Vibes', 'Hype Music', 'Sad Song Cover', 'Party Anthem'
        ];
    }

    generateTrends(count = 20) {
        const trends = [];
        for (let i = 0; i < count; i++) {
            trends.push(this.generateSingleTrend(i));
        }
        return trends;
    }

    generateSingleTrend(index) {
        const category = this.categories[Math.floor(Math.random() * this.categories.length)];
        const hashtag = this.hashtags[Math.floor(Math.random() * this.hashtags.length)];
        const music = this.musicTracks[Math.floor(Math.random() * this.musicTracks.length)];

        // Generate realistic metrics
        const views = this.generateViews();
        const likes = Math.floor(views * (0.05 + Math.random() * 0.15)); // 5-20% engagement
        const comments = Math.floor(likes * (0.1 + Math.random() * 0.2)); // 10-30% of likes
        const shares = Math.floor(likes * (0.05 + Math.random() * 0.15)); // 5-20% of likes

        // Calculate viral potential score
        const engagementRate = (likes + comments + shares) / views;
        const growthRate = Math.random() * 100; // Simulated growth rate
        const viralScore = this.calculateViralScore(engagementRate, growthRate, views);

        // Determine status
        const isViral = viralScore >= 75;
        const isTrending = views > 5000000 || viralScore >= 60;
        const isRising = growthRate > 70;

        return {
            id: `trend-${index}-${Date.now()}`,
            title: this.generateTitle(category),
            hashtag: hashtag,
            category: category,
            music: music,
            views: views,
            likes: likes,
            comments: comments,
            shares: shares,
            viralScore: viralScore,
            growthRate: growthRate,
            engagementRate: engagementRate * 100,
            isViral: isViral,
            isTrending: isTrending,
            isRising: isRising,
            createdAt: this.generateTimestamp(),
            description: this.generateDescription(category),
            insights: this.generateInsights(viralScore, growthRate, engagementRate)
        };
    }

    generateTitle(category) {
        const titles = {
            'Dans': ['Viral Dans Challenge', 'Yeni Dans Trendi', 'Dans Kapışması', 'Smooth Moves'],
            'Komedi': ['Komik Skeç', 'Gülme Garantili', 'Viral Komedi', 'Eğlenceli Anlar'],
            'Müzik': ['Şarkı Cover', 'Müzik Performansı', 'Vokal Challenge', 'Beat Drop'],
            'Eğitim': ['Öğretici İçerik', 'Bilgi Paylaşımı', 'Tutorial', 'Hayat Hileleri'],
            'Yemek': ['Yemek Tarifi', 'Lezzetli Tarifler', 'Cooking Show', 'Food Art'],
            'Moda': ['Outfit Ideas', 'Moda Trendleri', 'Style Tips', 'Fashion Haul'],
            'Spor': ['Fitness Challenge', 'Workout Routine', 'Spor Motivasyonu', 'Training Tips'],
            'Teknoloji': ['Tech Review', 'Gadget İncelemesi', 'Tech Tips', 'Innovation'],
            'Seyahat': ['Gezi Vlogu', 'Travel Tips', 'Keşif', 'Adventure Time'],
            'Hayvanlar': ['Sevimli Hayvanlar', 'Pet Videos', 'Animal Moments', 'Cute Pets']
        };
        const categoryTitles = titles[category] || ['Viral İçerik'];
        return categoryTitles[Math.floor(Math.random() * categoryTitles.length)];
    }

    generateViews() {
        const ranges = [
            { min: 100000, max: 500000, weight: 0.3 },
            { min: 500000, max: 2000000, weight: 0.3 },
            { min: 2000000, max: 10000000, weight: 0.25 },
            { min: 10000000, max: 50000000, weight: 0.15 }
        ];

        const rand = Math.random();
        let cumulative = 0;

        for (const range of ranges) {
            cumulative += range.weight;
            if (rand <= cumulative) {
                return Math.floor(Math.random() * (range.max - range.min) + range.min);
            }
        }

        return 1000000;
    }

    calculateViralScore(engagementRate, growthRate, views) {
        // Weighted scoring algorithm
        const engagementWeight = 0.4;
        const growthWeight = 0.35;
        const viewsWeight = 0.25;

        const normalizedEngagement = Math.min(engagementRate * 500, 100); // Normalize to 0-100
        const normalizedGrowth = growthRate; // Already 0-100
        const normalizedViews = Math.min((views / 50000000) * 100, 100); // Normalize to 0-100

        const score = (normalizedEngagement * engagementWeight) +
            (normalizedGrowth * growthWeight) +
            (normalizedViews * viewsWeight);

        return Math.round(score);
    }

    generateTimestamp() {
        const now = new Date();
        const hoursAgo = Math.floor(Math.random() * 48);
        const timestamp = new Date(now - hoursAgo * 60 * 60 * 1000);
        return timestamp.toISOString();
    }

    generateDescription(category) {
        const descriptions = {
            'Dans': 'Bu dans trendi sosyal medyayı kasıp kavuruyor! Herkes bu hareketi deniyor.',
            'Komedi': 'Gülmekten karnınız ağrıyacak! Bu içerik viral olmaya aday.',
            'Müzik': 'Bu müzik performansı milyonlarca izlenme aldı ve hala yükseliyor.',
            'Eğitim': 'Öğretici ve faydalı içerik. Herkesin bilmesi gereken bilgiler.',
            'Yemek': 'Lezzetli tarifler ve muhteşem sunum. Mutlaka denemelisiniz!',
            'Moda': 'Moda dünyasının en yeni trendleri burada. Stil sahibi olun!',
            'Spor': 'Motivasyon dolu spor içeriği. Hedeflerinize ulaşın!',
            'Teknoloji': 'Teknoloji dünyasından en son haberler ve incelemeler.',
            'Seyahat': 'Keşfedilmemiş yerler ve seyahat tavsiyeleri.',
            'Hayvanlar': 'Sevimli hayvan anları. Gününüzü güzelleştirecek içerikler.'
        };
        return descriptions[category] || 'Viral içerik! Kaçırmayın!';
    }

    generateInsights(viralScore, growthRate, engagementRate) {
        const insights = [];

        if (viralScore >= 75) {
            insights.push('🚀 Yüksek viral potansiyel - Bu içerik patlamaya hazır!');
        }

        if (growthRate > 80) {
            insights.push('📈 Hızlı büyüme - Son saatlerde büyük ivme kazandı');
        }

        if (engagementRate > 15) {
            insights.push('💬 Yüksek etkileşim oranı - Kitle çok aktif');
        }

        if (viralScore >= 60 && viralScore < 75) {
            insights.push('⚡ Orta-yüksek potansiyel - Yakından takip edilmeli');
        }

        if (insights.length === 0) {
            insights.push('📊 Stabil trend - Normal büyüme gösteriyor');
        }

        return insights;
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    getTimeAgo(timestamp) {
        const now = new Date();
        const past = new Date(timestamp);
        const diffMs = now - past;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffHours < 1) {
            const diffMins = Math.floor(diffMs / (1000 * 60));
            return `${diffMins} dakika önce`;
        } else if (diffHours < 24) {
            return `${diffHours} saat önce`;
        } else {
            const diffDays = Math.floor(diffHours / 24);
            return `${diffDays} gün önce`;
        }
    }
}

// ===== APP STATE MANAGEMENT =====
class TrendTrackerApp {
    constructor() {
        this.simulator = new TrendDataSimulator();
        this.trends = [];
        this.favorites = new Set();
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.currentSort = 'default';

        this.init();
    }

    init() {
        this.loadFavorites();
        this.loadTrends();
        this.setupEventListeners();
        this.render();
    }

    loadTrends() {
        this.trends = this.simulator.generateTrends(20);
        this.updateStats();
    }

    loadFavorites() {
        const saved = localStorage.getItem('tiktok-favorites');
        if (saved) {
            this.favorites = new Set(JSON.parse(saved));
        }
    }

    saveFavorites() {
        localStorage.setItem('tiktok-favorites', JSON.stringify([...this.favorites]));
    }

    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });

        // Search input
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.render();
        });

        // Sort select
        const sortSelect = document.getElementById('sortSelect');
        sortSelect.addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.render();
        });

        // Refresh button
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.loadTrends();
            this.render();
            this.showNotification('Veriler güncellendi! 🔄');
        });

        // Modal close
        document.getElementById('modalClose').addEventListener('click', () => {
            this.closeModal();
        });

        // Close modal on outside click
        document.getElementById('trendModal').addEventListener('click', (e) => {
            if (e.target.id === 'trendModal') {
                this.closeModal();
            }
        });
    }

    getFilteredTrends() {
        let filtered = this.trends;

        // Apply filter
        switch (this.currentFilter) {
            case 'trending':
                filtered = filtered.filter(t => t.isTrending);
                break;
            case 'viral':
                filtered = filtered.filter(t => t.isViral);
                break;
            case 'rising':
                filtered = filtered.filter(t => t.isRising);
                break;
            case 'favorites':
                filtered = filtered.filter(t => this.favorites.has(t.id));
                break;
        }

        // Apply search
        if (this.searchQuery) {
            filtered = filtered.filter(t =>
                t.title.toLowerCase().includes(this.searchQuery) ||
                t.hashtag.toLowerCase().includes(this.searchQuery) ||
                t.category.toLowerCase().includes(this.searchQuery)
            );
        }

        // Apply sorting
        switch (this.currentSort) {
            case 'viral-desc':
                filtered.sort((a, b) => b.viralScore - a.viralScore);
                break;
            case 'viral-asc':
                filtered.sort((a, b) => a.viralScore - b.viralScore);
                break;
            case 'views-desc':
                filtered.sort((a, b) => b.views - a.views);
                break;
            case 'views-asc':
                filtered.sort((a, b) => a.views - b.views);
                break;
            // 'default' - no sorting, keep original order
        }

        return filtered;
    }

    render() {
        const filtered = this.getFilteredTrends();
        const grid = document.getElementById('trendsGrid');

        if (filtered.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">Sonuç bulunamadı 😔</div>';
            return;
        }

        grid.innerHTML = filtered.map(trend => this.createTrendCard(trend)).join('');

        // Add event listeners to cards
        document.querySelectorAll('.trend-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.favorite-btn')) {
                    const trendId = card.dataset.trendId;
                    this.showTrendDetail(trendId);
                }
            });
        });

        // Add event listeners to favorite buttons
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const trendId = btn.dataset.trendId;
                this.toggleFavorite(trendId);
            });
        });
    }

    createTrendCard(trend) {
        const isFavorite = this.favorites.has(trend.id);
        const viralClass = trend.isViral ? 'viral' : '';

        return `
            <div class="trend-card ${viralClass}" data-trend-id="${trend.id}">
                <div class="trend-header">
                    <div>
                        <h3 class="trend-title">${trend.title}</h3>
                        <p class="trend-hashtag">${trend.hashtag}</p>
                    </div>
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-trend-id="${trend.id}">
                        ${isFavorite ? '⭐' : '☆'}
                    </button>
                </div>
                
                <div class="trend-stats">
                    <div class="stat-box">
                        <div class="stat-box-label">Görüntülenme</div>
                        <div class="stat-box-value">${this.simulator.formatNumber(trend.views)}</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-box-label">Beğeni</div>
                        <div class="stat-box-value">${this.simulator.formatNumber(trend.likes)}</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-box-label">Paylaşım</div>
                        <div class="stat-box-value">${this.simulator.formatNumber(trend.shares)}</div>
                    </div>
                </div>
                
                <div class="trend-badges">
                    ${trend.isViral ? '<span class="badge badge-viral">🚀 Viral Potansiyel</span>' : ''}
                    ${trend.isTrending ? '<span class="badge badge-trending">🔥 Trend</span>' : ''}
                    ${trend.isRising ? '<span class="badge badge-rising">📈 Yükseliyor</span>' : ''}
                    <span class="badge badge-category">${trend.category}</span>
                </div>
                
                <div class="viral-score">
                    <div class="viral-score-label">Viral Potansiyel Skoru</div>
                    <div class="viral-score-value">${trend.viralScore}/100</div>
                    <div class="viral-score-bar">
                        <div class="viral-score-fill" style="width: ${trend.viralScore}%"></div>
                    </div>
                </div>
            </div>
        `;
    }

    showTrendDetail(trendId) {
        const trend = this.trends.find(t => t.id === trendId);
        if (!trend) return;

        const modal = document.getElementById('trendModal');
        const modalBody = document.getElementById('modalBody');

        modalBody.innerHTML = `
            <div class="modal-header">
                <h2 class="modal-title">${trend.title}</h2>
                <p class="modal-subtitle">${trend.hashtag} • ${trend.category}</p>
            </div>

            <div class="modal-stats-grid">
                <div class="modal-stat">
                    <div class="modal-stat-icon">👁️</div>
                    <div class="modal-stat-value">${this.simulator.formatNumber(trend.views)}</div>
                    <div class="modal-stat-label">Görüntülenme</div>
                </div>
                <div class="modal-stat">
                    <div class="modal-stat-icon">❤️</div>
                    <div class="modal-stat-value">${this.simulator.formatNumber(trend.likes)}</div>
                    <div class="modal-stat-label">Beğeni</div>
                </div>
                <div class="modal-stat">
                    <div class="modal-stat-icon">💬</div>
                    <div class="modal-stat-value">${this.simulator.formatNumber(trend.comments)}</div>
                    <div class="modal-stat-label">Yorum</div>
                </div>
                <div class="modal-stat">
                    <div class="modal-stat-icon">🔄</div>
                    <div class="modal-stat-value">${this.simulator.formatNumber(trend.shares)}</div>
                    <div class="modal-stat-label">Paylaşım</div>
                </div>
            </div>

            <div class="modal-section">
                <h3 class="modal-section-title">📊 Detaylı Analiz</h3>
                <div class="modal-stats-grid">
                    <div class="modal-stat">
                        <div class="modal-stat-icon">🚀</div>
                        <div class="modal-stat-value">${trend.viralScore}/100</div>
                        <div class="modal-stat-label">Viral Potansiyel</div>
                    </div>
                    <div class="modal-stat">
                        <div class="modal-stat-icon">📈</div>
                        <div class="modal-stat-value">${Math.round(trend.growthRate)}%</div>
                        <div class="modal-stat-label">Büyüme Hızı</div>
                    </div>
                    <div class="modal-stat">
                        <div class="modal-stat-icon">💪</div>
                        <div class="modal-stat-value">${trend.engagementRate.toFixed(1)}%</div>
                        <div class="modal-stat-label">Etkileşim Oranı</div>
                    </div>
                    <div class="modal-stat">
                        <div class="modal-stat-icon">⏰</div>
                        <div class="modal-stat-value">${this.simulator.getTimeAgo(trend.createdAt)}</div>
                        <div class="modal-stat-label">Başlangıç</div>
                    </div>
                </div>
            </div>

            <div class="modal-section">
                <h3 class="modal-section-title">📝 Açıklama</h3>
                <p class="modal-description">${trend.description}</p>
            </div>

            <div class="modal-section">
                <h3 class="modal-section-title">🎵 Müzik</h3>
                <p class="modal-description">${trend.music}</p>
            </div>

            <div class="modal-section">
                <h3 class="modal-section-title">💡 Öngörüler</h3>
                <ul class="insight-list">
                    ${trend.insights.map(insight => `<li class="insight-item">${insight}</li>`).join('')}
                </ul>
            </div>
        `;

        modal.classList.add('active');
    }

    closeModal() {
        document.getElementById('trendModal').classList.remove('active');
    }

    toggleFavorite(trendId) {
        if (this.favorites.has(trendId)) {
            this.favorites.delete(trendId);
        } else {
            this.favorites.add(trendId);
        }
        this.saveFavorites();
        this.render();
    }

    updateStats() {
        const activeTrends = this.trends.filter(t => t.isTrending).length;
        const viralCount = this.trends.filter(t => t.isViral).length;

        document.getElementById('activeTrends').textContent = activeTrends;
        document.getElementById('viralCount').textContent = viralCount;
    }

    showNotification(message) {
        // Simple notification - could be enhanced with a toast library
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-gradient);
            color: white;
            padding: 1rem 2rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
}

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', () => {
    window.trendTracker = new TrendTrackerApp();
});

// Add animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
