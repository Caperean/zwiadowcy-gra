export const level4 = {
    backgroundColor: "#add8e6",
    map: [
        "RRRRRRRRRRRRRRRRRRRRRRRRR",                            // R-skała
        "R....R..................R",                             // G-trawa
        "R....R..................R",                             // #-blok ziemi
        "RRR..R..................R",                             // N-śnieg
        "R....R..................R",                            // I-lód
        "R....R..................R",                            // L-lawa
        "R....R..................R",                           //  W-water 
        "R....R..................R",                          //   S-kolce
        "R....R..................R",                           //  M-magma
        "R....R..................R",                             
        "R....R..................R",                           
        "R..RRR..................R",                           
        "R.......................R",                           
        "R.......................R",
        "RRRRRRRRRSRRSSRRRRRRRRRRR",
    ],
    objects: [
       { type: "player", x: 15, y: 15 },
        { type: "bat", x: 500, y: 80 },
        { type: "bat", x: 400, y: 80 },   
   { type: "bat", x: 300, y: 80 },   
       
        { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
    ]
};
