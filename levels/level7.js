export const level7 = {
    backgroundColor: "#add8e6",
    map: [
        ".........................R",                            // R-skała
        "#...............G........R",                             // G-trawa
        "#GGGGGGGGGGGGGGG#GG......R",                             // #-blok ziemi
        "#...................G....R",                             // N-śnieg
        "#........................R",                            // I-lód
        "#...GGGG.............GGGR",                            // L-lawa
        "#..G....GGGGG..GG..GG....R",                           //  W-water 
        "#........................R",                          //   S-kolce
        "#G.......................R",                           //  M-magma
        "#.GGG....................R",                             // A-marmur
        "#......G.................R",                           // C-cegły
        "#.......GG...............R",                           
        "#...........G............R",                           
        "#...........#............R",
        "#GGGWWGGGGGGGWWWWWWWWWWWGR",
    ],
    objects: [
       { type: "player", x: 36, y: 390 },  
        { type: "wolf", x: 40, y: 25 },
        { type: "exitGate", x: 25, y: 25, width: 64, height: 64 }
    ]
};
