export const level5 = {
    backgroundColor: "#911313",
    map: [
        "M........................M",   
        "M........................M",// R-skała
        "M...................MM...M",                             // G-trawa
        "MMMLMMLLMMLLMMLLMMLM.....M",                             // #-blok ziemi
        "MMMMMMMMMMMMMMMMMMM......M",                             // N-śnieg
        "M....................M....M",                            // I-lód                             L-lawa
        "M........................M",                           //  W-water 
        "M....MMMMMMMMMMMM..MMLMLLM",                          //   S-kolce
        "M................MLMMMMMMM",                           //  M-magma
        "M.MM.............MMM.....M",                             
        "M....MM..................M",                           
        "M.......M.M..............M",                           
        "M...........M.M..........M",                           
        "M..............MM.MM.....M",
        "MLLLLLLLLLLLLLLLLLLLLMMMMM",
    ],
    objects: [
       { type: "player", x: 60, y: 15 },
       { type: "mage", x: 600, y: 32 },
        { type: "volcano", x: 100, y: 400, width: 140, height: 340 },
       { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
       
    ]
};
