export const level19 = {
    backgroundColor: "#add8e6",
    map: [
        "#........................#",                            // R-skała
        "#........................#",                             // G-trawa
        "#.N...N...N...N...N...N..#",                             // #-blok ziemi
        "#N#WWWWWWWWWWWWWWW#......#",                             // N-śnieg
        "..TTT##############......#",                            // I-lód
        "..T####..................#",                            // L-lawa
        "..T......................#",                           //  W-water 
        ".WTW.....................#",                          //   S-kolce
        ".T#T.....................#",                          //  M-magma
        ".T.T.....................#",                             // A-marmur
        ".T.T.....................#",                           // C-cegły
        ".T.T..I...I...I.......III#",                           
        ".T.T.............I.......#",                           
        ".T.TII...................#",
        "WTWTWWWWWWWWWWWWWWWWWWWWWW",
    ],
    objects: [
       { type: "player", x: 33, y: 25 },
        { type: "snowman", x: 750, y: 100 },
        { type: "clown", x: 350, y: 150 },
         { type: "apple", x: 750, y: 200 },
        { type: "bat", x: 304, y: 240 },
         { type: "bat", x: 340, y: 380 },
        { type: "exitGate", x: 740, y: 400, width: 64, height: 64 },
     
           ]
};
