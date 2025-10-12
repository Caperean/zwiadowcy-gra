export const level0 = {                             //poziom testowy żeby nie przechodzić wszystkiego
    backgroundColor: "#add8e6",
    map: [
        "G....WG..................#",                            // R-skała
        "#....W#..................#",                             // G-trawa
        "#....W#GGGG..............#",                             // #-blok ziemi
        ".G...W...................#",                             // N-śnieg
        "S....WW..................#",                            // I-lód
        ".....GW..................#",                            // L-lawa
        "......W..................#",                              // P- piasek
        ".G....W..................#",                            //   S-kolce
        ".#WWWWWG.................#",                           //  M-magma
        ".#######.................#",                             // A- marmur
        ".........................#",                           // C- cegła
        ".........................#",
        ".........................#",
        ".........................#", 
        "GGGGGGGGGGGGGWWWWWWWWWWWW#",
        ],
    objects: [
        { type: "player", x: 20, y: 35 },
          { type: "wolf", x: 332, y: 35 },
          { type: "wolf", x: 332, y: 100 },
           { type: "wolf", x: 332, y: 200 },
           { type: "wolf", x: 332, y: 300 },
         
    ]
       
};
