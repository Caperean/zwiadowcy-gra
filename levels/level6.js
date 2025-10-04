export const level6 = {
    backgroundColor: "#add8e6",
    map: [
        "PPPPPPPPPPPPPPPPPPPPPPPPP",                            // R-skała
        "P.......................R",                             // G-trawa
        "P.......................R",                             // #-blok ziemi
        "AAAAAA.............. ...R",                             // N-śnieg
        "A.......................R",                            // I-lód
        "A.......................R",                            // L-lawa
        "A.......................R",                           //  W-water 
        "A.......................R",                          //   S-kolce
        "A.......................R",                           //  M-magma
        "A.......................R",                             // A-marmur
        "A....CCCC.............R",                           // C-cegły
        "A.......C...............R",                           
        "A.......C...............R",                           
        "PPPPPPPPPPP.............R",
        "PPPPPPPPPPPPPPWWWWWWWWWW",
    ],
    objects: [
       { type: "player", x: 15, y: 15 },
        { type: "bat", x: 500, y: 80 },
        { type: "bat", x: 400, y: 80 },   
   { type: "bat", x: 300, y: 80 },  
         { type: "clown", x: 400, y: 100 },
       
        { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
    ]
};
