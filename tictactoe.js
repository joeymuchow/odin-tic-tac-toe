const tictactoe = (() => {
    const gameboard = (() => {
        const board = [];
        return { board };
    })();

    const gameState = {
        turn: "",
        round: 0,
        winner: "",
    };

    const updateGameState = (marker) => {
        if (!checkForGameOver(marker)) {
            gameState.round += 1;
            changeTurn();
            render();
        } else {
            render();
            const message = gameState.winner === "tie" ? "It's a tie." : `Congrats ${gameState.winner}`;
            console.log(message);
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
            if (gameState.turn === name) {
                if (gameboard.board[spot] === "-") {
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
        gameboard.board = ["-","-","-","-","-","-","-","-","-"];
        gameState.round = 1;
        gameState.turn = players.player1.name;
        gameState.winner = "";
        render();
    };

    const changeTurn = () => {
        gameState.turn = gameState.turn === players.player1.name
            ? players.player2.name
            : players.player1.name;
    };

    const render = () => {
        console.log(`Round ${gameState.round}`);
        console.log(gameboard.board[0],gameboard.board[1],gameboard.board[2]);
        console.log(gameboard.board[3],gameboard.board[4],gameboard.board[5]);
        console.log(gameboard.board[6],gameboard.board[7],gameboard.board[8]);
        if (!gameState.winner) {
            console.log(`It is now ${gameState.turn}'s turn.`);
        }
    };

    return { startGame, player1Move: players.player1.playPiece, player2Move: players.player2.playPiece };
})();