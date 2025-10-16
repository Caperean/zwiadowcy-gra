export const level11 = {
    backgroundColor: "#add8e6",
    map: [
        "R.R....RRRR..............R",                            // R-skała
        "R...R.RR...............R.R",                             // G-trawa
        "R..........RLLRLRLLRLLR..R",                             // #-blok ziemi
        "RR..........RRRRRRRRRRR..R",                             // N-śnieg
        "R.....R..R..R.........RRRR",                            // I-lód
        "R..R.......RR............R",                            // L-lawa
        "RLLR........R............R",                           //  W-water 
        "RRM....RLLRRRRRRRLLRLLR..R",                          //   S-kolce
        "M....R.RRR.......MMMMM...R",                           //  M-magma
        "M...MM...................R",                             // A-marmur
        "M..M.....................R",                           // C-cegły
        "MM......M.M...........MLLR",                           
        "MM...MM.....M.M..........R",                           
        "..M.M...........M.M......R",
        "LLLLLLLLLLLLLLLLLLLMMMLLLL",
    ],
    objects: [
       { type: "player", x: 400, y: 250 },
        
       
        { type: "exitGate", x: 800, y: 150, width: 64, height: 64 }
    ]
};
