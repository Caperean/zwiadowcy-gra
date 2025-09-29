export const level5 = {
    backgroundColor: "#911313",
    map: [
        "M........................M",   
        "M........................M",// R-skała
        "M........................M",                             // G-trawa
        "MMMLMMLLMMLLMMLLMMLLMMM..M",                             // #-blok ziemi
        "MMMMMMMMMMMMMMMMMMMM.....M",                             // N-śnieg
        "M........................M",                            // I-lód                             L-lawa
        "M........................M",                           //  W-water 
        "M..MMMMMMMMMMMMMM..MMLMLLM",                          //   S-kolce
        "MM...............MLMMMMMMM",                           //  M-magma
        "MMM..............MMM.....M",                             
        ".....MM..................M",                           
        "M........MM..............M",                           
        "M............MM..........M",                           
        "M..............MMMMM.....M",
        "MLLLLLLLLLLLLLLLLLLLLMMMMM",
    ],
    objects: [
       { type: "player", x: 60, y: 15 },
       { type: "Mag", x: 600, y: 400 },
        
       { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
       
    ]
};
