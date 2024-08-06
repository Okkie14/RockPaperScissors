type Choice = "rock" | "paper" | "scissors" | "spock" | "lizard";

interface SetWinner {
    (winner: string): void;
}

interface SetScore {
    (scoreUpdater: (prevScore: number) => number): void;
}

const outcomes: Record<Choice, Record<Choice, string>> = {
    rock: { paper: "You Lose", scissors: "You Win", rock: 'TIED', spock: "You Lose", lizard: "You Win" },
    paper: { rock: "You Win", scissors: "You Lose", paper: 'TIED', spock: "You Win", lizard: "You Lose" },
    scissors: { rock: "You Lose", paper: "You Win", scissors: "TIED", spock: "You Lose", lizard: "You Win" },
    spock: { rock: "You Win", paper: "You Lose", scissors: "You Win", spock: "TIED", lizard: "You Lose" },
    lizard: { rock: "You Lose", paper: "You Win", scissors: "You Lose", spock: "You Win", lizard: "TIED" }
};

function winnerFunction(
    playerChoice: Choice,
    computerChoice: Choice,
    setWinner: SetWinner,
    setScore: SetScore) {
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