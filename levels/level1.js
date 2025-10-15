export const level1 = {
    backgroundColor: "#add8e6",
    map: [
        "N........................",                            // R-skała
        "#........................",                             // G-trawa
        "#....NWIIWIIWIIWNN.......",                             // #-blok ziemi
        "#NNNN#############.......",                             // N-śnieg
        "#........................",                            // I-lód
        "#........................",                            // L-lawa
        "#........................",                           //  W-water 
        "#...N...................N",                          //   S-kolce
        "#...#NNNNNN.NNN.NN.NNNNNN",                           //  M-magma
        "#........................",                             
        "#........................",                           
        "#........................",                           
        "#.......................N",                           
        "#......................N#",
        "#NWIIWWIWIIWIIWIWIIWIIWN#N",
    ],
    objects: [
       { type: "player", x: 20, y: 33 },
       { type: "wolf", x: 100, y: 15 } ,      
         { type: "snowytree", x: 800, y: 10, width: 120, height: 80 } ,  
       
        { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
    ]
};
