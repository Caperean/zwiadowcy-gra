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
        ".G....W..................#",                           //  M-magma
        ".#WWWWWG.................#",                             // A- marmur
        ".#######.................#",                           // C- cegła
        ".........................#",
        ".........................#",
        ".........................#", 
        "GGGGGGGGGGGGGWWWWWWWWWWWW#",
        ],
    objects: [
        { type: "player", x: 20, y: 33 },
         { type: "wilk", x: 20, y: 332 },
         { type: "wilk", x: 50, y: 332 },
         { type: "wilk", x: 75, y: 332 },
         { type: "wilk", x: 332, y: 100 },
    ]
       
};
