export const level5 = {
    backgroundColor: "#911313",
    map: [
        "M........................M",   
        "M........................M",// R-skała
        "M........................M",                             // G-trawa
        "MMMLMMLLMMLLMMLLMMLLMMM..M",                             // #-blok ziemi
        "MMMMMMMMMMMMMMMMMMMM.....M",                             // N-śnieg
        "M........................M",                            // I-lód                             L-lawa
        "M.....MMMMMM.............M",                           //  W-water 
        "M............MMMMMLMMLMLLM",                          //   S-kolce
        "MM...............MMMMMMMMM",                           //  M-magma
        "MMM......................M",                             
        ".....MM..................M",                           
        "M........MM..............M",                           
        "M............MM..........M",                           
        "M..............MMMMM.....M",
        "MLLLLLLLLLLLLLLLLLLLLMMMMM",
    ],
    objects: [
       { type: "player", x: 60, y: 15 },
       { type: "mag", x: 600, y: 400 },
        
       { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
       
    ]
};
