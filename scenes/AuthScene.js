import createBackgroundImage from "../tools/create/createBackgroundImage.js";
import createLogo from "../tools/create/createLogo.js";
import {createRectangleWithStroke} from "../tools/create/createRectangle.js";
import autoLayoutEvent from "../tools/layout/autoLayoutEvent.js";
import updateLayout from "../tools/layout/updateLayout.js";
import createWelcomeText from "./authScene/createWelcomeText.js";
import createLanguageChangeButton from "../tools/create/createLanguageChangeButton.js";
import createInput from "./authScene/createInput.js";
import configAuth from "../tools/config/configAuth.js";
import createConfirmButton from "./authScene/createConfirmButton.js";

export default class AuthScene extends Phaser.Scene {
    constructor() {
        super('AuthScene');
    }

    create() {
        const {width, height} = this.scale;

        createBackgroundImage(this);
        createLogo(this);
        createLanguageChangeButton(this);

        const panelWidth = width;
        const panelHeight = height;

        createWelcomeText(this, panelWidth, panelHeight);
        createInput(this);

        createConfirmButton(this, panelWidth, panelHeight, this.inputElement);

        // Автофокус на поле
        setTimeout(() => this.inputElement.focus(), 100);

        autoLayoutEvent(this, updateLayout);
    }

    submitNickname(inputElement) {
        this.errorText.setText('');

        const nickname = (inputElement.value || '').trim();

        if (!nickname) {
            this.errorText.setText('Никнейм не может быть пустым');
            return;
        }

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nickname})
        })
            .then(async (res) => {
                if (!res.ok) {
                    const body = await res.json().catch(() => ({}));
                    const msg = body.error || `Ошибка регистрации (${res.status})`;
                    throw new Error(msg);
                }
                return res.json();
            })
            .then((user) => {
                console.log('Registered user:', user);
                // кука уже установлена, переходим в меню
                this.scene.start('MenuScene');
            })
            .catch((err) => {
                console.error(err);
                this.errorText.setText(err.message || 'Не удалось зарегистрировать никнейм');
            });
    }
}
