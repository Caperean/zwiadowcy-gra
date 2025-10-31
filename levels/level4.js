export const level4 = {
    backgroundColor: "#add8e6",
    map: [
        "RRRRRRRRRRRRRRR.....RRRRR",                            // R-skała
        "R....R..................R",                             // G-trawa
        "R....R..................R",                             // #-blok ziemi
        "RRR..R..................R",                             // N-śnieg
        "R....R.........R...R..R.R",                            // I-lód
        "R....R................R.R",                            // L-lawa
        "R....R.......R........R.R",                           //  W-water 
        "R....R........R.......R.R",                          //   S-kolce
        "R....R.........R...R..R.R",                           //  M-magma
        "R....R................R.R",                             
        "R....R...............RR.R",                           
        "R..RRR........RR...RR...R",                           
        "R..........R..RR...RR...R",                           
        "R.........RR..RR...RR...R",
        "RRRRRRRRRSRRSSRRSSSRRRRRR",
    ],
    objects: [
       { type: "player", x: 33, y: 25 },
        { type: "bat", x: 500, y: 80 },
        { type: "bat", x: 400, y: 80 },   
   { type: "bat", x: 300, y: 80 },
          { type: "bat", x: 500, y: 100 },
        { type: "bat", x: 400, y: 80 },   
   { type: "bat", x: 300, y: 100 },   
       
        { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
    ]
};
