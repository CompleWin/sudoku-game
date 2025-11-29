import fs from 'fs';


const loadUsers = (USERS_FILE, users) => {
    try {
        if (fs.existsSync(USERS_FILE)) {
            const raw = fs.readFileSync(USERS_FILE, 'utf8');
            users = JSON.parse(raw || '{}');
        } else {
            users = {};
        }
    } catch (e) {
        console.error("Failed to load users: ", e);
        users = {};
    }
}

export default loadUsers;