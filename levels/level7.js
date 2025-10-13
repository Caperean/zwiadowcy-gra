export const level7 = {
    backgroundColor: "#add8e6",
    map: [
        "#........................R",                            // R-skała
        "#.............G..........R",                             // G-trawa
        "#GGGGGGGGGGGGG#G..G......R",                             // #-blok ziemi
        "#...................G....R",                             // N-śnieg
        "#........................R",                            // I-lód
        "#...GGGG..............GGGR",                            // L-lawa
        "#.......GG...........G...R",                           //  W-water 
        "#.G.......GG..GG..GG.....R",                          //   S-kolce
        "#W#.GG...................R",                           //  M-magma
        "###G.....................R",                             // A-marmur
        "#......G.................R",                           // C-cegły
        "#.......GG...............R",                           
        "#...........G............R",                           
        "#...........#............R",
        "#GGGWWGGGGGGGWWWWWWWWWWWWR",
    ],
    objects: [
       { type: "player", x: 36, y: 390 },  
        { type: "wolf", x: 40, y: 25 },
         { type: "spruce", x: 36, y: 380, width: 48, height: 100 },
         { type: "bush", x: 150, y: 410, width: 60, height: 30 },
         { type: "bush", x: 160, y: 35, width: 60, height: 30 },
        { type: "exitGate", x: 25, y: 15, width: 64, height: 64 }
    ]
};
