import {Language} from "../../language.js";
import configSudoku from "./configSudoku.js";

const getConfigDifficultyItems = () => {
    return [
        {key: configSudoku.difficulties[0], label: Language.data["difficulty"]["easy"], color: '#59c27d', hoverColor: '#afbfff'},
        {key: configSudoku.difficulties[1], label: Language.data["difficulty"]["medium"], color: '#ffb347', hoverColor: '#afbfff'},
        {key: configSudoku.difficulties[2], label: Language.data["difficulty"]["hard"], color: '#ff5a5a', hoverColor: '#afbfff'},
    ];
}

export default getConfigDifficultyItems;