const tictactoe = (() => {
    const gameboard = (() => {
        const board = [];
        return { board };
    })();

    const gameState = {
        currentPlayer: {},
        players: {
            player1: {},
            player2: {},
        },
        round: 0,
        winner: "",
        message: "",
        error: "",
    };

    const updateGameState = (marker) => {
        if (!checkForGameOver(marker)) {
            gameState.round += 1;
            changeTurn();
        } else {
            gameState.currentPlayer = {};
            gameState.message = gameState.winner === "tie" ? "It's a tie." : `${gameState.winner} wins!`;
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
                gameState.winner = marker === gameState.players.player1.marker ? gameState.players.player1.name : gameState.players.player2.name;
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
            gameState.error = "";
            if (gameboard.board[spot] === "") {
                gameboard.board[spot] = marker;
                updateGameState(marker);
                render();
            } else {
                gameState.error = "That space is already taken. Try again.";
                render();
            }
        }
        return { name, marker, playPiece };
    };

    const startGame = () => {
        const player1Name = prompt("First player, what is your name?") || "player1";
        const player2Name = prompt("Second player, what is your name?") || "player2";
        gameState.players.player1 = PlayerFactory(player1Name, "X");
        gameState.players.player2 = PlayerFactory(player2Name, "O");
        cacheDom.board.classList.remove("hide");
        cacheDom.startBtn.classList.toggle("hide");
        gameboard.board = ["","","","","","","","",""];
        gameState.round = 1;
        gameState.currentPlayer = gameState.players.player1;
        gameState.winner = "";
        gameState.message = "";
        render();
    };

    const changeTurn = () => {
        gameState.currentPlayer = gameState.currentPlayer === gameState.players.player1
            ? gameState.players.player2
            : gameState.players.player1;
    };

    const render = () => {
        cacheDom.boxes.forEach((value, index) => {
            value.textContent = gameboard.board[index];
        });
        cacheDom.round.textContent = `Round ${gameState.round}`;
        cacheDom.message.textContent = gameState.message;
        cacheDom.error.textContent = gameState.error;
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
        message: document.querySelector(".message"),
        error: document.querySelector(".error")
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