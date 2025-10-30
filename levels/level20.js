export const level20 = {
    backgroundColor: "#cf4b16ff",
    map: [
        "....M.............MMMMM..M#",                            // R-skała
        "....M....................M#",                             // G-trawa
        "....M...................M.#",                             // #-blok ziemi
        "M...M..................MM.#",                             // N-śnieg
        "...MM..MM...MMMMMM..M.MMM#",                            // I-lód
        "..................MM.....M#",                            // L-lawa
        ".....M.............M.....M#",                           //  W-water 
        ".....MM.M.M.M.MM...M.....M#",                          //   S-kolce
        "...M..M.........M..M.....M#",                          //  M-magma
        "......M............MM..M.M#",                             // A-marmur
        "......M...........MM...M.M#",                           // C-cegły
        "M...............MM.....M.M#",                           
        ".............M.........M.M#",                           
        "..M..M.M...M...........MMM#",
        "LLLLLLLLLLLLLLLLLLLLLLLLLLL",
    ],
    objects: [
       { type: "player", x: 3, y: 5 },
        
        //{ type: "clown", x: 350, y: 150 },
         { type: "apple", x: 600, y: 130 },
        { type: "bat", x: 304, y: 240 },
        { type: "bat", x: 704, y: 250 },
         { type: "bat", x: 340, y: 380 },
         { type: "mage", x: 724, y: 30 },
          { type: "mage", x: 754, y: 0 },
           { type: "mage", x: 694, y: 60 },
           { type: "mage", x: 504, y: 60 },
        { type: "exitGate", x: 740, y: 360, width: 64, height: 64 },
     
           ]
};
