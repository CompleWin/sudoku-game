import configFont from "../config/configFont.js";
import updateLayout from "../layout/updateLayout.js";
import {Language} from "../../language.js";

const createNicknameText = (scene) => {
    scene.currentUserText = scene.add.text(
        0,
        0,
        '',
        {
            fontFamily: configFont.defaultFontFamily,
            fontSize: configFont.nicknameFontSize,
            color: configFont.nicknameFontColor,
            align: configFont.nicknameAlign,
        }
    ).setOrigin(1, 1);

    fetch('/api/me', {
        credentials: 'same-origin'
    })
        .then(res => {
            if (!res.ok) {
                scene.scene.start('AuthScene');
                throw new Error('Не удалось получить данные пользователя');
            }
            return res.json();
        })
        .then(user => {
            scene.currentUser = user;
            if (scene.currentUserText) {
                scene.currentUserText.setText(Language.data["menu"]["sign"] + user.nickname);
                updateLayout(scene);
            }
        })
        .catch(err => {
            console.error('Ошибка загрузки пользователя:', err);
            if (scene.currentUserText) {
                scene.currentUserText.setText('');
            }
        });
}

export default createNicknameText;