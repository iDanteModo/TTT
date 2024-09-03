const gameBoard = {};
const players = {};

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

function getPlayerChoice(round = 0) {
    const squares = document.querySelectorAll('p');
    squares.forEach(square => {
        square.addEventListener('click', () => {
            if(round % 2 == 0 && square.dataset.x == null && square.dataset.o == null){
                square.classList.add('white');
                square.dataset.x = true;
                round ++;
                let p1,p2 = checkGameState();
                if(p1){
                    round =0;
                }else if(p2){
                    round =0;
                }
            }else if (round % 2 != 0 && square.dataset.x == null && square.dataset.o == null) {
                square.classList.add("purple");
                square.dataset.o = true;
                round ++;
                let p1,p2 = checkGameState();
                if(p1){
                    round =0;
                }else if(p2){
                    round =0;
                }
            }else if(round == 9){
                round = 0;
                gameOver();
            }
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
        boardReset();
        checkGameState(0);
        return true;
    }else if(p2Win){
        alert(`PURPLE WON!`)
        boardReset();
        checkGameState(0);
        return true;
    }else if(!p1Win && !p2Win) {
        checkGameState(0);
        alert("Draw");
    }
}

function playAgain(){
    const newPlay = document.querySelector('#playAgain')
    newPlay.addEventListener('click', () => {
        boardReset();
        getPlayerChoice();
    })
}

function changePlayers(){
    const newPlayers = document.querySelector('#changePlayers')
        newPlayers.addEventListener('click', () => {
            const player1Display = document.querySelector(".player1 h1");
            const player2Display = document.querySelector(".player2 h1");
            player1Display.remove();
            player2Display.remove();
            getPlayersNames();
        })
    }

function playGame(){
    newGame = false;
    getPlayersNames();
    getPlayerChoice();
    playAgain();
    changePlayers();
}

playGame();


// To implement

// Players in objects
// Keep score in each player object
// Keep also every move in player object
// Ability to see game history 

