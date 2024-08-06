type Choice = "rock" | "paper" | "scissors";

interface SetWinner {
    (winner: string): void;
}

interface SetScore {
    (scoreUpdater: (prevScore: number) => number): void;
}

const outcomes: Record<Choice, Record<Choice, string>> = {
    rock: { paper: "You Lose", scissors: "You Win", rock: 'TIED' },
    paper: { rock: "You Win", scissors: "You Lose", paper: 'TIED' },
    scissors: { rock: "You Lose", paper: "You Win", scissors: "TIED"}
};

function winnerFunction(
    playerChoice: Choice,
    computerChoice: Choice,
    setWinner: SetWinner,
    setScore: SetScore
): void {
    if (playerChoice === computerChoice) {
        setWinner("TIED");
    } else {
        const result = outcomes[playerChoice][computerChoice];
        setWinner(result);
        if (result === "You Win") {
            setScore(prevScore => prevScore + 1);
        } else {
            setScore(prevScore => prevScore - 1);
        }
    }
}

export default winnerFunction;