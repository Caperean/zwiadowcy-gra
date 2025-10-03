export const level6 = {
    backgroundColor: "#add8e6",
    map: [
        "PPPPPPPPPPPPPPPPPPPPPPPPP",                            // R-skała
        "P.......................R",                             // G-trawa
        "P.......................R",                             // #-blok ziemi
        "PPPPPP.............. ...R",                             // N-śnieg
        "P.......................R",                            // I-lód
        "P.......................R",                            // L-lawa
        "P.......................R",                           //  W-water 
        "P.......................R",                          //   S-kolce
        "P.......................R",                           //  M-magma
        "P.......................R",                             
        "P.......................R",                           
        "P.......................R",                           
        "P.......................R",                           
        "PPPPPPPPPPP.............R",
        "PPPPPPPPPPPPPPWWWWWWWWWW",
    ],
    objects: [
       { type: "player", x: 15, y: 15 },
        { type: "bat", x: 500, y: 80 },
        { type: "bat", x: 400, y: 80 },   
   { type: "bat", x: 300, y: 80 },   
       
        { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
    ]
};
