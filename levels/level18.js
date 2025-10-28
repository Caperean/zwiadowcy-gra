export const level18 = {
    backgroundColor: "#add8e6",
    map: [
        ".........................#",                            // R-skała
        "......................NNN#",                             // G-trawa
        "....................N....#",                             // #-blok ziemi
        "...........N...N...N.....#",                             // N-śnieg
        ".......N......WWWWW#.....#",                            // I-lód
        "...N.........WT#####NNNN.#",                            // L-lawa
        ".............T#..........#",                           //  W-water 
        "N............T...........#",                          //   S-kolce
        ".N...........T....N.N.N.N#",                          //  M-magma
        ",............T...........S",                             // A-marmur
        ".............T.....N.....S",                           // C-cegły
        ".............T......NNNNN#",                           
        ".............T...........#",                           
        ".............T.N.........#",
        "WWWWWWWWWWWWWTWWNNNNNNNNN#",
    ],
    objects: [
    { type: "player", x: 33, y: 25 },
    { type: "boar", x: 750, y: 250 },
    { type: "wolf", x: 750, y: 250 },
   { type: "snowman", x: 750, y: -70 },
       
     { type: "tatar", x: 550, y: 360 },  
     { type: "boar", x: -740, y: 360 },
     { type: "boar", x: 740, y: 360 },
     { type: "bat", x: 740, y: 160 },
     { type: "bat", x: 740, y: 100 },
    { type: "iceberg", x: 170, y: 145, width: 260, height: 380 },
    { type: "exitGate", x: 740, y: 400, width: 64, height: 64 },
      //  { type: "key", x: 400, y: 100 },
       // { type: "gate", x: 300, y: 100 },
    ]
};
