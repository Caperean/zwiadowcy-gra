export const level2 = {
    backgroundColor: "#add8e6",
    map: [
        ".G.......................",                            // R-skała
        ".#.......................",                             // G-trawa
        ".#.......GG..............",                             // #-blok ziemi
        ".............GG..........",                             // N-śnieg
        "........GGSSS......SSSSSS",                            // I-lód
        "..........GGG....GG#GGGGG",                            // L-lawa
        ".......GG................",                           //  W-water 
        "........#................",                          //   S-kolce
        ".....GG.#................",                           //  M-magma
        "........#................",                             
        "....GG..#.....GGG........",                           
        "........#................",                           
        "...GG...#................",                           
        "........#................",
        "GGGWWWWW#GGGWWGGGGGWWGGGG",
    ],
    objects: [
       { type: "player", x: 15, y: 15 },
       { type: "Mage", x: 700, y: 400 }, 
       { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
       
    ]
};
