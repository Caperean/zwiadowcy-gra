export const level17 = {
    backgroundColor: "#add8e6",
    map: [
        ".........................R",                            // R-skała
        ".........................R",                             // G-trawa
        ".........................R",                             // #-blok ziemi
        "K.....K......KKK......R",                             // N-śnieg
        "K.....K......K.....K.....R",                            // I-lód
        "K..KK.K......K.....K.....R",                            // L-lawa
        "K.....K...KKKK.....K.....R",                           //  W-water 
        "KK....K...K........K.....R",                          //   S-kolce
        "K.KK..K...K.K......K.....R",                           //  M-magma
        "K.....K...K....K...K.....R",                             // A-marmur
        "K....KK...K.......KK.....R",                           // C-cegły
        "K..KK.K...K......K.K.....R",                           
        "K.............K....K.....R",                           
        "KK..........K............R",
        "KKKKKKKRRRKSSSSS......PPPR",
    ],
    objects: [
       { type: "player", x: 36, y: 390 },  
        
        { type: "exitGate", x: 25, y: 15, width: 64, height: 64 }
    ]
};
