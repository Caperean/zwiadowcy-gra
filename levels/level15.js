export const level15 = {
    backgroundColor: "#add8e6",
    map: [
        "N........................#",                            // R-skała
        "#........................#",                             // G-trawa
        "#.NN.....................#",                             // #-blok ziemi
        "#...........#NNNNNN.NNNNN#",                             // N-śnieg
        "#...........#....##.NN...#",                            // I-lód
        "#........I..#.......#....#",                            // L-lawa
        "#.....III...#.......#....#.",                           //  W-water 
        "#..I........#.N.N........#.",                          //   S-kolce
        "#...........#...#SNS.....#",                           //  M-magma
        "#I..........#.........I..#",                             
        "#.II........#I......I....#",                           
        "#....I.......#...........#",                           
        "#.......I....#.I..I......#",                           
        "#............#...........#",
        "#WWWWWWWWIIII#...........#",
    ],
    objects: [
       { type: "player", x: 300, y: 330 },
       { type: "clown", x: 70, y: 15 } ,      
         { type: "snowytree", x: 800, y: 100, width: 120, height: 80 } ,  
         { type: "bat", x: 600, y: 15 } , 
        { type: "snowman", x: 600, y: 15 } , 
        { type: "exitGate", x: 607, y: 400, width: 64, height: 64 }
    ]
};
