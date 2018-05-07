var rows = 200;
var a = [];
var b = [];
var Grid = buildGrid(rows);
var miGrid = Grid;



addEvent();
///fillGrid2();
///randomGrid();

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
    drawGame();
}

function addEvent(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 300, 300); 
    ctx.fillStyle = "#264a78";
    ctx.strokeStyle = "#222222";
    var drawing = false;
    var mousePos = { x:0, y:0 };
    var lastPos = mousePos;
    canvas.addEventListener("mousedown", function (e) {
            drawing = true;
      lastPos = getMousePos(canvas, e);
    }, false);
    canvas.addEventListener("mouseup", function (e) {
      drawing = false;
      fillGrid2();
    }, false);
    canvas.addEventListener("mousemove", function (e) {
      mousePos = getMousePos(canvas, e);
    }, false);

    function getMousePos(canvasDom, mouseEvent) {
        var rect = canvasDom.getBoundingClientRect();
        console.log(Grid[0][0]);
        console.log(a[0]);
        a.push(mousePos);
        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top
          };
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

function fillGrid2(){ 
    for(var j=0; j<a.length; j++){
        var x = Math.round(a[j].x);
        var y = Math.round(a[j].y);
        Grid[y][x] = Math.floor(1.5);
        ///console.log(Grid[y][x])
        fillGrid();
        drawGame();

    }
}

function drawGame(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 200, 200); 
    ctx.fillStyle = "#264a78";
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

///buttons controll
var myButton = document.getElementById('btn');
var myInterval = null;
var ran = document.getElementById('random');
var clear = document.getElementById('clear');

clear.addEventListener('click', function(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 200, 200); 
    a = [];
    for(var j=0; j<rows; j++){
        for(var k=0; k<rows; k++){
            Grid[j][k] = 0;
        }
    }
})

ran.addEventListener('click', function(){
    randomGrid();
})

myButton.addEventListener("click", function(){
  if(myInterval){ 
    clearInterval(myInterval); 
    myInterval = null;
  }
  else{ 
    myInterval = setInterval(Start, 10); 
  }
});

