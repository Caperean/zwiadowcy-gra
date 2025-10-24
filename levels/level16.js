export const level16 = {
    backgroundColor: "#add8e6",
    map: [
        "G........................#",                            // R-skała
        "#........................#",                             // G-trawa
        "#..........G.........KKKK#",                             // #-blok ziemi
        "#..........#...G.........#",                             // N-śnieg
        "#.........G.GGG..........#",                            // I-lód
        "#...................K.K..#",                            // L-lawa
        "#....G..G...........K.K..#.",                           //  W-water 
        "#..G...............KKSK..#.",                          //   S-kolce
        "#.................KKKKK..#",                           //  M-magma
        "#G....G...........KKKKK..#",                             
        "#................KKKKKK..#",                           
        "#..G....G........K.......#",                          
        "#.............K.K........#",                           
        "#.....G.......KSK........#",
        "#WWWWWWGGGGGGGKKKKKSKSKSS#", //granica widzenia
     
    ],
    objects: [
       { type: "player", x: 300, y: 330 },
        { type: "boar", x: 360, y: 330 },
        { type: "boar", x: 374, y: 20 },
       { type: "clown", x: 660, y: 15 } , 
        { type: "bat", x: 160, y: 60 } , 
         { type: "bat", x: 190, y: 60 } , 
         { type: "bat", x: 50, y: 60 } , 
        { type: "clown", x: 685, y: 15 } ,   
        { type: "maj", x: 250, y: 280, width: 170, height: 170 },
        { type: "exitGate", x: 535, y: 400, width: 64, height: 64 }
    ]
};
