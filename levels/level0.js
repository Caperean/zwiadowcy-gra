export const level0 = {                             //poziom testowy żeby nie przechodzić wszystkiego
    backgroundColor: "#add8e6",
    map: [
        "..................P......#",                            // R-skała
        "........C...CCCCCCP......#",                             // G-trawa
        "....C.............P..PSP.#",                             // #-blok ziemi
        "..C..CCC.CCC......PPSPP..#",                             // N-śnieg
        "..CC.....................#",                            // I-lód
        "....C....................#",                            // L-lawa
        ".CC..............PSP.....#",                              // P- piasek
        ".CCC.......C........SPSSP#",                            //   S-kolce
        ".CC.C.......CCC..........#",                           //  M-magma
        "C.C.............CCCCC....#",                             // A- marmur
        "C..C..............C...C..#",                           // C- cegła
        "CC......................C#",
        ".........P...............#",
        "...CP....P....PPPPPPPPPPP#", 
        "CCCCPPPPPPPPPPPPPPPPPPPPP#",
        ],
    objects: [
        { type: "player", x: 610, y: 31 },
        { type: "arab", x: 96, y: 270 },
        { type: "arab", x: 96, y: 158 },
        { type: "wolf", x: 320, y: 400 },
        { type: "arab", x: 335, y: 400 },  
         { type: "wolf", x: 240, y: 400 },      
        { type: "arab", x: 96, y: 46 },  
         { type: "arab", x: 33, y: 300 },
        { type: "exitGate", x: 46, y: 390, width: 64, height: 64 }
    ]
};
