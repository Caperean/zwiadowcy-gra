export const level16 = {
    backgroundColor: "#add8e6",
    map: [
        "G........................#",                            // R-skała
        "#........................#",                             // G-trawa
        "#....................BBBB#",                             // #-blok ziemi
        "#........................#",                             // N-śnieg
        "#........................#",                            // I-lód
        "#...................B.B..#",                            // L-lawa
        "#...................B.B..#.",                           //  W-water 
        "#..................BBSB..#.",                          //   S-kolce
        "#.................BBBBB..#",                           //  M-magma
        "#.................BBBBB..#",                             
        "#................BBBBBB..#",                           
        "#................BBB.....#",                          
        "#.............B.BB.......#",                           
        "#.............BSB........#",
        "#GGGGGGGGGGGGGBBBBBSBSBSS#", //granica widzenia
     
    ],
    objects: [
       { type: "player", x: 300, y: 330 },
       { type: "clown", x: 660, y: 15 } ,      
         
        { type: "exitGate", x: 655, y: 420, width: 64, height: 64 }
    ]
};
