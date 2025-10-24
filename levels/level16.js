export const level16 = {
    backgroundColor: "#add8e6",
    map: [
        "G........................#",                            // R-skała
        "#........................#",                             // G-trawa
        "#....................KKKK#",                             // #-blok ziemi
        "#........................#",                             // N-śnieg
        "#........................#",                            // I-lód
        "#...................K.K..#",                            // L-lawa
        "#...................K.K..#.",                           //  W-water 
        "#..................KKSK..#.",                          //   S-kolce
        "#.................KKKKK..#",                           //  M-magma
        "#.................KKKKK..#",                             
        "#................KKKKKK..#",                           
        "#................KKK.....#",                          
        "#.............K.K........#",                           
        "#.....G.......KSK........#",
        "#WWWWWWGGGGGGGKKKKKSKSKSS#", //granica widzenia
     
    ],
    objects: [
       { type: "player", x: 300, y: 330 },
       { type: "clown", x: 660, y: 15 } ,      
        { type: "clown", x: 685, y: 15 } ,   
        { type: "maj", x: 250, y: 280, width: 170, height: 170 },
        { type: "exitGate", x: 555, y: 400, width: 64, height: 64 }
    ]
};
