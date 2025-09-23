export const level2 = {
    backgroundColor: "#add8e6",
    map: [
        ".........................",                            // R-skała
        ".........................",                             // G-trawa
        ".........GG..............",                             // #-blok ziemi
        "...S.........GG..........",                             // N-śnieg
        "........GGSSS......SSSSSS",                            // I-lód
        "..........GGG....GG#GGGGG",                            // L-lawa
        "S..S...GG........#.......",                           //  W-water 
        "........#........#.......",                          //   S-kolce
        ".....GG.#........#.......",                           //  M-magma
        "........#.....GGG#.......",                             
        "S...GG..#................",                           
        "........#................",                           
        "...GG...#................",                           
        ".........................",
        "GGGWWWWWGGGGWWGGGGGWWGGGG",
    ],
    objects: [
       { type: "player", x: 15, y: 15 },
       { type: "Mage", x: 700, y: 400 }, 
       { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
       
    ]
};
