import createBackgroundImage from "../tools/create/createBackgroundImage.js";
import createBackButton from "../tools/create/createBackButton.js";
import configFont from "../tools/config/configFont.js";
import getResponsiveFontSize from "../tools/responvisve/getResponsiveFontSize.js";
import { Language } from "../language.js";

export default class StatsScene extends Phaser.Scene {

    constructor() {
        super('StatsScene');
    }

    create() {
        createBackgroundImage(this);
        createBackButton(this);

        const stats = Language.data["stats"];

        this.titleText = this.add.text(0, 0, stats["title"], {
            fontFamily: configFont.defaultFontFamily,
            color: '#ffffff',
            fontStyle: 'bold',
        }).setOrigin(0.5);

        this.bodyText = this.add.text(0, 0, stats["loading"], {
            fontFamily: configFont.defaultFontFamily,
            color: '#ffffff',
            align: 'center',
            lineSpacing: 12,
        }).setOrigin(0.5);

        this.layout();
        this.scale.on('resize', this.layout, this);
        this.events.once('shutdown', () => this.scale.off('resize', this.layout, this));

        fetch('/api/me', { credentials: 'same-origin' })
            .then((res) => {
                if (!res.ok) throw new Error('not registered');
                return res.json();
            })
            .then((user) => this.showStats(user))
            .catch(() => {
                this.bodyText.setText(stats["empty"]);
                this.layout();
            });
    }

    showStats(user) {
        const stats = Language.data["stats"];

        const games = user.games || 0;
        const wins = user.wins || 0;
        const losses = user.losses || 0;
        const winrate = games > 0 ? Math.round((wins / games) * 100) : 0;

        const lines = [
            stats["nickname"] + (user.nickname || '—'),
            '',
            stats["wins"] + wins,
            stats["losses"] + losses,
            stats["games"] + games,
            stats["winrate"] + winrate + '%',
        ];

        this.bodyText.setText(lines.join('\n'));
        this.layout();
    }

    layout() {
        const { width, height } = this.scale;

        if (this.titleText) {
            this.titleText.setFontSize(getResponsiveFontSize(this, 40));
            this.titleText.setPosition(width / 2, height * 0.18);
        }
        if (this.bodyText) {
            this.bodyText.setFontSize(getResponsiveFontSize(this, 22));
            this.bodyText.setPosition(width / 2, height * 0.55);
        }
    }
}
