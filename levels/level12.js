export const level12 = {
    backgroundColor: "#add8e6",
    map: [
        "G........................S",                            // R-skała
        "#......#.........G..G.G..R",                             // G-trawa
        "#......#....G............R",                             // #-blok ziemi
        "#........G..#...........GR",                             // N-śnieg
        "#GGG........#G....G..GG#.R",                            // I-lód
        "#.....G.............G....R",                            // L-lawa
        "#........................R",                           //  W-water 
        "#........G.........G.....R",                          //   S-kolce
        "#........................R",                           //  M-magma
        "#...............G...........................R",                             // A-marmur
        "#.................GG........................R",                           // C-cegły
        "#...........................................R",                           
        "#.....................G.GPPSSSSSSSPPPPPPPPPPR",                           
        "#........................R",
        "#GGGGGGGGGGGGGGGGGGGGGGGGGR",
    ],
    objects: [
       { type: "player", x: 33, y:350 },
        { type: "tatar", x: 1000, y: 200 },
        { type: "bat", x: 320, y: 350 },
       
        { type: "exitGate", x: 33, y: 168, width: 64, height: 64 }
    ]
};
