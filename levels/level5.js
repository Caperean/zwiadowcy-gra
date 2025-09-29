export const level5 = {
    backgroundColor: "#911313",
    map: [
        "M........................",   
        "M.......................",// R-skała
        "M........................",                             // G-trawa
        "MMMLMMLLMMLLMMLLMMLLMMM..",                             // #-blok ziemi
        "MMMMMMMMMMMMMMMMMMMM......",                             // N-śnieg
        "M........................",                            // I-lód                             L-lawa
        "M........................",                           //  W-water 
        "M...........................",                          //   S-kolce
        "M.........................",                           //  M-magma
        "M..........................",                             
        "M..MMM..............M..",                           
        "M...... MMM......MLLLLLLLM",                           
        "M............MM...........",                           
        "M..............MMMMM.......",
        "MLLLLLLLLLLLLLLLLLLLLMMMMMM",
    ],
    objects: [
       { type: "player", x: 60, y: 15 },
       { type: "mag", x: 600, y: 400 },
        
       { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
       
    ]
};
