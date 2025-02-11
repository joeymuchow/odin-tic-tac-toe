const tictactoe = (() => {
    const gameboard = (() => {
        const board = [];
        return { board };
    })();

    const PlayerFactory = (name, marker) => {
        const playPiece = (marker, spot) => {
            board[spot] = marker;
        }
        return { name, marker, playPiece };
    }
    
    const gameState = {
        player1: {},
        player2: {},
        turn: "",
        winner: ""
    };

    const startGame = () => {
        gameboard.board.push(null,null,null,null,null,null,null,null,null);
        const player1 = PlayerFactory("player1", "x");
        const player2 = PlayerFactory("player2", "o");
        gameState.player1 = player1;
        gameState.player2 = player2;
        gameState.turn = player1;
    }

    const render = () => {}

    return { startGame, player1Move: gameState.player1.playPiece, player2Move: gameState.player2.playPiece };
})();