class Language {
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