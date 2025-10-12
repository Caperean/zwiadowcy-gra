export const level0 = {                             //poziom testowy żeby nie przechodzić wszystkiego
    backgroundColor: "#add8e6",
    map: [
        "G....WG..................#",                            // R-skała
        "#....W#..................#",                             // G-trawa
        "#....W#GGGG..............#",                             // #-blok ziemi
        ".G...W........G..........#",                             // N-śnieg
        "S....WW..................#",                            // I-lód
        ".....GW........G.........#",                            // L-lawa
        "......W....G.............#",                              // P- piasek
        ".G....W..................#",                            //   S-kolce
        ".#WWWWWG.G...............#",                           //  M-magma
        ".#######.................#",                             // A- marmur
        "............G............#",                           // C- cegła
        "...............G.........#",
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
         { type: "clown", x: 250, y: 300 },
         { type: "bat", x: 500, y: 100 },
         { type: "bat", x: 400, y: 200 },
        { type: "bat", x: 300, y: 300 },
         { type: "clown", x: 250, y: 0 }, 
    ]
       
};
