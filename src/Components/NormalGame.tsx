import { useState } from 'react';
import styles from "../Styles/gameStyles.module.css";
import winnerFunction from "../Functions/NormalGame.ts";
import Rules from "./Rules";
import logo from "../assets/logo.svg";

type Choice = "rock" | "paper" | "scissors";

interface NormalGameProps {
    rulesModal: boolean;
    setRulesModal: React.Dispatch<React.SetStateAction<boolean>>;
    normalRules: boolean;
    setNormalRules: React.Dispatch<React.SetStateAction<boolean>>;
    bonusRules: boolean;
    setBonusRules: React.Dispatch<React.SetStateAction<boolean>>
}

const NormalGame: React.FC<NormalGameProps> = ({ rulesModal, setRulesModal, normalRules, setNormalRules, bonusRules, setBonusRules }) => {
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState("");
    const [winner, setWinner] = useState("");
    const [computerChoice, setComputerChoice] = useState("");
    const options = ['paper', 'rock', 'scissors'];

    function handleClicks(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const id = e.currentTarget.id;
        if (id === 'again') {
            setSelected("");
            setWinner("");
            setComputerChoice("");
        } else {
            setSelected(() => id);
            const randomIndex = Math.floor(Math.random() * options.length);
            const computerChoice = options[randomIndex];
            setTimeout(() => {
                setComputerChoice(computerChoice);
            }, 500);

            if (['rock', 'paper', 'scissors'].includes(id)) {
                const playerChoice = id as Choice;
                const computerChoose = computerChoice as Choice;
                setTimeout(() => {
                    winnerFunction(playerChoice, computerChoose, setWinner, setScore);
                }, 500)
            }
        }
    }

    function rulesClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const id = e.currentTarget.id;
        if (id === 'normal') {
            setNormalRules(true);
            setRulesModal(true);
        } else if (id === 'back') {
            setNormalRules(false);
            setRulesModal(false);
        }
    }

    return (
        <div className={styles.gameContainer}>
            <div className={styles.container}>
                <div className={styles.gameType}>
                    <img src={logo} alt='Rock Paper Scissors' />
                </div>
                <div className={styles.scoreboard}>
                    <h3 className={`${styles.scoreboard__header} ${styles.scoreboard__main}`}>Score</h3>
                    <h3 className={`${styles.scoreboard__header} ${styles.scoreboard__score}`}>{score}</h3>
                </div>
            </div>
            {selected === "" ? 
            <div className={styles.gameArea}>
                <button id='rock' className={`${styles.btn} ${styles.rock}`} onClick={(e) => handleClicks(e)}></button>
                <button id='paper' className={`${styles.btn} ${styles.paper}`} onClick={(e) => handleClicks(e)}></button>
                <button id='scissors' className={`${styles.btn} ${styles.scissors}`} onClick={(e) => handleClicks(e)}></button>
            </div> :
            <div className={styles.results}>
                <div className={styles.results__yourSelection}>
                    <h1 className={styles.results__header}>You Picked</h1>
                    {selected === 'rock' && <div id='rock' className={`${styles.selected} ${styles.selected__rock} ${winner === 'You Win' ? styles.winner : ""}`}></div>}
                    {selected === 'paper' && <div id='paper' className={`${styles.selected} ${styles.selected__paper} ${winner === 'You Win' ? styles.winner : ""}`}></div>}
                    {selected === 'scissors' && <div id='scissors' className={`${styles.selected} ${styles.selected__scissors} ${winner === 'You Win' ? styles.winner : ""}`}></div>}
                </div>
                {winner !== "" && 
                <div className={styles.results__winnerContainer}>
                    <h1 className={styles.results__winner}>{winner}</h1>
                    <button className={styles.againBtn} id='again' onClick={(e) => handleClicks(e)}>Play again</button>
                </div>}
                <div className={styles.results__houseSelection}>
                    <h1  className={styles.results__header}>The House Picked</h1>
                    {computerChoice === "" && <div className={styles.selectedContainer}></div>}
                    {computerChoice === 'rock' && <div id='rock' className={`${styles.selected} ${styles.selected__rock} ${winner === 'You Lose' ? styles.winner : ""}`}></div>}
                    {computerChoice === 'paper' && <div id='paper' className={`${styles.selected} ${styles.selected__paper} ${winner === 'You Lose' ? styles.winner : ""}`}></div>}
                    {computerChoice === 'scissors' && <div id='scissors' className={`${styles.selected} ${styles.selected__scissors} ${winner === 'You Lose' ? styles.winner : ""}`}></div>}
                </div>
            </div>
            }
            <div>
                <div className={styles.rulesContainer}>
                    <button className={styles.rulesBtn} id='normal' onClick={(e) => rulesClick(e)}>
                        Rules
                    </button>
                </div>
            </div>
            {rulesModal && <Rules setRulesModal={setRulesModal} rulesModal={rulesModal} normalRules={normalRules} setNormalRules={setNormalRules} bonusRules={bonusRules} setBonusRules={setBonusRules} />}
        </div>
    )
}

export default NormalGame;