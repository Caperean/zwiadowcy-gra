export const level16 = {
    backgroundColor: "#add8e6",
    map: [
        "G........................#",                            // R-skała
        "#........................#",                             // G-trawa
        "#....................KKKK#",                             // #-blok ziemi
        "#..........G...G.........#",                             // N-śnieg
        "#...........GGG..........#",                            // I-lód
        "#........G..........K.K..#",                            // L-lawa
        "#....G..G..........K.K..#.",                           //  W-water 
        "#..G...............KKSK..#.",                          //   S-kolce
        "#.................KKKKK..#",                           //  M-magma
        "#G................KKKKK..#",                             
        "#.GG..G..........KKKKKK..#",                           
        "#.......G........K.......#",                          
        "#.............K.K........#",                           
        "#.....G.......KSK........#",
        "#WWWWWWGGGGGGGKKKKKSKSKSS#", //granica widzenia
     
    ],
    objects: [
       { type: "player", x: 300, y: 330 },
        { type: "boar", x: 360, y: 330 },
       { type: "clown", x: 660, y: 15 } ,      
        { type: "clown", x: 685, y: 15 } ,   
        { type: "maj", x: 250, y: 270, width: 170, height: 170 },
        { type: "exitGate", x: 555, y: 400, width: 64, height: 64 }
    ]
};
