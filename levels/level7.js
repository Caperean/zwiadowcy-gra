export const level7 = {
    backgroundColor: "#add8e6",
    map: [
        "#########################",                            // R-skała
        ".........................R",                             // G-trawa
        ".........................R",                             // #-blok ziemi
        ".........................R",                             // N-śnieg
        ".........................R",                            // I-lód
        "......................GGGR",                            // L-lawa
        "....GGGGGGGGG..GG..GG....R",                           //  W-water 
        ".........................R",                          //   S-kolce
        "GG.......................R",                           //  M-magma
        "...GG....................R",                             // A-marmur
        "......GG.................R",                           // C-cegły
        "........GG...............R",                           
        "............G...........R",                           
        "............#...........R",
        "GGGWWGGGGGGGGWWWWWWWWWWWGR",
    ],
    objects: [
       { type: "player", x: 25, y: 390 },       
        { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
    ]
};
