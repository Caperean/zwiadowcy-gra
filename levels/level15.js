export const level15 = {
    backgroundColor: "#add8e6",
    map: [
        "N........................#",                            // R-skała
        "#........................#",                             // G-trawa
        "#.NN........N............#",                             // #-blok ziemi
        "#...........#IIIIII.IIIII#",                             // N-śnieg
        "#.........I.#.......#....#",                            // I-lód
        "#...........#.......#....#",                            // L-lawa
        "#.....I.I...#............#.",                           //  W-water 
        "#..I........#.I.I..I.....#.",                          //   S-kolce
        "#...........#..S#SI......#",                           //  M-magma
        "#I..........#.........I..#",                             
        "#.II........#I......IS...#",                           
        "#....I.......#......#....#",                           
        "#.......I....#.....I#....#",                           
        "#............#.I.I..#.#.#",
        "#WWWWWWWWIIII#WWWWWW#..SS#",
    ],
    objects: [
       { type: "player", x: 300, y: 330 },
       { type: "clown", x: 70, y: 15 } ,      
         { type: "snowytree", x: 800, y: 100, width: 120, height: 80 } ,  
         { type: "bat", x: 600, y: 15 } , 
        { type: "snowman", x: 600, y: 15 } ,
         { type: "wolf", x: 600, y: 15 } ,
         { type: "boar", x: 570, y: 15 } ,
        { type: "exitGate", x: 655, y: 420, width: 64, height: 64 }
    ]
};
