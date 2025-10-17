export const level13 = {
    backgroundColor: "#add8e6",
    map: [
        "S........................M",                            // R-skała
        "#........................M",                             // G-trawa
        "#........................M",                             // #-blok ziemi
        "#.G.................G....M",                                                       // N-śnieg
        "#G#GGGGGGGGGGGGGGGGG#....M",                         // I-lód
        "#........................M",                           // L-lawa
        "#........................M",                           //  W-water 
        "#........................M",                          //   S-kolce
        "#........................P",                           //  M-magma
        "#........................P",                             
        "#........................P",                           
        "#........................P",                           
        "#........................P",                           
        "#.............G..........#",
        "#GGGGGGGGGGGGG#GGGGGGGGGGG",
    ],
    objects: [
       { type: "player", x: 33, y: 0 },
       { type: "wolf", x: 120, y: 15 } ,      
        { type: "boar", x: 270, y: 10 } ,
         { type: "tree", x: 80, y: 196, width: 180, height: 280 } , 
        { type: "tree", x: 240, y: 196, width: 180, height: 280 } , 
        { type: "tree", x: 550, y: 196, width: 180, height: 280 } , 
       { type: "boar", x: 100, y: 300 } ,
        { type: "boar", x: 200, y: 300 } ,
        { type: "wolf", x: 300, y: 300 } ,
        { type: "wolf", x: 200, y: 15 } , 
         { type: "wolf", x: 555, y: 15 } , 
        { type: "wolf", x: 400, y: 300 } ,  
        { type: "wolf", x: 580, y: 300 } ,
        { type: "bat", x: 650, y: 20 } ,
         { type: "bat", x: 350, y: 20 } ,
         { type: "bat", x: 400, y: 200 } ,
         { type: "bat", x: 150, y: 200 } ,
        { type: "exitGate", x: 50, y: 400, width: 64, height: 64 }
    ]
};
