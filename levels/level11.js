export const level11 = {
    backgroundColor: "#add8e6",
    map: [
        "S.....RRRRRR.............R",                            // R-skała
        "R...R....................R",                             // G-trawa
        "R...........RLRLRLLRLLR..R",                             // #-blok ziemi
        "RR.......R..RRRRRRRRRRR..R",                             // N-śnieg
        "R.....RR....R.........RRRR",                            // I-lód
        "R..RR......RR............R",                            // L-lawa
        "RLLR........R............R",                           //  W-water 
        "RRR....RRLR.RRRRRLRRLRR..R",                          //   S-kolce
        "M....M.MMM.......M..M....R",                           //  M-magma
        "M...MM...................R",                             // A-marmur
        "M..M.....................R",                           // C-cegły
        "MM......M.M...........M..R",                           
        "MM...MM.....M.M..........R",                           
        "..M.M...........M.M......R",
        "LLLLLLLLLLLLLLLLLLLMMMLLLL",
    ],
    objects: [
       { type: "player", x: 430, y: 150 },
        { type: "mage", x: 700, y: 0 },
        { type: "bat", x: 350, y: 280 },
       
        { type: "exitGate", x: 730, y: 65, width: 64, height: 64 }
    ]
};
