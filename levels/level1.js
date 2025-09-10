export const level1 = {
    backgroundColor: "#add8e6",
    map: [
        "RRRRRRRRRRRRRRRRRRRRRRRRR",
        "R............R..........R",
        "R.......................R",
        "R.......................R",
        "RRRR.....RRR............R",
        "R.......................R",
        "R.......................R",
        "R.......................R",
        "R.......................R",
        "R.......................R",
        "R.......................R",
        "R.......................R",
        "R......RRRRR............R",
       "R....RRR................R",
        "RRRRRRLLLLLLLLLLLLRRRRRRR"
    ],
    objects: [
        { type: "player", x: 50, y: 50 },
        { type: "fire", x: 100, y: 416 }, // Dodany obiekt ognia
        { type: "wolf", x: 500, y: 416 },//dodany wilk
        { type: "tree", x: 350, y: 100, width: 156, height: 200 },
        { type: "bush", x: 400, y: 420, width: 64, height: 40 },
        {type: "wolf",  x: 400, y:416},
        { type: "exitGate", x: 700, y: 330, width: 80, height: 130 },
        {type: "snowytree",x: 50, y:50,width: 80, height:130 },
        {type: "wolf", x: 50, y: 416 },
        {type: "fire", x: 150, y: 100}
    ]
};
