const game = (function(){
    let p1 = {name : "Player 1"} , p2 = {name : "Player 2"};
    let round = 0;
    const getPlayerNames =  () =>{ p1.name = prompt("player 1 name"); p2.name = prompt('player 2 name');}
    const showPlayerNames = () => { 
        updateDOM('.player1', `<h1>${p1.name}<h1>`);
        updateDOM('.player2', `<h1>${p2.name}<h1>`);
    }
    const updateDOM = (selector, content) => {
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = content;
        }
    }
    const showPlayerScores = () => {
        updateDOM('.player1Score', `<h3>${p1.score}<h3>`);
        updateDOM('.player2Score', `<h3>${p2.score}<h3>`);
    }
    const updatePlayerScores = () => {
        showPlayerScores();
    }
    const assignMark = () => {p1.mark = 'X'; p2.mark = "O"}
    const assignScore = () => {p1.score = 0; p2.score = 0;}
    const addPoint = () => score++;
    const gameRound = () => round;
    const incrementRound = () => round++;
    const resetRound  = () => round = 0;
    const click = (event) => {
        const square = event.target;
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
    }
    const playerMoves = () => {
        const squares = document.querySelectorAll('p');
        squares.forEach(square => {
            square.addEventListener("click", click); 
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
            p1.score++;
            game.gameFreeze();
        }else if(p2Win) {
            console.log("Purple Won");
            p2.score++;
            game.gameFreeze();
        }else if (!p1Win && !p2Win && round == 9) {
            console.log("DRAW");
            game.gameFreeze();
        }
        game.updatePlayerScores();
     }
     const gameFreeze = () => {
        const squares = document.querySelectorAll('p');
        squares.forEach(square => {
            square.removeEventListener("click", click);
        })
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
    const playAgain = () => {
        const newGame = document.querySelector('#playAgain');
        newGame.addEventListener("click", () => {
            game.boardReset();
            game.resetRound();
            game.playerMoves();
            game.updatePlayerScores();
        })
    }
    const changePlayers = () => {
        const changeNames = document.querySelector('#changePlayers');
            changeNames.addEventListener('click', () => {
                document.querySelector(".player1 h1").remove();
                document.querySelector(".player2 h1").remove();
                game.getPlayerNames();
                game.showPlayerNames();
                game.assignScore();
            })
    }
    const toggleAudio = () => {
        const audio = document.querySelector(".icons");
        const audioOn = document.querySelector(".volumeOn");
        const audioOff = document.querySelector(".volumeOff");
        const music = document.querySelector('#background-music');
        let toggle = false;
        audio.addEventListener("click", () => {
            if(toggle === false ){
                music.play();
                audioOff.style.display = "none";
                audioOn.style.display = "block"
                toggle = true;
            }else if (toggle === true) {
                music.pause();
                audioOff.style.display = "block";
                audioOn.style.display = "none";
                toggle = false;
            }
        })
    }
    const init = () => {
        game.getPlayerNames();
        game.showPlayerNames();
        game.assignMark();
        game.assignScore();
        game.showPlayerScores();
        game.playerMoves();
        game.playAgain();
        game.changePlayers();
        game.toggleAudio();
        game.stats();

    }
    return {getPlayerNames, 
            showPlayerNames,
            showPlayerScores,
            updatePlayerScores,
            updateDOM,
            assignMark,
            assignScore,
            addPoint, 
            gameRound, 
            incrementRound, 
            resetRound, 
            click,
            playerMoves, 
            checkGameState, 
            gameOver, 
            gameFreeze,
            boardReset, 
            playAgain,
            changePlayers,
            stats,
            toggleAudio,
            init};
})();

document.addEventListener('DOMContentLoaded', () => {
    game.init();
});




