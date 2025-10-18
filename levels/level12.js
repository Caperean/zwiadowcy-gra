export const level12 = {
    backgroundColor: "#add8e6",
    map: [
        "G........................S",                            // R-skała
        "#......#......G..G..G....R",                             // G-trawa
        "#......#....G............R",                             // #-blok ziemi
        "#........G..#........G...R",                             // N-śnieg
        "#GGG........#G....GG#...R",                            // I-lód
        "#.....G.........G........R",                            // L-lawa
        "#........G........G......R",                           //  W-water 
        "#....................GG..R",                          //   S-kolce
        "#..................G.....R",                           //  M-magma
        "#...............G...........................R",                             // A-marmur
        "#...........................................R",                           // C-cegły
        "#.................G.........................R",                           
        "#.....................G..PPSSSSSSSPPPPPPPPPPR",                           
        "#........................R",
        "#GGGGGGGGGGGGGGGGGGGGGGGGGR",
    ],
    objects: [
       { type: "player", x: 33, y:450 },
        { type: "tatr", x: 1000, y: 200 },
        { type: "bat", x: 320, y: 350 },
       
        { type: "exitGate", x: 33, y: 168, width: 64, height: 64 }
    ]
};
