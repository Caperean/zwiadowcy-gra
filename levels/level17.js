export const level17 = {
    backgroundColor: "#add8e6",
    map: [
        ".........................R",                            // R-skała
        "................KKK......R",                             // G-trawa
        "...........KKKKKK........R",                             // #-blok ziemi
        "K.....K...KK.............R",                             // N-śnieg
        "K.....K...K........K.....R",                            // I-lód
        "K..KK.K...K..K..K..K.....R",                            // L-lawa
        "K.....K...K........K.....R",                           //  W-water 
        "KK....K...KK.......K.....R",                          //   S-kolce
        "K.KK..K...K.K.K.K..K.....R",                           //  M-magma
        "K.....K...K........K.....R",                             // A-marmur
        "K....KK...K.......KK.....R",                           // C-cegły
        "K..KK.K...K........K.....R",                           
        "K.............K..K.K.....R",                           
        "KK..........K......K.....R",
        "KKKKKKKRRRKSSSSSSSSKSSPPPR",
    ],
    objects: [
       { type: "player", x: 360, y: 290 },  
        { type: "arab", x: 70, y: 390 },
         { type: "cactus", x: 700, y: 300, width: 70, height: 100 },
        { type: "exitGate", x: 750, y: 350, width: 64, height: 64 }
    ]
};
