export const level2 = {
    backgroundColor: "#add8e6",
    map: [
        "N........................",                            // R-skała
        "#........................",                             // G-trawa
        "#....NWIIWIIWIIWNN.......",                             // #-blok ziemi
        "#NNNN#############.......",                             // N-śnieg
        ".........................",                            // I-lód
        ".........................",                            // L-lawa
        ".........................",                           //  W-water 
        "....N...................N",                          //   S-kolce
        "....#NNNNNN.NNN....NNNNNN",                           //  M-magma
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
       { type: "wolf", x: 400, y: 100 },
       { type: "exitgate", x: 400, y: 100 }
    ]
};
