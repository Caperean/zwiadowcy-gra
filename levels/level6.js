export const level6 = {
    backgroundColor: "#add8e6",
    map: [
        "PPPPPPPPPPPPPPPPPPPPPPPPP",                            // R-skała
        "P........................R",                             // G-trawa
        "P........................R",                             // #-blok ziemi
        "AAAAAA...................R",                             // N-śnieg
        "P........................R",                            // I-lód
        "P........................R",                            // L-lawa
        "P........................R",                           //  W-water 
        "P........................R",                          //   S-kolce
        "P........................R",                           //  M-magma
        "P........................R",                             // A-marmur
        "P....CCCC................R",                           // C-cegły
        "P.......C................R",                           
        "P.......C................R",                           
        "PPPPPPPPPPP........D....D.R",
        "PPPPPPPPPPPPPPWWWWPPDDDDWR",
    ],
    objects: [
       { type: "player", x: 25, y: 25 },
        { type: "bat", x: 500, y: 80 },
        { type: "bat", x: 400, y: 80 },   
   { type: "bat", x: 300, y: 80 },  
         { type: "clown", x: 400, y: 100 },
       { type: "palm", x: 200, y: 120, width: 150, height: 240 },
        { type: "ship", x: 300, y: 120, width: 150, height: 100 },
        { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
    ]
};
