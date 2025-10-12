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
        "G............G...........#", 
        "#GGGGGGGGGGGGWWWWWWWWWWWW#",
        ],
    objects: [
        { type: "player", x: 20, y: 35 },
          { type: "wolf", x: 20, y: 332 },
          { type: "wolf", x: 100, y: 332 },
           { type: "wolf", x: 200, y: 332 },
           { type: "wolf", x: 300, y: 332 },
         
    ]
       
};
