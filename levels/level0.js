export const level0 = {                             //poziom testowy żeby nie przechodzić wszystkiego
    backgroundColor: "#add8e6",
    map: [
        "#........................#",                            // R-skała
        "#........................#",                             // G-trawa
        "#........................#",                             // #-blok ziemi
        "#........................#",                             // N-śnieg
        "#.........AAAAAA.........#",                            // I-lód
        "#.........A....AG..G.....#",                            // L-lawa
        "#.........A....A#WW#G....#", 
        "#..............A#####....#",                            //   S-kolce
        "#.......A......A.....G...#",                           //  M-magma
        "#.......AAAAAAAA......G..#",                             // A- marmur
        "#........................#",                           // C- cegła
        "#.......................G#",
        "#......................G##",
        "#......#...........#..G..#", 
        "###WW#W#############WWWWW#",
        ],
    objects: [
        { type: "player", x: 36, y: 390 },
        { type: "wolf", x: 450, y: 390 },
        { type: "wolf", x: 425, y: 390 },
        { type: "clown", x: 400, y: 125 },
        { type: "apple", x: 512, y: 130 },  
         { type: "bot", x: 700, y: 70 },   
              
       
        { type: "exitGate", x: 400, y: 200, width: 64, height: 64 }
    ]
};
