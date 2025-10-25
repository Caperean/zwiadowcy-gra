export const level17 = {
    backgroundColor: "#add8e6",
    map: [
        "K................KKK.....R",                            // R-skała
        "K...............K........R",                             // G-trawa
        "K..........KKKKK.........R",                             // #-blok ziemi
        "K.....K...K..............R",                             // N-śnieg
        "K.....K...K........K.....R",                            // I-lód
        "K..KK.K...K..K.KK..K.....R",                            // L-lawa
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
       { type: "player", x: 500, y: 250 },  
        { type: "arab", x: 70, y: 390 },
        { type: "arab", x: 460, y: 0 },
        { type: "bat", x: 70, y: 30 },
        { type: "clown", x: 500, y: 10 },
         { type: "cactus", x: 700, y: 350, width: 70, height: 100 },
        { type: "exitGate", x: 750, y: 390, width: 64, height: 64 }
    ]
};
