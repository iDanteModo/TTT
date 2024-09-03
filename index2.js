const game = (function(){
    let p1 = {name : "Player 1"} , p2 = {name : "Player 2"};
    let round = 0;
    const getPlayerNames =  () =>{ p1.name = prompt("player 1 name"); p2.name = prompt('player 2 name');}
    const showPlayerNames = () => { 
        const displayP1 = document.querySelector(".player1");
        const displayP2 = document.querySelector(".player2");
        const p1name = document.createElement('h1');
        const p2name = document.createElement('h1');
        p1name.textContent = p1.name;
        p2name.textContent= p2.name;
        displayP1.appendChild(p1name);
        displayP2.appendChild(p2name);
    }
    const assignMark = () => {p1.mark = 'X'; p2.mark = "O"}
    const gameRound = () => round;
    const incrementRound = () => round++;
    const resetRound  = () => round = 0;
    const playerMoves = () => {
        const squares = document.querySelectorAll('p');
        squares.forEach(square => {
            square.addEventListener("click", () => {
                if(round % 2 == 0 && square.dataset.x == null && square.dataset.o == null) {
                    square.classList.add("white");
                    square.dataset.x = true;
                    game.incrementRound();
                    game.checkGameState();
                    game.gameOver();
                }else if (round % 2 != 0 && square.dataset.x == null && square.dataset.o == null) {
                    square.classList.add('purple');
                    square.dataset.o = true;
                    game.incrementRound();
                    game.checkGameState();
                    game.gameOver();
                }
            })
        })
    }
    const stats = () => {console.table(p1); console.table(p2); console.log(`Round is ${round}`)}
    const checkGameState = () => {
        const squares = document.querySelectorAll('p');
        let p1Win = false;
        let p2Win = false;
        // 0 Column
        if(squares[0].dataset.x == "true" && squares[3].dataset.x == "true" && squares[6].dataset.x == "true"){
            p1Win = true;
        }else if(squares[0].dataset.o == "true" && squares[3].dataset.o == "true" && squares[6].dataset.o == "true"){
            p2Win = true;
        // 0 LINE
        }else if(squares[0].dataset.x == "true" && squares[1].dataset.x == "true" && squares[2].dataset.x == "true"){
            p1Win = true;
        }else if(squares[0].dataset.o == "true" && squares[1].dataset.o == "true" && squares[2].dataset.o == "true"){
            p2Win = true;
        // 0 DIAGONAL
        }else if(squares[0].dataset.x == "true" && squares[4].dataset.x == "true" && squares[8].dataset.x == "true"){
            p1Win = true;   
        }else if(squares[0].dataset.o == "true" && squares[4].dataset.o == "true" && squares[8].dataset.o == "true"){
            p2Win = true; 
        // 1 COLUMN
        }else if(squares[1].dataset.x == "true" && squares[4].dataset.x == "true" && squares[7].dataset.x == "true"){
            p1Win = true;
        }else if(squares[1].dataset.o == "true" && squares[4].dataset.o == "true" && squares[7].dataset.o == "true"){
            p2Win = true;
        // 2 COLUMN
        }else if(squares[2].dataset.x == "true" && squares[5].dataset.x == "true" && squares[8].dataset.x == "true"){
            p1Win = true;
        }else if(squares[2].dataset.o == "true" && squares[5].dataset.o == "true" && squares[8].dataset.o == "true"){
         p2Win = true;
        // 2 DIAGONAL 
        }else if(squares[2].dataset.x == "true" && squares[4].dataset.x == "true" && squares[6].dataset.x == "true"){
            p1Win = true;
        }else if(squares[2].dataset.o == "true" && squares[4].dataset.o == "true" && squares[6].dataset.o == "true"){
            p2Win = true;
        // 3 LINE
        }else if(squares[3].dataset.x == "true" && squares[4].dataset.x == "true" && squares[5].dataset.x == "true"){
            p1Win = true;
        }else if(squares[3].dataset.o == "true" && squares[4].dataset.o == "true" && squares[5].dataset.o == "true"){
            p2Win = true;
     // 6 LINE
        }else if(squares[6].dataset.x == "true" && squares[7].dataset.x == "true" && squares[8].dataset.x == "true"){
            p1Win = true;
        }else if(squares[6].dataset.o == "true" && squares[7].dataset.o == "true" && squares[8].dataset.o == "true"){
            p2Win = true;
        }
        return [p1Win, p2Win];
    }
    const gameOver = () => {
        const [p1Win, p2Win] = checkGameState();
        if(p1Win) {
            console.log("White Won");
            game.boardReset();
            game.resetRound();
        }else if(p2Win) {
            console.log("Purple Won");
            game.boardReset();
            game.resetRound();
        }else if (!p1Win && !p2Win && round == 9) {
            console.log("DRAW");
            game.boardReset();
            game.resetRound();
        }
     }
     const boardReset = () => {
        const squares = document.querySelectorAll('p');
        squares.forEach(square => {
            delete square.dataset.x;
            delete square.dataset.o;
            square.classList.remove('white');
            square.classList.remove('purple');
        })
     }
    return {getPlayerNames, 
            showPlayerNames, 
            assignMark, 
            gameRound, 
            incrementRound, 
            resetRound, 
            playerMoves, 
            checkGameState, 
            gameOver, 
            boardReset, 
            stats};
})();

game.getPlayerNames();
game.showPlayerNames();
game.assignMark();
game.playerMoves();
game.stats();




