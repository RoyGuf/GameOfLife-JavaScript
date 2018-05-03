var rows = 200;
var Grid = buildGrid(rows);
var miGrid = Grid;

Grid[1][1] = Math.floor(1.5);
Grid[3][1] = Math.floor(1.5);
Grid[4][1] = Math.floor(1.5);
Grid[2][1] = Math.floor(1.5);

//fillGrid();
randomGrid();

Start();

function Start(){
    drawGame();
    updateGame();
}


function buildGrid(rows){
    var arr = [];
    for(var i=0; i<rows; i++){
        arr[i] = []
    }
    return arr;
}

function randomGrid(){
    for(var j=0; j<rows; j++){
        for(var k=0; k<rows; k++){
            Grid[j][k] = Math.floor(Math.random() * 2);
        }
    }
}

function fillGrid(){ ///fill fields with 0 if they are not 1
    for(var j=0; j<rows; j++){
        for(var k=0; k<rows; k++){
            if(Grid[j][k] != 1){
                Grid[j][k] = Math.floor(0.5);
            }
        }
    }
}

function drawGame(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 300, 300); 
    ctx.fillStyle = "#FF0000";
    for(var j=1; j<rows; j++){
        for(var k=1; k<rows; k++){
            if(Grid[j][k] === 1){
                ctx.fillRect(j,k,1,1);
            }
        }
    }
}

function updateGame(){ ///game logic
    for(var j=1; j<rows-1; j++){
        for(var k=1; k<rows-1; k++){
            var totalAlive = 0;
            totalAlive += Grid[j-1][k-1];
            totalAlive += Grid[j-1][k];
            totalAlive += Grid[j-1][k+1];
            totalAlive += Grid[j][k-1];
            totalAlive += Grid[j][k+1];
            totalAlive += Grid[j+1][k-1];
            totalAlive += Grid[j+1][k];
            totalAlive += Grid[j+1][k+1];
            if(Grid[j][k] === 0){
                switch(totalAlive){
                    case 3:
                      miGrid[j][k] = 1;
                      break;
                    default:
                      miGrid[j][k] = 0; 
                }
            }else if(Grid[j][k] === 1){
                switch(totalAlive){
                    case 0:
                    case 1:
                      miGrid[j][k] = 0;
                      break;
                    case 2:
                    case 3:
                      miGrid[j][k] = 1;
                      break;
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                      miGrid[j][k] = 0;
                      break;
                    default:
                      miGrid[j][k] = 0;

                }
            }
        }
    }
    for(var j=0; j<rows; j++){
        for(var k=0; k<rows; k++){
            Grid[j][k] === miGrid[j][k];
        }
    }
}

///button controll
var myButton = document.getElementById('btn');
var myInterval = null;

myButton.addEventListener("click", function(){
  if(myInterval){ 
    clearInterval(myInterval); 
    myInterval = null;
  }
  else{ 
    myInterval = setInterval(Start, 10); 
  }
});

