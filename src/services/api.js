const API_URL = 'https://petoclub.com.ar/wp-json/petoclub/v1/locales';

export const getLocales = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
};
