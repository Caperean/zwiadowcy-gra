export const level0 = {                             //poziom testowy żeby nie przechodzić wszystkiego
    backgroundColor: "#add8e6",
    map: [
        ".........................",                            // R-skała
        ".........................",                             // G-trawa
        "..AAAAAAAAAAAAAAA........",                             // #-blok ziemi
        "....A..........A....A....",                             // N-śnieg
        "....A..........A.........",                            // I-lód
        "....A..........A..AAAAA..",                            // L-lawa
        "..AAA..A...A.A.A.A......A",                              // P- piasek
        "....A........A.A.........",                            //   S-kolce
        "....AA.......A.AAA....AAA",                           //  M-magma
        "....A....A...A.A.........",                             // A- marmur
        "..A.A........A.A...AA....",                            
        "....A.A......A.AAAAAA....",                                                            // C- cegła
        "..........AA.A......AAAA.",                          //T- pełna woda
        ".............A.......A.A.",
        "WWWAWWAWAAAAAAAAAAAAAAAAA",
       
        ],
    objects: [
         { type: "player", x: 750, y: 332 },
           { type: "oar", x: 400, y: 50 },// nie używać
         { type: "exitGate", x: 50, y: 100, width: 64, height: 64 }
    ]
       
};
