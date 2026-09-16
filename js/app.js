class ClockApp {
    constructor() {
        this.clocks = new Map();
        this.use24Hour = localStorage.getItem('use24Hour') === 'true';
        this.darkTheme = localStorage.getItem('darkTheme') !== 'false';
        this.init();
    }

    init() {
        this.setupDOM();
        this.setupEventListeners();
        this.applyTheme();
        this.loadSavedTimezones();
        this.startClockUpdates();
    }

    setupDOM() {
        this.clocksGrid = document.getElementById('clocksGrid');
        this.emptyState = document.getElementById('emptyState');
        this.searchInput = document.getElementById('timezoneSearch');
        this.addBtn = document.getElementById('addBtn');
        this.themeToggle = document.getElementById('themeToggle');
        this.formatToggle = document.getElementById('formatToggle');
        this.suggestions = document.getElementById('suggestions');
    }

    setupEventListeners() {
        this.addBtn.addEventListener('click', () => this.handleAddClick());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.formatToggle.addEventListener('click', () => this.toggleFormat());
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleAddClick();
            }
        });
    }

    loadSavedTimezones() {
        const saved = localStorage.getItem('timezones');
        if (saved) {
            try {
                const timezones = JSON.parse(saved);
                timezones.forEach(tz => this.addClock(tz));
            } catch (e) {
                console.error('Failed to load saved timezones:', e);
            }
        } else {
            // Add default timezones on first load
            ['America/New_York', 'Europe/London', 'Asia/Tokyo'].forEach(tz => this.addClock(tz));
        }
    }

    saveTimezones() {
        const timezones = Array.from(this.clocks.keys());
        localStorage.setItem('timezones', JSON.stringify(timezones));
    }

    handleSearch(query) {
        if (query.length === 0) {
            this.showPopularSuggestions();
            return;
        }

        const results = TimeZoneManager.search(query);
        this.renderSuggestions(results.slice(0, 8));
    }

    showPopularSuggestions() {
        const popular = TimeZoneManager.getPopular();
        this.renderSuggestions(popular);
    }

    renderSuggestions(items) {
        this.suggestions.innerHTML = items
            .map(item => `
                <div class="suggestion-item" data-timezone="${item.tz}">
                    ${item.city}
                </div>
            `)
            .join('');

        this.suggestions.querySelectorAll('.suggestion-item').forEach(el => {
            el.addEventListener('click', () => {
                const tz = el.dataset.timezone;
                this.addClock(tz);
                this.searchInput.value = '';
                this.suggestions.innerHTML = '';
            });
        });
    }

    handleAddClick() {
        const query = this.searchInput.value.trim();
        if (!query) return;

        const results = TimeZoneManager.search(query);
        if (results.length > 0) {
            this.addClock(results[0].tz);
            this.searchInput.value = '';
            this.suggestions.innerHTML = '';
        }
    }

    addClock(timezone) {
        if (this.clocks.has(timezone)) return;

        const data = TimeZoneManager.getData(timezone);
        if (!data) return;

        const clock = new Clock(timezone, this.use24Hour);
        this.clocks.set(timezone, clock);
        this.renderClockCard(timezone, data, clock);
        this.updateEmptyState();
        this.saveTimezones();
    }

    renderClockCard(timezone, data, clock) {
        const card = document.createElement('div');
        card.className = 'clock-card';
        card.dataset.timezone = timezone;

        card.innerHTML = `
            <div class="clock-header">
                <div>
                    <div class="clock-city">${data.city}</div>
                    <div class="clock-info">${data.country}</div>
                </div>
                <button class="btn-close" title="Remove">×</button>
            </div>
            <div class="clock-display" data-time>${clock.getFormattedTime()}</div>
            <div class="clock-date" data-date>${clock.getDate()}</div>
            <div class="clock-footer">
                <span class="clock-offset">${clock.getUTCOffset()}</span>
            </div>
        `;

        card.querySelector('.btn-close').addEventListener('click', () => {
            this.removeClock(timezone);
        });

        this.clocksGrid.appendChild(card);
    }

    removeClock(timezone) {
        this.clocks.delete(timezone);
        const card = this.clocksGrid.querySelector(`[data-timezone="${timezone}"]`);
        if (card) {
            card.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => card.remove(), 300);
        }
        this.updateEmptyState();
        this.saveTimezones();
    }

    updateEmptyState() {
        if (this.clocks.size === 0) {
            this.emptyState.classList.add('show');
            this.clocksGrid.style.display = 'none';
        } else {
            this.emptyState.classList.remove('show');
            this.clocksGrid.style.display = 'grid';
        }
    }

    updateClocks() {
        this.clocks.forEach((clock, timezone) => {
            const card = this.clocksGrid.querySelector(`[data-timezone="${timezone}"]`);
            if (card) {
                card.querySelector('[data-time]').textContent = clock.getFormattedTime();
                card.querySelector('[data-date]').textContent = clock.getDate();
            }
        });
    }

    startClockUpdates() {
        this.updateClocks();
        this.updateInterval = setInterval(() => this.updateClocks(), 1000);
    }

    toggleTheme() {
        this.darkTheme = !this.darkTheme;
        localStorage.setItem('darkTheme', this.darkTheme);
        this.applyTheme();
    }

    applyTheme() {
        if (this.darkTheme) {
            document.body.classList.add('dark-theme');
            this.themeToggle.querySelector('span').textContent = '☀️';
        } else {
            document.body.classList.remove('dark-theme');
            this.themeToggle.querySelector('span').textContent = '🌙';
        }
    }

    toggleFormat() {
        this.use24Hour = !this.use24Hour;
        localStorage.setItem('use24Hour', this.use24Hour);
        this.formatToggle.querySelector('span').textContent = this.use24Hour ? '12h' : '24h';
        
        this.clocks.forEach(clock => clock.setFormat(this.use24Hour));
        this.updateClocks();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ClockApp();
});
