export const level0 = {                             //poziom testowy żeby nie przechodzić wszystkiego
    backgroundColor: "#add8e6",
    map: [
        ".......ASSSSA............",                            // R-skała
        ".......A....A............",                             // G-trawa
        "..AAAAAA....AAAAA........",                             // #-blok ziemi
        "....A..........A....A....",                             // N-śnieg
        "....A..........A.........",                            // I-lód
        "....A......A...A..AAAAA..",                            // L-lawa
        "..AAA..A.....A.A.A......A",                              // P- piasek
        "....A........A.A.........",                            //   S-kolce
        "....AA.......A.AAA....AAA",                           //  M-magma
        "......AAAA...A.A.........",                             // A- marmur
        "..A.........AA.A...AA....",                            
        ".............A.AAAAAA....",                                                            // C- cegła
        "..........AA.A......AAAA.",                          //T- pełna woda
        ".............A.......A.A.",
        "WWWAWWAWAAAAAAAAAAAAAAAAA",
       
        ],
    objects: [
         { type: "player", x: 750, y: 332 },
           { type: "oar", x: 400, y: 50 },// nie używać
         { type: "exitGate", x: 550, y: 400, width: 64, height: 64 },
         { type: "bat", x: 150, y: 50 },
    ]
       
};
