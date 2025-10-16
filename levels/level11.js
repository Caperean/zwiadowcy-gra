export const level11 = {
    backgroundColor: "#add8e6",
    map: [
        "R.........................R",                            // R-skała
        "R.........................R",                             // G-trawa
        "R.........................R",                             // #-blok ziemi
        "R.RRR.....................R",                             // N-śnieg
        "RR........................R",                            // I-lód
        "R.R....R.R..RRRRRRRRRRRRRRR",                            // L-lawa
        "RLR.R.......R.............R",                           //  W-water 
        "RR.........RRRRRR.........R",                          //   S-kolce
        "M.....MLLM.......LLMLLM...R",                           //  M-magma
        "M....M.............M......R",                             // A-marmur
        "M..M................M.....R",                           // C-cegły
        "MM......M.M.........M..MLLR",                           
        "M.MMM.M.....M.M...........R",                           
        "................M.M.......R",
        "LLLLLLLLLLLLLLLLLLLLMMMLLLM",
    ],
    objects: [
       { type: "player", x: 400, y: 270 },
        
       
        { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
    ]
};
