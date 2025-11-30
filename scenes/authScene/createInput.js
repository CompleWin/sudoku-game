import {Language} from "../../language.js";
import configFont from "../../tools/config/configFont.js";
import configAuth from "../../tools/config/configAuth.js";

const createInput = (scene) => {
    const {width, height} = scene.scale;

    const inputElement = document.createElement('input');

    scene.inputElement = inputElement;

    inputElement.type = 'text';
    inputElement.placeholder = Language.data["welcome"]["input_placeholder"];
    inputElement.maxLength = 20;


    inputElement.style.padding = '8px 12px';
    inputElement.style.fontSize = configFont.inputFontSize;
    inputElement.style.fontFamily = configFont.defaultFontFamily;
    inputElement.style.borderRadius = '8px';
    inputElement.style.border = '1px solid #ccc';
    inputElement.style.outline = 'none';
    inputElement.style.width = configFont.inputWidth + 'px';
    inputElement.style.boxSizing = 'border-box';
    inputElement.style.textAlign = 'center';

    const inputX = width / 2 + configAuth.inputXOffset;
    const inputY = height / 2;

    scene.inputDom = scene.add.dom(
        inputX,
        inputY,
        inputElement
    );

}

export default createInput;