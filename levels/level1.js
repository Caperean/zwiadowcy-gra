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
         { type: "mage", x: 600, y: 100 },
        { type: "exitGate", x: 700, y: 150, width: 64, height: 64 }
    ]
};
