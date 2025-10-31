export const level4 = {
    backgroundColor: "#add8e6",
    map: [
        "RRRRRRRRRRRRRRRRRRRRRRRRR",                            // R-skała
        "R....R..................R",                             // G-trawa
        "R....R..................R",                             // #-blok ziemi
        "RRR..R.........R.R.R....R",                             // N-śnieg
        "R....R..................R",                            // I-lód
        "R....R.......R........R.R",                            // L-lawa
        "R....R........RR......R.R",                           //  W-water 
        "R....R.............R..R.R",                          //   S-kolce
        "R....R................R.R",                           //  M-magma
        "R....R...............RR.R",                             
        "R....R.........R...RR...R",                           
        "R..RRR........RR...RR...R",                           
        "R..........R..RR...RR...R",                           
        "R.........RR..RRSSSRR...R",
        "RRRRRRRRRSRRSSRRRRRRRRRRR",
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
