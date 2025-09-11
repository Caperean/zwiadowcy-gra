export const level1 = {
    backgroundColor: "#add8e6",
    map: [
        "RRRR.........WRRRRRRRRRRR",                            // R-skała
        "R............W..........R",                             // G-trawa
        "R............W..........R",                             // #-blok ziemi
        "R............WW.........R",                             // N-śnieg
        "RNNN....NNNNNNW...NNNN..R",                            // I-lód
        "R......N......W.........R",                            // L-lawa
        "R.............W.........R",                           //  W-water 
        "R..NNNN.......W.........R",                          //   S-kolce
        "R......N.....RWIIIR.....R",                           //  M-magma
        "R............RWWWWR.....R",                             
        "R.......NN...RRRRRR.....R",                           
        "R..................NNN..R",                           
        "R.........NNN...........R",                           
       "R.......NNN..............R",
        "NNNNNNLLLLLLLLLLLLLLLLNNN"
    ],
    objects: [
        { type: "player", x: 50, y: 50 },
        { type: "fire", x: 100, y: 416 }, // Dodany obiekt ognia
        { type: "wolf", x: 500, y: 416 },//dodany wilk
       
        { type: "bush", x: 400, y: 420, width: 64, height: 40 },
        {type: "wolf",  x: 400, y:416},
        { type: "exitGate", x: 700, y: 330, width: 80, height: 130 },
        {type: "snowytree",x: 50, y:50,width: 80, height:130 },
        {type: "wolf", x: 50, y: 416 },
        {type: "fire", x: 150, y: 100},
      
        
    ]
};
