const gameBoard = {};
const players = {};

     function startGame() {
        getPlayersNames();
        getPlayerChoice();
        updateBoard();
        checkGameState();
        gameOver();
        playersScore();
        boardReset();
    }

function getPlayersNames() {
    let player1 = prompt("Player 1");
    players["Player 1"] = player1
    let player2 = prompt("Player 2 ");
    players["Player 2"] = player2;
    const player1Display = document.querySelector(".player1");
    const player2Display = document.querySelector(".player2");
    const player1Name = document.createElement("h1");
    const player2Name = document.createElement("h1");
    player1Name.textContent = player1;
    player2Name.textContent= player2;
    player1Display.appendChild(player1Name);
    player2Display.appendChild(player2Name);
}

function getPlayerChoice() {
    const squares = document.querySelectorAll('p');
    let round = 0;
    squares.forEach(square => {
        square.addEventListener('click', () => {
            if(round % 2 == 0 && square.dataset.x == null && square.dataset.o == null){
                square.classList.add('white');
                square.dataset.x = true;
                round ++;
            }else if (round % 2 != 0 && square.dataset.x == null && square.dataset.o == null) {
                square.classList.add("purple");
                square.dataset.o = true;
                round ++;
            }else if(round == 9){
                round =0;
                gameOver();
            }
        checkGameState();
        })
    })
}

function checkGameState() {
    const squares = document.querySelectorAll('p');
    let p1Win = false;
    let p2Win = false;
    // 0 Column
    if(squares[0].dataset.x == "true" && squares[3].dataset.x == "true" && squares[6].dataset.x == "true"){
        p1Win = true;
        gameOver(p1Win,p2Win);
    }else if(squares[0].dataset.o == "true" && squares[3].dataset.o == "true" && squares[6].dataset.o == "true"){
        p2Win = true;
        gameOver(p1Win,p2Win);
    // 0 LINE
    }else if(squares[0].dataset.x == "true" && squares[1].dataset.x == "true" && squares[2].dataset.x == "true"){
        p1Win = true;
        gameOver(p1Win,p2Win);
    }else if(squares[0].dataset.o == "true" && squares[1].dataset.o == "true" && squares[2].dataset.o == "true"){
        p2Win = true;
        gameOver(p1Win,p2Win);
    // 0 DIAGONAL
    }else if(squares[0].dataset.x == "true" && squares[4].dataset.x == "true" && squares[8].dataset.x == "true"){
        p1Win = true;   
        gameOver(p1Win,p2Win);
    }else if(squares[0].dataset.o == "true" && squares[4].dataset.o == "true" && squares[8].dataset.o == "true"){
        p2Win = true; 
        gameOver(p1Win,p2Win);
    // 1 COLUMN
    }else if(squares[1].dataset.x == "true" && squares[4].dataset.x == "true" && squares[7].dataset.x == "true"){
        p1Win = true;
        gameOver(p1Win,p2Win);
    }else if(squares[1].dataset.o == "true" && squares[4].dataset.o == "true" && squares[7].dataset.o == "true"){
        p2Win = true;
        gameOver(p1Win,p2Win);
    // 2 COLUMN
    }else if(squares[2].dataset.x == "true" && squares[5].dataset.x == "true" && squares[8].dataset.x == "true"){
        p1Win = true;
        gameOver(p1Win,p2Win);
    }else if(squares[2].dataset.o == "true" && squares[5].dataset.o == "true" && squares[8].dataset.o == "true"){
        p2Win = true;
        gameOver(p1Win,p2Win);
    // 2 DIAGONAL 
    }else if(squares[2].dataset.x == "true" && squares[4].dataset.x == "true" && squares[6].dataset.x == "true"){
        p1Win = true;
        gameOver(p1Win,p2Win);
    }else if(squares[2].dataset.o == "true" && squares[4].dataset.o == "true" && squares[6].dataset.o == "true"){
        p2Win = true;
        gameOver(p1Win,p2Win);
    // 3 LINE
    }else if(squares[3].dataset.x == "true" && squares[4].dataset.x == "true" && squares[5].dataset.x == "true"){
        p1Win = true;
        gameOver(p1Win,p2Win);
    }else if(squares[3].dataset.o == "true" && squares[4].dataset.o == "true" && squares[5].dataset.o == "true"){
        p2Win = true;
        gameOver(p1Win,p2Win);
    // 6 LINE
    }else if(squares[6].dataset.x == "true" && squares[7].dataset.x == "true" && squares[8].dataset.x == "true"){
        p1Win = true;
        gameOver(p1Win,p2Win);
    }else if(squares[6].dataset.o == "true" && squares[7].dataset.o == "true" && squares[8].dataset.o == "true"){
        p2Win = true;
        gameOver(p1Win,p2Win);
    }
    return p1Win, p2Win;
}

function boardReset() {
    const squares = document.querySelectorAll('p');
    squares.forEach(square => {
       delete square.dataset.x; 
       delete square.dataset.o;
       square.classList.remove('white');
       square.classList.remove('purple');
    })
}

function gameOver(p1Win, p2Win) {
    if(p1Win){
        alert(`WHITE WON!`)
    }else if(p2Win){
        alert(`PURPLE WON!`)
    }else {
        alert("DRAW")
    }
    playAgain();
}

function playAgain(){
    if(confirm("Play Again ?")){
        boardReset()
    } else {
        alert("Ciao");
    }
}

getPlayerChoice();
getPlayersNames();




// To implement

// Players in objects
// Keep score in each player object
// Keep also every move in player object
// Ability to see game history 
