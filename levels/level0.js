export const level0 = {                             //poziom testowy żeby nie przechodzić wszystkiego
    backgroundColor: "#add8e6",
    map: [
        "G....WG..................#",                            // R-skała
        "#....W#..................#",                             // G-trawa
        "#....W#GGGG..............#",                             // #-blok ziemi
        ".G...W...................#",                             // N-śnieg
        ".....WW..................#",                            // I-lód
        ".....GW..................#",                            // L-lawa
        "......W..................#",                              // P- piasek
        "......W..................#",                            //   S-kolce
        "......W..................#",                           //  M-magma
        ".G....W..................#",                             // A- marmur
        ".#WWWWWG.................#",                           // C- cegła
        ".#######.................#",
        ".........................#",
        ".........................#", 
        "GGGGGGGGGGGGG............#",
        ],
    objects: [
        { type: "player", x: 20, y: 33 },
         { type: "wilk", x: 332, y: 33 },
         { type: "wilk", x: 332, y: 50 },
         { type: "wilk", x: 332, y: 75 },
         { type: "wilk", x: 332, y: 100 },
    ]
       
};
