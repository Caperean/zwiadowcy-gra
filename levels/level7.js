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
         { type: "spruce", x: 36, y: 390, width: 40, height: 85 },
         { type: "bush", x: 150, y: 390, width: 25, height: 20 },
         { type: "bush", x: 160, y: 15, width: 25, height: 20 },
        { type: "exitGate", x: 25, y: 15, width: 64, height: 64 }
    ]
};
