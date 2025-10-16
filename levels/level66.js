export const level66 = {
    backgroundColor: "#add8e6",
    map: [
        "R.R...RRRRR..............R",                            // R-skała
        "R...R......R...........R.R",                             // G-trawa
        "R...........RLRLRLLRLLR..R",                             // #-blok ziemi
        "RR.....R.R..RRRRRRRRRRR..R",                             // N-śnieg
        "R.....R.....R..........RRR",                            // I-lód
        "R..RR......RR............R",                            // L-lawa
        "RLLR........R............R",                           //  W-water 
        "RRM....RLLR.RRRRRLRLRLR..R",                          //   S-kolce
        "M....R.RRR.......MMMMM...R",                           //  M-magma
        "M...MM...................R",                             // A-marmur
        "M..M.....................R",                           // C-cegły
        "MM......M.M...........MLLR",                           
        "MM...MM.....M.M..........R",                           
        "..M.M...........M.M......R",
        "LLLLLLLLLLLLLLLLLLLMMMLLLL",
    ],
    objects: [
       { type: "player", x: 400, y: 150 },
        
       
        { type: "exitGate", x: 730, y: 80, width: 64, height: 64 }
    ]
};
