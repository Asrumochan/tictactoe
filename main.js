const boxes = Array.from(document.querySelectorAll(".box"));
const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");
const applyNamesBtn = document.querySelector("#applyNames");
const newRoundBtn = document.querySelector("#newRound");
const resetAllBtn = document.querySelector("#resetAll");
const statusEl = document.querySelector("#status");
const turnBadge = document.querySelector("#turnBadge");
const p1Label = document.querySelector("#p1Label");
const p2Label = document.querySelector("#p2Label");
const p1ScoreEl = document.querySelector("#p1Score");
const p2ScoreEl = document.querySelector("#p2Score");
const drawScoreEl = document.querySelector("#drawScore");

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const state = {
    turn: "X",
    moves: 0,
    gameOver: false,
    board: Array(9).fill(""),
    players: {
        X: "Player X",
        O: "Player O"
    },
    score: {
        X: 0,
        O: 0,
        draw: 0
    }
};

const sanitizeName = (name, fallback) => {
    const trimmed = name.trim();
    return trimmed.length ? trimmed : fallback;
};

const setStatus = (message) => {
    statusEl.textContent = message;
};

const updateTurnUI = () => {
    turnBadge.textContent = state.turn;
    turnBadge.style.backgroundColor = state.turn === "X" ? "rgba(29, 143, 135, 0.18)" : "rgba(217, 119, 6, 0.18)";
    turnBadge.style.color = state.turn === "X" ? "#0a4f4a" : "#8b4513";
};

const updateScoreUI = () => {
    p1Label.textContent = state.players.X;
    p2Label.textContent = state.players.O;
    p1ScoreEl.textContent = String(state.score.X);
    p2ScoreEl.textContent = String(state.score.O);
    drawScoreEl.textContent = String(state.score.draw);
};

const clearBoardUI = () => {
    boxes.forEach((box) => {
        box.textContent = "";
        box.disabled = false;
        box.classList.remove("x-mark", "o-mark", "win-cell");
    });
};

const finishRound = () => {
    state.gameOver = true;
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const startRound = () => {
    state.turn = "X";
    state.moves = 0;
    state.gameOver = false;
    state.board = Array(9).fill("");
    clearBoardUI();
    updateTurnUI();
    setStatus(`${state.players.X} (X) starts. Good luck to both players.`);
};

const checkWinner = () => {
    for (const pattern of winningPatterns) {
        const [a, b, c] = pattern;
        const v1 = state.board[a];
        const v2 = state.board[b];
        const v3 = state.board[c];

        if (v1 && v1 === v2 && v2 === v3) {
            return { winner: v1, pattern };
        }
    }

    return null;
};

const markWinningPattern = (pattern) => {
    pattern.forEach((index) => {
        boxes[index].classList.add("win-cell");
    });
};

const handleMove = (index) => {
    if (state.gameOver || state.board[index]) {
        return;
    }

    const activeTurn = state.turn;
    state.board[index] = activeTurn;
    state.moves += 1;

    const box = boxes[index];
    box.textContent = activeTurn;
    box.classList.add(activeTurn === "X" ? "x-mark" : "o-mark");
    box.disabled = true;

    const winResult = checkWinner();
    if (winResult) {
        state.score[winResult.winner] += 1;
        markWinningPattern(winResult.pattern);
        updateScoreUI();
        setStatus(`${state.players[winResult.winner]} wins this round.`);
        finishRound();
        return;
    }

    if (state.moves === 9) {
        state.score.draw += 1;
        updateScoreUI();
        setStatus("Round ends in a draw. Start a new round to continue.");
        finishRound();
        return;
    }

    state.turn = activeTurn === "X" ? "O" : "X";
    updateTurnUI();
    setStatus(`${state.players[state.turn]}'s turn (${state.turn}).`);
};

const applyPlayerNames = () => {
    const xName = sanitizeName(player1Input.value, "Player X");
    const oName = sanitizeName(player2Input.value, "Player O");

    if (xName.toLowerCase() === oName.toLowerCase()) {
        setStatus("Use different names for each player to avoid confusion.");
        return;
    }

    state.players.X = xName;
    state.players.O = oName;
    updateScoreUI();
    setStatus(`Names updated. ${state.players.X} starts this round.`);
    startRound();
};

const resetScoreboard = () => {
    state.score.X = 0;
    state.score.O = 0;
    state.score.draw = 0;
    updateScoreUI();
    startRound();
    setStatus("Scoreboard reset. Fresh match started.");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        const index = Number(box.dataset.index);
        handleMove(index);
    });
});

applyNamesBtn.addEventListener("click", applyPlayerNames);
newRoundBtn.addEventListener("click", startRound);
resetAllBtn.addEventListener("click", resetScoreboard);

updateScoreUI();
updateTurnUI();
startRound();