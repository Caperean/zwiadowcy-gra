export const level8 = {                            
    backgroundColor: "#add8e6",
    map: [
        "#........................#",                            // R-skała
        "#....G..G................#",                             // G-trawa
        "#....#SS#................#",                             // #-blok ziemi
        "#...G####G...............#",                             // N-śnieg
        "#.........AAAAAA.........#",                            // I-lód
        "#.........A....AG..G.....#",                            // L-lawa
        "#.........A....A#WW#G....#", 
        "#..............A#####....#",                            //   S-kolce
        "#...G.G.A......A.....G...#",                           //  M-magma
        "#.......AAAAAAAA......G..#",                             // A- marmur
        "#........................#",                           // C- cegła
        "#.......................G#",
        "#......................G.#",
        "#......G...........G..G..#", 
        "#GGWWGG#GGGGGGGGGGG#WWWWW#",
        ],
    objects: [
        { type: "player", x: 36, y: 390 },
        { type: "wolf", x: 450, y: 390 },
        { type: "wolf", x: 425, y: 390 },
        { type: "clown", x: 400, y: 125 },
        { type: "apple", x: 512, y: 130 },  
        { type: "wolf", x: 480, y: 390 },    
          
       
        { type: "exitGate", x: 400, y: 220, width: 64, height: 64 }
    ]
};
