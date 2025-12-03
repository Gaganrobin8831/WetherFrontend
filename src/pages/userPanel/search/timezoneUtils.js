import cityTimezones from "city-timezones";

export const getTimezoneFromCity = (cityName, countryCodeIso2) => {
    const cities = cityTimezones.lookupViaCity(cityName?.trim());
    if (!cities.length) return null;

    const cityMatch = cities.find(
        (c) => c.iso2?.toLowerCase() === countryCodeIso2?.toLowerCase()
    );

    return cityMatch ? cityMatch.timezone : cities[0].timezone;
};

export const getLocalTimeFromOffset = (offsetInSeconds) => {
    const utc = new Date(Date.now() + new Date().getTimezoneOffset() * 60000);
    return new Date(utc.getTime() + offsetInSeconds * 1000).toLocaleString();
};

export const calculateLocalTime = (fullWetherData) => {
    let localTimeString = "";
    let isValidCitySearch = true;

    if (fullWetherData?.city) {
        const city = fullWetherData.city;
        const timezoneName = getTimezoneFromCity(city?.name, city?.country);

        if (!timezoneName) {
            isValidCitySearch = true;
            localTimeString = getLocalTimeFromOffset(city.timezone);
        } else {
            try {
                localTimeString = new Date().toLocaleString("en-US", {
                    timeZone: timezoneName,
                });
                isValidCitySearch = true;
            } catch (error) {
                localTimeString = getLocalTimeFromOffset(city.timezone);
                isValidCitySearch = true;
            }
        }
    }

    return { localTimeString, isValidCitySearch };
};
