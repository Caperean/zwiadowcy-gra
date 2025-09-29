export const level5 = {
    backgroundColor: "#CB1717",
    map: [
        "M...M....................",                            // R-skała
        "M........................",                             // G-trawa
        "M.MMM..................",                             // #-blok ziemi
        "M....................",                             // N-śnieg
        "M........................",                            // I-lód
        "M.......................",                            // L-lawa
        "MMLLMMLLMMLLMMLLMMLLMMM..",                           //  W-water 
        "MMMMMMMMMMMMMMMMMMMM........",                          //   S-kolce
        "M.........................",                           //  M-magma
        "M........................MM",                             
        "M....................MM..",                           
        "M...............MMM......",                           
        "M.......MMMMMMM...........",                           
        "MMMMMM....................",
        "MLLLLLLLLLMMMMLLLLLLMMMMMM",
    ],
    objects: [
       { type: "player", x: 60, y: 15 },
       { type: "mag", x: 600, y: 400 },
        
       { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
       
    ]
};
