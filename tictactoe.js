const tictactoe = (() => {
    const gameboard = (() => {
        const board = [];
        return { board };
    })();

    const gameState = {
        currentPlayer: {},
        round: 0,
        winner: "",
        message: "",
    };

    const updateGameState = (marker) => {
        if (!checkForGameOver(marker)) {
            gameState.round += 1;
            changeTurn();
            render();
        } else {
            gameState.currentPlayer = {};
            gameState.message = gameState.winner === "tie" ? "It's a tie." : `${gameState.winner} wins!`;
            render();
        }
    };

    const checkForGameOver = (marker) => {
        let gameOver = false;

        const playerMoves = [];
        const winningCombos = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        gameboard.board.forEach((val, index) => {
            if (val === marker) {
                playerMoves.push(index);
            }
        });

        for (const combo of winningCombos) {
            const isWinner = checkForCombo(combo, playerMoves);
            if (isWinner) {
                gameOver = true;
                gameState.winner = marker === players.player1.marker ? players.player1.name : players.player2.name;
                break;
            }
        }

        if (gameState.round === 9 && !gameOver) {
            gameState.winner = "tie";
            gameOver = true;
        }

        return gameOver;
    };

    const checkForCombo = (combo, playerMoves) => {
        for (const num of combo) {
            if (!playerMoves.includes(num)) {
                return false;
            }
        }
        return true;
    };

    const PlayerFactory = (name, marker) => {
        const playPiece = (spot) => {
            if (gameState.currentPlayer.name === name) {
                if (gameboard.board[spot] === "") {
                    gameboard.board[spot] = marker;
                    updateGameState(marker);
                } else {
                    console.log("That space is already taken. Try again.");
                }
            } else {
                console.log(`It is not your turn ${name}!`);
            }
            
        }
        return { name, marker, playPiece };
    };

    const players = {
        player1: PlayerFactory("player1", "x"),
        player2: PlayerFactory("player2", "o")
    };

    const startGame = () => {
        cacheDom.board.classList.remove("hide");
        cacheDom.startBtn.classList.toggle("hide");
        gameboard.board = ["","","","","","","","",""];
        gameState.round = 1;
        gameState.currentPlayer = players.player1;
        gameState.winner = "";
        gameState.message = "";
        render();
    };

    const changeTurn = () => {
        gameState.currentPlayer = gameState.currentPlayer === players.player1
            ? players.player2
            : players.player1;
    };

    const render = () => {
        cacheDom.boxes.forEach((value, index) => {
            value.textContent = gameboard.board[index];
        });
        cacheDom.round.textContent = `Round ${gameState.round}`;
        cacheDom.message.textContent = gameState.message;
        if (!gameState.winner) {
            cacheDom.turn.textContent = `It is now ${gameState.currentPlayer.name}'s turn.`;
        } else {
            cacheDom.startBtn.classList.toggle("hide");
            cacheDom.turn.textContent = "";
        }
    };

    const cacheDom = {
        board: document.querySelector(".tictactoe"),
        boxes: document.querySelectorAll(".box"),
        startBtn: document.querySelector(".start-game"),
        turn: document.querySelector(".turn"),
        round: document.querySelector(".round"),
        message: document.querySelector(".message")
    }

    cacheDom.boxes.forEach((value, index) => {
        value.addEventListener("click", () => {
            if (gameState.currentPlayer.playPiece) {
                gameState.currentPlayer.playPiece(index);
            }
        });
    });

    cacheDom.startBtn.addEventListener("click", startGame);

    return { };
})();