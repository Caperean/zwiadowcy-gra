import { level0 } from "./level0.js";
import { level1 } from "./level1.js";
import { level2 } from "./level2.js";
import { level3 } from "./level3.js";
import { level4 } from "./level4.js";
import { level5 } from "./level5.js";
import { level6 } from "./level6.js";
import { level7 } from "./level7.js";
import { level8 } from "./level8.js";


// Tutaj będziesz dodawać kolejne poziomy
export const allLevels = [
    { name: "level0.js", data: level0 }, // poziom testowy żeby nie przechodzić wszystkiego 
    { name: "level1.js", data: level1 },
    { name: "level2.js", data: level2 },
    { name: "level3.js", data: level3 },
    { name: "level4.js", data: level4 },
    { name: "level5.js", data: level5 },
    { name: "level6.js", data: level6 },
    { name: "level7.js", data: level7 },
    { name: "level8.js", data: level8 },
    // Dodaj tu więcej poziomów, np.:
    // { name: "level2.js", data: level2 },
    // { name: "level3.js", data: level3 },
];
