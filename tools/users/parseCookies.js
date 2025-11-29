
const parseCookies = (cookieHeader = '') => {
    const result = {};
    if (!cookieHeader) return result;

    cookieHeader.split(';').forEach(part => {
        const [key, ...rest] = part.split('=');
        if (!key || !rest.length) return;
        const name = key.trim();
        const value = decodeURIComponent(rest.join('=').trim());
        result[name] = value;
    });

    return result;
}

export default parseCookies;