import createBackgroundImage from "../tools/create/createBackgroundImage.js";
import createLogo from "../tools/create/createLogo.js";

export default class AuthScene extends Phaser.Scene {
    constructor() {
        super('AuthScene');
    }

    create() {
        const { width, height } = this.scale;

        createBackgroundImage(this);
        createLogo(this);

        // ---------- Прямоугольник по центру ----------
        const panelWidth = width * 0.6;
        const panelHeight = height * 0.4;

        const panel = this.add.rectangle(
            width / 2,
            height / 2,
            panelWidth,
            panelHeight,
            0x000000,
            0.75
        );
        panel.setStrokeStyle(2, 0xffffff, 0.9);

        // ---------- Текст приветствия ----------
        const textStyle = {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: panelWidth * 0.9 }
        };

        this.add.text(
            width / 2,
            height / 2 - panelHeight * 0.25,
            'Добро пожаловать на сайт по игре в Судоку!\n\nПожалуйста, введите ваш никнейм:',
            textStyle
        ).setOrigin(0.5);

        // ---------- Поле ввода (HTML input) ----------
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.placeholder = 'Ваш никнейм';
        inputElement.maxLength = 20;

        // Оформление инпута
        inputElement.style.padding = '8px 12px';
        inputElement.style.fontSize = '18px';
        inputElement.style.borderRadius = '8px';
        inputElement.style.border = '1px solid #ccc';
        inputElement.style.outline = 'none';
        inputElement.style.width = '260px';
        inputElement.style.boxSizing = 'border-box';
        inputElement.style.textAlign = 'center';

        const inputDom = this.add.dom(
            width / 2,
            height / 2,          // примерно центр панели
            inputElement
        );

        // ---------- Кнопка "Продолжить" ----------
        const buttonY = height / 2 + panelHeight * 0.2;

        const buttonBg = this.add.rectangle(
            width / 2,
            buttonY,
            220,
            50,
            0xffffff,
            1
        )
            .setInteractive({ useHandCursor: true });

        const buttonText = this.add.text(
            width / 2,
            buttonY,
            'Продолжить',
            {
                fontFamily: 'Arial',
                fontSize: '22px',
                color: '#000000'
            }
        ).setOrigin(0.5);

        // Группа для удобного наведения
        const buttonContainer = this.add.container(0, 0, [buttonBg, buttonText]);

        buttonBg.on('pointerover', () => {
            buttonBg.setAlpha(0.9);
            buttonText.setStyle({ color: '#222222' });
        });

        buttonBg.on('pointerout', () => {
            buttonBg.setAlpha(1);
            buttonText.setStyle({ color: '#000000' });
        });

        buttonBg.on('pointerup', () => {
            this.submitNickname(inputElement);
        });

        // ---------- Текст ошибки ----------
        this.errorText = this.add.text(
            width / 2,
            height / 2 + panelHeight * 0.05,
            '',
            {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#ff8080',
                align: 'center',
                wordWrap: { width: panelWidth * 0.9 }
            }
        ).setOrigin(0.5);

        // ---------- Обработка Enter ----------
        this.input.keyboard.on('keydown-ENTER', () => {
            this.submitNickname(inputElement);
        });

        // Автофокус на поле
        setTimeout(() => inputElement.focus(), 100);
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
            body: JSON.stringify({ nickname })
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
