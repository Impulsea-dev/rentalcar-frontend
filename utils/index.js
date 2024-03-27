export async function getAllCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countries = data.map(country => country.name.common);
        countries.sort((a, b) => a.localeCompare(b));

        return countries;
    } catch (error) {
        console.error('Error to get all countries:', error);
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