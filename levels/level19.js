export const level19 = {
    backgroundColor: "#add8e6",
    map: [
        "#........................#",                            // R-skała
        "#........................#",                             // G-trawa
        "#.N...N...N...N...N...N..#",                             // #-blok ziemi
        "#N#WWWWWWWWWWWWWWW#......#",                             // N-śnieg
        "..TTT##############......#",                            // I-lód
        "..T####..................#",                            // L-lawa
        "..T.....................#",                           //  W-water 
        ".WTW.....................#",                          //   S-kolce
        ".T#T.....................#",                          //  M-magma
        ".T.T.....................#",                             // A-marmur
        ".T.T..........I.I..I.....#",                           // C-cegły
        ".T.T.......I..........III#",                           
        ".T.T.....................#",                           
        ".T.T.........I...........#",
        "WTWTWWWWWIII.............#",
    ],
    objects: [
       { type: "player", x: 33, y: 25 },
        { type: "snowman", x: 750, y: 100 },
        { type: "clown", x: 350, y: 150 },
         { type: "apple", x: 750, y: 200 },
        { type: "bat", x: 34, y: 130 },
        { type: "exitGate", x: 740, y: 400, width: 64, height: 64 },
     
           ]
};
