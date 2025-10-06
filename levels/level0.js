export const level0 = {                             //poziom testowy żeby nie przechodzić wszystkiego
    backgroundColor: "#add8e6",
    map: [
        "#........................#",                            // R-skała
        "#........................#",                             // G-trawa
        "#........................#",                             // #-blok ziemi
        "#........................#",                             // N-śnieg
        "#..........AAAAAA........#",                            // I-lód
        "#..........A....A........#",                            // L-lawa
        "#..........A....AG.......#",                           //  W-water 
        "#...............A#WWG....#",                          //   S-kolce
        "#........A......A####G...#",                           //  M-magma
        "#........AAAAAAAA.......##",                             // A- marmur
        "#......................###",                           // C- cegła
        "#....................#...#",                           
        "#......#..........#......#", 
        "###WW#W#############WWWWW#",
        ],
    objects: [
        { type: "player", x: 36, y: 390 },
        { type: "wolf", x: 450, y: 390 },
            
   
       
        { type: "exitGate", x: 400, y: 200, width: 64, height: 64 }
    ]
};
