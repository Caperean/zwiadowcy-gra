export const level6 = {
    backgroundColor: "#add8e6",
    map: [
        "RRRRRRRRRRRRRRRRRRRRRRRRR",                            // R-skała
        "R.......................R",                             // G-trawa
        "R.......................R",                             // #-blok ziemi
        "RRRRRR.............. ...R",                             // N-śnieg
        "R.......................R",                            // I-lód
        "R.......................R",                            // L-lawa
        "R.......................R",                           //  W-water 
        "R.......................R",                          //   S-kolce
        "R.......................R",                           //  M-magma
        "R.......................R",                             
        "R.......................R",                           
        "R.......................R",                           
        "R.......................R",                           
        "RPPPPPPPPPP.............R",
        "RPPPPPPPPPPPPPWWWWWWWWWW",
    ],
    objects: [
       { type: "player", x: 15, y: 15 },
        { type: "bat", x: 500, y: 80 },
        { type: "bat", x: 400, y: 80 },   
   { type: "bat", x: 300, y: 80 },   
       
        { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
    ]
};
