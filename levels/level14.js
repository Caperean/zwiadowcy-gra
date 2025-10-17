export const level14 = {
    backgroundColor: "#add8e6",
    map: [
        "#.....CC.................",                            // R-skała
        "#....CCCC................",                             // G-trawa
        "#...CCCCCC...............",                             // #-blok ziemi
        "#...C....C...............",                             // N-śnieg
        "#...C....................",                            // I-lód
        "#...C.......G.........G..",                            // L-lawa
        "#GGGC...CCGG#GGGGGGGGG#GG",                           //  W-water 
        "####....#################",                          //   S-kolce
        "##......#################",                           //  M-magma
        "##....#S######.......####",                             
        "##.##...#####.........###",                           
        "##......#####.........###",                           
        "##......................#",                           
        "##...#..................#",
        "####SSS#########SS##S####",
    ],
    objects: [
       { type: "player", x: 700, y: 33 },
       { type: "boar", x: 500, y: 15 } ,      
         { type: "bush", x: 15, y: 130, width: 100, height: 80 } ,
         { type: "hill", x: 410, y: -100, width: 300, height: 300 } ,
         { type: "house", x: 500, y: 60, width: 200, height: 160 } ,
        { type: "bat", x: 561, y: 320 } , 
        { type: "bat", x: 570, y: 320 } ,
         { type: "bat", x: 521, y: 320 } ,
        { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
    ]
};
