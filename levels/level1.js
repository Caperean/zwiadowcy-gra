export const level1 = {
    backgroundColor: "#add8e6",
    map: [
        "N........................",                            // R-skała
        "#........................",                             // G-trawa
        "#....NWIIWIIWIIWNN.......",                             // #-blok ziemi
        "#NNNN#############.......",                             // N-śnieg
        ".........................",                            // I-lód
        ".........................",                            // L-lawa
        ".........................",                           //  W-water 
        "...........NNNNN........N",                          //   S-kolce
        "....NNNNNNN.....NNNNNNNNN",                           //  M-magma
        ".........................",                             
        ".........................",                           
        ".........................",                           
        "........................N",                           
       "........................N#",
        "NNWIIWWIWIIWIIWIWIIWIIWN#N",
    ],
    objects: [
       { type: "player", x: 15, y: 15 },
       { type: "wolf", x: 100, y: 15 } ,      
       { type: "wolf", x: 400, y: 300 }   
    ]
};
