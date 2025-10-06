export const level0 = {                             //poziom testowy żeby nie przechodzić wszystkiego
    backgroundColor: "#add8e6",
    map: [
        "#........................#",                            // R-skała
        "#........................#",                             // G-trawa
        "#........................#",                             // #-blok ziemi
        "#........................#",                             // N-śnieg
        "#..........AAAAAA........#",                            // I-lód
        "#..........A....A........#",                            // L-lawa
        "#..........A....A........#",                           //  W-water 
        "#...............A........#",                          //   S-kolce
        "#...............A........#",                           //  M-magma
        "R..........AAAAAA.......G#",                             // A- marmur
        "R........................#",                           // C- cegła
        "R...................G....#",                           
        "R........................#",                           
        "R.......................G#",
        "RRRWWRRWWGGGGGGGGGGGGWWWW#",
    ],
    objects: [
        { type: "player", x: 36, y: 390 },
            
   
       
        { type: "exitGate", x: 320, y: 190, width: 64, height: 64 }
    ]
};
