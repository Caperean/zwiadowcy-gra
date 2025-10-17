export const level14 = {
    backgroundColor: "#add8e6",
    map: [
        "#.....CC.................",                            // R-skała
        "#....CCCC................",                             // G-trawa
        "#...CCCCCC...............",                             // #-blok ziemi
        "#...C....C...............",                             // N-śnieg
        "#...C....................",                            // I-lód
        "#...C.......G.........G..",                            // L-lawa
        "#GGGC...CCGG#GGGGGGGGG#GG",                           //  W-water 
        "#########################",                          //   S-kolce
        "#########################",                           //  M-magma
        "#########################",                             
        "#########################",                           
        "#########################",                           
        "#########################",                           
        "#########################",
        "#########################",
    ],
    objects: [
       { type: "player", x: 700, y: 33 },
       { type: "boar", x: 500, y: 15 } ,      
         { type: "bush", x: 15, y: 130, width: 100, height: 80 } ,
         { type: "hill", x: 400, y: -100, width: 400, height: 310 } ,
         { type: "house", x: 500, y: 40, width: 200, height: 16 } ,
        
       
        { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
    ]
};
