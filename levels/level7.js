export const level7 = {
    backgroundColor: "#add8e6",
    map: [
        ".........................R",                            // R-skała
        "#...............G........R",                             // G-trawa
        "#GGGGGGGGGGGGGGG#GG......R",                             // #-blok ziemi
        "#...................G....R",                             // N-śnieg
        "#........................R",                            // I-lód
        "#...GGG..............GGGR",                            // L-lawa
        "#..G...GGGGGG..GG..GG....R",                           //  W-water 
        "#........................R",                          //   S-kolce
        "#G.......................R",                           //  M-magma
        "#.GGG....................R",                             // A-marmur
        "#......G.................R",                           // C-cegły
        "#.......GG...............R",                           
        "#...........G............R",                           
        "#...........#............R",
        "#GGWWGGGGGGGGWWWWWWWWWWWGR",
    ],
    objects: [
       { type: "player", x: 28, y: 390 },  
        { type: "wolf", x: 40, y: 25 },
        { type: "exitGate", x: 25, y: 25, width: 64, height: 64 }
    ]
};
