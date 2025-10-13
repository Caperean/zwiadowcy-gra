export const level0 = {                             //poziom testowy żeby nie przechodzić wszystkiego
    backgroundColor: "#add8e6",
    map: [
        "#G....WG.................#",                            // R-skała
        "#.....T#.................#",                             // G-trawa
        "#.....T#GGGG.............#",                             // #-blok ziemi
        "#GG...T........G.........#",                             // N-śnieg
        "#S....T..................#",                            // I-lód
        "#.....T.......G..........#",                            // L-lawa
        "#.....T.....G............#",                              // P- piasek
        "#.G...T..G...............#",                            //   S-kolce
        "#.#WWWTG.................#",                           //  M-magma
        "#.######.................#",                             // A- marmur
        "#.......G....G...........#",                           // C- cegła
        "#.........G.....G........#",                          //T- pełna woda
        "#........................#",
        "#G............G..........#", 
        "##GGGGGGGGGGGGWWWWWWWWWWW#",
        ],
    objects: [
         { type: "player", x: 40, y: 35 },
          { type: "wolf", x: 20, y: 332 },
          { type: "wolf", x: 100, y: 332 },
           { type: "wolf", x: 200, y: 332 },
           { type: "wolf", x: 300, y: 332 },
         { type: "exitGate", x: 250, y: 0, width: 64, height: 64 },
         { type: "bat", x: 100, y: 532 },
           { type: "bat", x: 200, y: 432 },
           { type: "bat", x: 300, y: 300 },
         { type: "clown", x: 250, y: 0  }, 
    ]
       
};
