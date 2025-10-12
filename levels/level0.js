export const level0 = {                             //poziom testowy żeby nie przechodzić wszystkiego
    backgroundColor: "#add8e6",
    map: [
        ".........................#",                            // R-skała
        ".........................#",                             // G-trawa
        "....C....................#",                             // #-blok ziemi
        "..C......................#",                             // N-śnieg
        "..CC.....................#",                            // I-lód
        "....C....................#",                            // L-lawa
        ".CC......................#", 
        ".CCC.....................#",                            //   S-kolce
        ".CC.C....................#",                           //  M-magma
        "CCC.............CCCCC....#",                             // A- marmur
        "C..C..............C...C..#",                           // C- cegła
        "C........................#",
        "C........P...............#",
        "C..CP....P....PPCCCCCPPPP#", 
        "CCCCPPPPPPPPPPPPPPPPPPPPP#",
        ],
    objects: [
        { type: "player", x: 480, y: 385 },
        { type: "arab", x: 96, y: 270 },
        { type: "arab", x: 96, y: 158 },
        { type: "wolf", x: 320, y: 400 },
        { type: "arab", x: 335, y: 400 },  
         { type: "wolf", x: 240, y: 400 },      
       
        { type: "exitGate", x: 46, y: 390, width: 64, height: 64 }
    ]
};
