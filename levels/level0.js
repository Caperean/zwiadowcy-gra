export const level0 = {                             //poziom testowy żeby nie przechodzić wszystkiego
    backgroundColor: "#add8e6",
    map: [
        "..........................",                            // R-skała
        "..........................",                             // G-trawa
        ".A.......................",                             // #-blok ziemi
        ".A........................",                             // N-śnieg
        ".A........................",                            // I-lód
        ".A........................",                            // L-lawa
        ".A........................",                              // P- piasek
        ".A........................",                            //   S-kolce
        ".AAA....AAAAAAAAAAAAAAAAAA",                           //  M-magma
        ".A........................",                             // A- marmur
        ".A...AA...................",                            
        ".AAAAAA...................",                                                            // C- cegła
        "......A.AA................",                          //T- pełna woda
        ".......A.A................",
        "AAAAAAAAAAAAAAAAAWWIWWIINN",
       
        ],
    objects: [
         { type: "player", x: 750, y: 332 },
         { type: "clown", x: 100, y: 280 },
         { type: "clown", x: 50, y: 332 },
         
    ]
       
};
