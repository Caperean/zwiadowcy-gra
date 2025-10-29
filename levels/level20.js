export const level20 = {
    backgroundColor: "#cf4b16ff",
    map: [
        "....M.....................#",                            // R-skała
        "....M....................M#",                             // G-trawa
        "....M...................M.#",                             // #-blok ziemi
        "M...M..................M..#",                             // N-śnieg
        "...MM.MMMMMMMMMMMMMMM.M...#",                            // I-lód
        "........................#",                            // L-lawa
        "....M.....................#",                           //  W-water 
        ".....MM.M.................#",                          //   S-kolce
        "...M..M...M.M...M.........#",                          //  M-magma
        "......M...................#",                             // A-marmur
        "......M...........M.......#",                           // C-cegły
        "M...............MM........#",                           
        ".............M............#",                           
        "..M..M.M...M..............#",
        "LLLLLLLLLLLLLLLLLLLLLLLLLLL",
    ],
    objects: [
       { type: "player", x: 3, y: 5 },
        
        { type: "clown", x: 350, y: 150 },
         { type: "apple", x: 750, y: 200 },
        { type: "bat", x: 304, y: 240 },
         { type: "bat", x: 340, y: 380 },
        { type: "exitGate", x: 720, y: 360, width: 64, height: 64 },
     
           ]
};
