class Clock {
    constructor(timezone, use24Hour = false) {
        this.timezone = timezone;
        this.use24Hour = use24Hour;
    }

    getTime() {
        const now = new Date();
        return new Date(now.toLocaleString('en-US', { timeZone: this.timezone }));
    }

    format12Hour() {
        const time = this.getTime();
        const hours = String(time.getHours() % 12 || 12).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');
        const seconds = String(time.getSeconds()).padStart(2, '0');
        const period = time.getHours() >= 12 ? 'PM' : 'AM';
        return `${hours}:${minutes}:${seconds} ${period}`;
    }

    format24Hour() {
        const time = this.getTime();
        const hours = String(time.getHours()).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');
        const seconds = String(time.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    getFormattedTime() {
        return this.use24Hour ? this.format24Hour() : this.format12Hour();
    }

    getDate() {
        const time = this.getTime();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return time.toLocaleDateString('en-US', options);
    }

    getUTCOffset() {
        const time = this.getTime();
        const utcTime = new Date(time.toLocaleString('en-US', { timeZone: 'UTC' }));
        const offset = time - utcTime;
        const hours = Math.floor(offset / 3600000);
        const minutes = Math.abs((offset % 3600000) / 60000);
        const sign = hours >= 0 ? '+' : '-';
        return `UTC${sign}${Math.abs(hours)}${minutes ? ':' + String(minutes).padStart(2, '0') : ''}`;
    }

    setFormat(use24Hour) {
        this.use24Hour = use24Hour;
    }
}
