import {getResponsiveFontSize} from "./ResponsiveTools";

const fontFamily = 'Arial';

export function createButton(label, onClick) {
    const container = this.add.container(0, 0);

    const fontSize = getResponsiveFontSize(32);
    const txt = this.add.text(0, 0, label, {
        fontFamily: fontFamily,
        fontSize: fontSize + 'px',
        color: '#ffffff'
    }).setOrigin(0.5);

    container.add(txt);
    container.setSize(txt.width, txt.height);
    container.setInteractive({ useHandCursor: true });

    container.on('pointerover', () => txt.setScale(1.1));
    container.on('pointerout',  () => txt.setScale(1.0));
    container.on('pointerup', onClick);

    return container;
}