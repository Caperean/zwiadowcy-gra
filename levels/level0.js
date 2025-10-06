export const level0 = {                             //poziom testowy żeby nie przechodzić wszystkiego
    backgroundColor: "#add8e6",
    map: [
        "#........................#",                            // R-skała
        "#........................#",                             // G-trawa
        "#........................#",                             // #-blok ziemi
        "#........................#",                             // N-śnieg
        "#..........RRRRR.........#",                            // I-lód
        "#..............R.........#",                            // L-lawa
        "#..............R.........#",                           //  W-water 
        "#..........RRRRR....G....#",                          //   S-kolce
        "#........................#",                           //  M-magma
        "R.......................G#",                             // A- marmur
        "R........................#",                           // C- cegła
        "R...................G....#",                           
        "R........................#",                           
        "R.......................G#",
        "RRRWWRRWW..........GGWWWW#",
    ],
    objects: [
        { type: "player", x: 36, y: 390 },
            
   
       
        { type: "exitGate", x: 320, y: 190, width: 64, height: 64 }
    ]
};
