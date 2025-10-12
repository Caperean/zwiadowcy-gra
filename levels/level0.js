export const level0 = {                             //poziom testowy żeby nie przechodzić wszystkiego
    backgroundColor: "#add8e6",
    map: [
        ".........................#",                            // R-skała
        ".........................#",                             // G-trawa
        ".........................#",                             // #-blok ziemi
        ".........................#",                             // N-śnieg
        ".........................#",                            // I-lód
        "....C...................#",                            // L-lawa
        ".C......................#", 
        ".CCCC....................#",                            //   S-kolce
        ".CC.C....................#",                           //  M-magma
        "CCC.............CCCCC....#",                             // A- marmur
        "C..CC.............C...C...#",                           // C- cegła
        "C........................#",
        "C........................#",
        "C..CPPPPPPPPPPPPCCCCCPPPP#", 
        "CCCCPPPPPPPPPPPPPPPPPPPPP#",
        ],
    objects: [
        { type: "player", x: 480, y: 385 },
        { type: "arab", x: 96, y: 270 },
         { type: "arab", x: 64, y: 158 },
            
              
       
        { type: "exitGate", x: 46, y: 390, width: 64, height: 64 }
    ]
};
