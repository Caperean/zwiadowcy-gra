export const level18 = {
    backgroundColor: "#add8e6",
    map: [
        ".........................#",                            // R-skała
        "......................NNN#",                             // G-trawa
        "....................N....#",                             // #-blok ziemi
        "...........N...N...N.....#",                             // N-śnieg
        ".......N.................#",                            // I-lód
        "...N.................NNN.#",                            // L-lawa
        ".........................#",                           //  W-water 
        "N........................#",                          //   S-kolce
        "#N................N.N.N.N#",                          //  M-magma
        "#.................#......S",                             // A-marmur
        "#..................N.....S",                           // C-cegły
        "#..................#NNNNN#",                           
        "#........................#",                           
        "#..............N.........#",
        "#WWWWWWWWWWWWWWW#NNNNNNNN#",
    ],
    objects: [
    { type: "player", x: 33, y: 25 },
    { type: "boar", x: 750, y: 250 },
    { type: "wolf", x: 750, y: 250 },
   { type: "snowman", x: 750, y: -70 },
       { type: "mage", x: -75, y: 250 },
     { type: "tatar", x: 550, y: 360 },  
     { type: "boar", x: -740, y: 360 },
    { type: "clown", x: -875, y: 250 },
    { type: "exitGate", x: 740, y: 400, width: 64, height: 64 },
      //  { type: "key", x: 400, y: 100 },
       // { type: "gate", x: 300, y: 100 },
    ]
};
