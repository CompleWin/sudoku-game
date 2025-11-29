export class Language {
    static data = {};
    
    static t(path) {
        const parts = path.split(".");
        let obj = Language.data;
        for (const p of parts) {
            obj = obj[p];
            if (!obj) return path; 
        } 
        return obj;
    }
}

export function getLanguage() {
    const language = localStorage.getItem("lang");

    if (!language) {
        localStorage.setItem('lang', 'ru');
        return 'ru';
    }
    else {
        return language.toLowerCase();
    }
}

export function setLanguage(newLanguage) {

    const language = localStorage.getItem("lang");

    localStorage.setItem('lang', newLanguage.toLowerCase());
    location.reload();
}