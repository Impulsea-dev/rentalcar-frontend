export async function getAllCountries() {
    try {
        const res = await fetch('https://restcountries.com/v3.1/all?fields=name');
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        const countries = data
            .map(c => c.name?.common)
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b));

        return countries;
    } catch (e) {
        console.error('Error fetching countries:', e);
        return [];
    }
}


export async function getCurrentCountry() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error to get  current country:', error);
        return null;
    }
}