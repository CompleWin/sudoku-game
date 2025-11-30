import fs from 'fs';


const loadUsers = (USERS_FILE, users) => {
    try {
        if (fs.existsSync(USERS_FILE)) {
            const raw = fs.readFileSync(USERS_FILE, 'utf8');
            const loaded = JSON.parse(raw || '{}');

            Object.assign(users, loaded);
        } else {
            // файл нет — оставляем пустой объект
            Object.assign(users, {});
        }
    } catch (e) {
        console.error("Failed to load users: ", e);
        Object.assign(users, {});
    }
};

export default loadUsers;