export const level18 = {
    backgroundColor: "#add8e6",
    map: [
        "P........................",                            // R-skała
        "P........................#",                             // G-trawa
        "P........................#",                             // #-blok ziemi
        "PPP..P...................#",                             // N-śnieg
        "P........................#",                            // I-lód
        "P........................#",                            // L-lawa
        "P........................#",                           //  W-water 
        "P........................#",                          //   S-kolce
        "P........................#",                          //  M-magma
        "P....SSSS................#",                             // A-marmur
        "P....CCCC.....P..........#",                           // C-cegły
        "P............P...........#",                           
        "P........................#",                           
        ".........................#",
        ".........................#",
    ],
    objects: [
       { type: "player", x: 33, y: 25 },
        { type: "bat", x: 500, y: 80 },
        { type: "bat", x: 400, y: 80 },   
   { type: "bat", x: 300, y: 80 },  
         { type: "clown", x: 380, y: 100 },
          { type: "boar", x: 80, y: 110 },
           { type: "wolf", x: 80, y: 100 },
          { type: "clown", x: 80, y: 300 },
       { type: "palm", x: 300, y: 210, width: 150, height: 240 },
       { type: "palm", x: 35, y: 180, width: 150, height: 240 },
        { type: "ship", x: 460, y: 353, width: 150, height: 100 },
        { type: "exitGate", x: 740, y: 400, width: 64, height: 64 },
      //  { type: "key", x: 400, y: 100 },
       // { type: "gate", x: 300, y: 100 },
    ]
};
