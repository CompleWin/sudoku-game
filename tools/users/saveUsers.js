import fs from 'fs';

const saveUsers = (USERS_FILE, users) => {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
    } catch (err) {
        console.error("Fail to save: ", err);
    }
}

export default saveUsers;