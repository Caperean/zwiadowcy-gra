export const level11 = {
    backgroundColor: "#add8e6",
    map: [
        "R.........................R",                            // R-skała
        "R.R.R..R.RR.............R.R",                             // G-trawa
        "R....R.....RLLRL..........R",                             // #-blok ziemi
        "RR..........R.............R",                             // N-śnieg
        "R........R..RRRRRRRRRRRRRRR",                            // I-lód
        "R..R..R....RR.............R",                            // L-lawa
        "RLLR........R.............R",                           //  W-water 
        "RRM....RLLRRRRRR.........R",                          //   S-kolce
        "M......RRR......MLLMLLM...R",                           //  M-magma
        "M...MM.............MMM....R",                             // A-marmur
        "M..M.....................R",                           // C-cegły
        "MM......M.M............MLLR",                           
        "M.MMM.M.....M.M...........R",                           
        "................M.M.......R",
        "LLLLLLLLLLLLLLLLLLLLMMMLLLM",
    ],
    objects: [
       { type: "player", x: 400, y: 270 },
        
       
        { type: "exitGate", x: 1000, y: 150, width: 64, height: 64 }
    ]
};
