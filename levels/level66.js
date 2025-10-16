export const level66 = {
    backgroundColor: "#add8e6",
    map: [
        "R.....RRRRRR.............R",                            // R-skała
        "R...R....................R",                             // G-trawa
        "R...........RLRLRLLRLLR..R",                             // #-blok ziemi
        "RR.....R.R..RRRRRRRRRRR..R",                             // N-śnieg
        "R.....R.....R..........RRR",                            // I-lód
        "R..RR......RR............R",                            // L-lawa
        "RLLR........R............R",                           //  W-water 
        "RRM....RLRR.RRRRRLRLRLR..R",                          //   S-kolce
        "M....R.RRR.......MMMMM...R",                           //  M-magma
        "M...MM...................R",                             // A-marmur
        "M..M.....................R",                           // C-cegły
        "MM......M.M...........M..R",                           
        "MM...MM.....M.M..........R",                           
        "..M.M..........M..M......R",
        "LLLLLLLLLLLLLLLLLLLMMMLLLL",
    ],
    objects: [
       { type: "player", x: 420, y: 150 },
        { type: "mage", x: 705, y: 0 },
        { type: "bat", x: 320, y: 350 },
       
        { type: "exitGate", x: 740, y: 66, width: 64, height: 64 }
    ]
};
