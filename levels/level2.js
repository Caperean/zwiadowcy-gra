export const level2 = {
    backgroundColor: "#add8e6",
    map: [
        "G........................",                            // R-skała
        "#........................",                             // G-trawa
        "#........GG..............",                             // #-blok ziemi
        "#..S.........GG..........",                             // N-śnieg
        "#.......GGSSS......SSSSSS",                            // I-lód
        "#.........GGG....GG#GGGGG",                            // L-lawa
        "#..S...GG........#.......",                           //  W-water 
        "#.......#........#.......",                          //   S-kolce
        "#....GG.#.....G..#.......",                           //  M-magma
        "#.......#......GG#.......",                             
        "#...GG..#................",                           
        "#.......#................",                           
        "#..GG...#................",                           
        "#........................",
        "#GGWWWWWGGGGWWGGGGGWWGGGG",
    ],
    objects: [
       { type: "player", x: 50, y: 15 },
       { type: "mage", x: 550, y: 385 }, 
       { type: "exitGate", x: 700, y: 400, width: 64, height: 64 }
       
    ]
};
