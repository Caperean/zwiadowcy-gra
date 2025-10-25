export const level6 = {
    backgroundColor: "#add8e6",
    map: [
        "PPPPPPPPPPPPPPPPPPPPPPPPP",                            // R-skała
        "P........................R",                             // G-trawa
        "P........................R",                             // #-blok ziemi
        "PPP..P...................R",                             // N-śnieg
        "P........................R",                            // I-lód
        "P........................R",                            // L-lawa
        "P........................R",                           //  W-water 
        "P........................R",                          //   S-kolce
        "P......................P.R",                          //  M-magma
        "P....SSSS........P...P....R",                             // A-marmur
        "P....CCCC.....P....P....R",                           // C-cegły
        "P............P...........R",                           
        "P.........P..............R",                           
        "PPPPPPPPPPP..............R",
        "PPPPPPPPPPPPPPWWWWWWWWWWP.",
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
