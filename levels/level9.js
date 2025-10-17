export const level9 = {                             //poziom testowy żeby nie przechodzić wszystkiego
    backgroundColor: "#add8e6",
    map: [
        "...............SSSP......#SSS",                            // R-skała
        "..................P..P...#",                             // G-trawa
        "....C..............PSPSP.#",                             // #-blok ziemi
        "..C..................PPP.#",                             // N-śnieg
        "..CC....S..PP............#",                            // I-lód
        "....C...P....PPP..P......#",                            // L-lawa
        ".CC.....P.......PSP......#",                              // P- piasek
        ".CCC.....PPP.......P.PP.P#",                            //   S-kolce
        ".CC.C.......PPP....PSPPSP#",                           //  M-magma
        "C.C.............PPPPP..P.#",                             // A- marmur
        "C..C.....................#",                           // C- cegła
        "CC.......................#",
        ".........P...............#",
        "...CP....P....PPP.......P#", 
        "CCCCPPPPPPPPPPPPPPPPPPPPP#",
        ],
    objects: [
        { type: "player", x: 610, y: 15 },
        { type: "arab", x: 96, y: 270 },
        { type: "arab", x: 96, y: 158 },
        { type: "wolf", x: 320, y: 400 },
        { type: "arab", x: 335, y: 400 },  
         { type: "wolf", x: 240, y: 400 },      
        { type: "arab", x: 96, y: 46 },  
         { type: "arab", x: 33, y: 300 },
        { type: "bat", x: 280, y: 96 },
        { type: "wolf", x: 604, y: 400 },
         { type: "apple", x: 620, y: 400 },
          { type: "arab", x: 620, y: 400 },
         { type: "cactus", x: 110, y: 60, width: 70, height: 140 },
        { type: "exitGate", x: 46, y: 390, width: 64, height: 64 }
    ]
};
