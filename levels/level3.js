export const level3 = {
    backgroundColor: "#FF934A",
    map: [
        "P........................P",                            // R-skała
        "P........................P",                             // G-trawa
        "P........................P",                             // #-blok ziemi
        "P........................P",                             // N-śnieg
        "PPPPPPPP..PPP............P",                            // I-lód
        "P..............PPPPP.....P",                            // L-lawa
        "P........................P",                           //  W-water 
        "P....................PPPPP",                          //   S-kolce
        "P.P..............PPPP....P",                           //  M-magma
        "P.PPPPP.PPPPPPPPP........P",                           // P-Piasek  
        "P......P.................P",                           
        "P........................P",                           
        "P........................P",                           
        "P.......................PP",
        "PPPPPPPPPPPPPPPPPWWWPPPPPP",
    ],
    objects: [
       { type: "player", x: 50, y: 15 },
       { type: "cactus", x: 100, y: 190, width: 70, height: 100 },
         { type: "cactus", x: 110, y: -50, width: 140, height: 200 },
        { type: "bat", x: 500, y: 400 },
        { type: "arab", x: 50, y: 150 },
         { type: "arab", x: 100, y: 150 },
          { type: "arab", x: 150, y: 150 },
          { type: "arab", x: 200, y: 150 }, 
        { type: "arab", x: 250, y: 150 },
          { type: "arab", x: 300, y: 150 },
          { type: "arab", x: 350, y: 150 },
          { type: "arab", x: 400, y: 150 },
         { type: "arab", x: 500, y: 150 },
          { type: "arab", x: 450, y: 150 },
          { type: "arab", x: 550, y: 150 },
        { type: "arab", x: 50, y: 332 },
         { type: "arab", x: 100, y: 332 },
          { type: "arab", x: 150, y: 332 },
          { type: "arab", x: 200, y: 332 }, 
        { type: "arab", x: 250, y: 332 },
          { type: "arab", x: 300, y: 332 },
          { type: "arab", x: 350, y: 332 },
          { type: "arab", x: 400, y: 332 },
         { type: "arab", x: 500, y: 332 },
          { type: "arab", x: 450, y: 332 },
          { type: "arab", x: 550, y: 332 },
         { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
      
       
    ]
};
