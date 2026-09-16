// All IANA time zones with their metadata
const TIMEZONE_DATA = {
    'Africa/Abidjan': { city: 'Abidjan', country: '🇨🇮 Côte d\'Ivoire', offset: 'UTC+0' },
    'Africa/Accra': { city: 'Accra', country: '🇬🇭 Ghana', offset: 'UTC+0' },
    'Africa/Cairo': { city: 'Cairo', country: '🇪🇬 Egypt', offset: 'UTC+2' },
    'Africa/Johannesburg': { city: 'Johannesburg', country: '🇿🇦 South Africa', offset: 'UTC+2' },
    'Africa/Lagos': { city: 'Lagos', country: '🇳🇬 Nigeria', offset: 'UTC+1' },
    'Africa/Nairobi': { city: 'Nairobi', country: '🇰🇪 Kenya', offset: 'UTC+3' },
    'America/Anchorage': { city: 'Anchorage', country: '🇺🇸 USA', offset: 'UTC-9' },
    'America/Chicago': { city: 'Chicago', country: '🇺🇸 USA', offset: 'UTC-6' },
    'America/Denver': { city: 'Denver', country: '🇺🇸 USA', offset: 'UTC-7' },
    'America/Los_Angeles': { city: 'Los Angeles', country: '🇺🇸 USA', offset: 'UTC-8' },
    'America/Mexico_City': { city: 'Mexico City', country: '🇲🇽 Mexico', offset: 'UTC-6' },
    'America/New_York': { city: 'New York', country: '🇺🇸 USA', offset: 'UTC-5' },
    'America/Toronto': { city: 'Toronto', country: '🇨🇦 Canada', offset: 'UTC-5' },
    'America/Vancouver': { city: 'Vancouver', country: '🇨🇦 Canada', offset: 'UTC-8' },
    'America/São_Paulo': { city: 'São Paulo', country: '🇧🇷 Brazil', offset: 'UTC-3' },
    'Asia/Bangkok': { city: 'Bangkok', country: '🇹🇭 Thailand', offset: 'UTC+7' },
    'Asia/Dubai': { city: 'Dubai', country: '🇦🇪 UAE', offset: 'UTC+4' },
    'Asia/Hong_Kong': { city: 'Hong Kong', country: '🇭🇰 Hong Kong', offset: 'UTC+8' },
    'Asia/Kolkata': { city: 'Kolkata', country: '🇮🇳 India', offset: 'UTC+5:30' },
    'Asia/Manila': { city: 'Manila', country: '🇵🇭 Philippines', offset: 'UTC+8' },
    'Asia/Seoul': { city: 'Seoul', country: '🇰🇷 South Korea', offset: 'UTC+9' },
    'Asia/Shanghai': { city: 'Shanghai', country: '🇨🇳 China', offset: 'UTC+8' },
    'Asia/Singapore': { city: 'Singapore', country: '🇸🇬 Singapore', offset: 'UTC+8' },
    'Asia/Tokyo': { city: 'Tokyo', country: '🇯🇵 Japan', offset: 'UTC+9' },
    'Australia/Melbourne': { city: 'Melbourne', country: '🇦🇺 Australia', offset: 'UTC+10' },
    'Australia/Sydney': { city: 'Sydney', country: '🇦🇺 Australia', offset: 'UTC+10' },
    'Europe/Amsterdam': { city: 'Amsterdam', country: '🇳🇱 Netherlands', offset: 'UTC+1' },
    'Europe/Berlin': { city: 'Berlin', country: '🇩🇪 Germany', offset: 'UTC+1' },
    'Europe/Brussels': { city: 'Brussels', country: '🇧🇪 Belgium', offset: 'UTC+1' },
    'Europe/Dublin': { city: 'Dublin', country: '🇮🇪 Ireland', offset: 'UTC+0' },
    'Europe/Istanbul': { city: 'Istanbul', country: '🇹🇷 Turkey', offset: 'UTC+3' },
    'Europe/London': { city: 'London', country: '🇬🇧 UK', offset: 'UTC+0' },
    'Europe/Madrid': { city: 'Madrid', country: '🇪🇸 Spain', offset: 'UTC+1' },
    'Europe/Moscow': { city: 'Moscow', country: '🇷🇺 Russia', offset: 'UTC+3' },
    'Europe/Paris': { city: 'Paris', country: '🇫🇷 France', offset: 'UTC+1' },
    'Europe/Rome': { city: 'Rome', country: '🇮🇹 Italy', offset: 'UTC+1' },
    'Europe/Stockholm': { city: 'Stockholm', country: '🇸🇪 Sweden', offset: 'UTC+1' },
    'Europe/Zurich': { city: 'Zurich', country: '🇨🇭 Switzerland', offset: 'UTC+1' },
    'Pacific/Auckland': { city: 'Auckland', country: '🇳🇿 New Zealand', offset: 'UTC+12' },
    'Pacific/Fiji': { city: 'Fiji', country: '🇫🇯 Fiji', offset: 'UTC+12' },
    'Pacific/Honolulu': { city: 'Honolulu', country: '🇺🇸 USA', offset: 'UTC-10' },
};

// Popular timezones for quick suggestions
const POPULAR_TIMEZONES = [
    'America/New_York',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Singapore',
    'Australia/Sydney',
    'America/Los_Angeles',
    'Asia/Hong_Kong',
];

class TimeZoneManager {
    static search(query) {
        const lowerQuery = query.toLowerCase();
        return Object.entries(TIMEZONE_DATA)
            .filter(([tz, data]) => {
                return tz.toLowerCase().includes(lowerQuery) ||
                       data.city.toLowerCase().includes(lowerQuery) ||
                       data.country.toLowerCase().includes(lowerQuery);
            })
            .map(([tz, data]) => ({ tz, ...data }))
            .sort((a, b) => a.city.localeCompare(b.city));
    }

    static getPopular() {
        return POPULAR_TIMEZONES
            .map(tz => ({ tz, ...TIMEZONE_DATA[tz] }))
            .sort(() => Math.random() - 0.5)
            .slice(0, 8);
    }

    static getAll() {
        return Object.entries(TIMEZONE_DATA)
            .map(([tz, data]) => ({ tz, ...data }))
            .sort((a, b) => a.city.localeCompare(b.city));
    }

    static isValid(tz) {
        return tz in TIMEZONE_DATA;
    }

    static getData(tz) {
        return TIMEZONE_DATA[tz] || null;
    }
}
