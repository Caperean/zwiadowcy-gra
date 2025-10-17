export const level13 = {
    backgroundColor: "#add8e6",
    map: [
        "#........................M",                            // R-skała
        "#........................M",                             // G-trawa
        "#........................M",                             // #-blok ziemi
        "#........................M",                             // N-śnieg
        "#........................M",                            // I-lód
        "#GGGGGGGGGGGGGGGGGGGG....M",                            // L-lawa
        "#........................M",                           //  W-water 
        "#........................M",                          //   S-kolce
        "#........................P",                           //  M-magma
        "#........................P",                             
        "#........................P",                           
        "#........................P",                           
        "#........................P",                           
        "#......................#.#",
        "#GGGGGGGGGGGGGGGGGGGGGGGWG",
    ],
    objects: [
       { type: "player", x: 20, y: 33 },
       { type: "wolf", x: 100, y: 15 } ,      
         { type: "tree", x: 80, y: 100, width: 120, height: 200 } ,  
       { type: "boar", x: 100, y: 300 } ,
        { type: "exitGate", x: 50, y: 400, width: 64, height: 64 }
    ]
};
