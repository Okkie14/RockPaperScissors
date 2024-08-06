import { useState } from 'react';
import styles from "../Styles/gameStyles.module.css";
import winnerFunction from "../Functions/BonusGame.ts";
import Rules from "./Rules";
import logo from "../assets/logo-bonus.svg";

type Choice = "rock" | "paper" | "scissors" | "lizard" | "spock";

interface BonusGameProps {
    rulesModal: boolean;
    setRulesModal: React.Dispatch<React.SetStateAction<boolean>>;
    normalRules: boolean;
    setNormalRules: React.Dispatch<React.SetStateAction<boolean>>;
    bonusRules: boolean;
    setBonusRules: React.Dispatch<React.SetStateAction<boolean>>
}

const BonusGame: React.FC<BonusGameProps> = ({ rulesModal, setRulesModal, normalRules, setNormalRules, bonusRules, setBonusRules }) => {
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState("");
    const [winner, setWinner] = useState("");
    const [computerChoice, setComputerChoice] = useState("");
    const options = ['paper', 'rock', 'scissors', 'lizard', 'spock'];

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

            if (['rock', 'paper', 'scissors', 'spock', 'lizard'].includes(id)) {
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
            setBonusRules(true);
            setRulesModal(true);
        } else if (id === 'back') {
            setBonusRules(false);
            setRulesModal(false);
        }
    }

    return (
        <div className={styles.gameContainer}>
            <div className={styles.container}>
                <div className={styles.gameType}>
                    <img src={logo} alt="Rock Paper Scissors Lizard Spock" />
                </div>
                <div className={styles.scoreboard}>
                    <h3 className={`${styles.scoreboard__header} ${styles.scoreboard__main}`}>Score</h3>
                    <h3 className={`${styles.scoreboard__header} ${styles.scoreboard__score}`}>{score}</h3>
                </div>
            </div>
                {selected === "" ?
                    <div className={styles.bonusGameArea}>
                        <button id="scissors" className={`${styles.btnBonus} ${styles.bonusScissors}`} onClick={(e) => handleClicks(e)} />
                        <button id="spock" className={`${styles.btnBonus} ${styles.bonusSpock}`} onClick={(e) => handleClicks(e)} />
                        <button id="paper" className={`${styles.btnBonus} ${styles.bonusPaper}`} onClick={(e) => handleClicks(e)} />
                        <button id="lizard" className={`${styles.btnBonus} ${styles.bonusLizard}`} onClick={(e) => handleClicks(e)} />
                        <button id="rock" className={`${styles.btnBonus} ${styles.bonusRock}`} onClick={(e) => handleClicks(e)} />
                    </div> :
                    <div className={styles.results}>
                    <div className={styles.results__yourSelection}>
                        <h1 className={styles.results__header}>You Picked</h1>
                        {selected === 'rock' && <div id='rock' className={`${styles.selected} ${styles.selected__rock} ${winner === 'You Win' ? styles.winner : ""}`}></div>}
                        {selected === 'paper' && <div id='paper' className={`${styles.selected} ${styles.selected__paper} ${winner === 'You Win' ? styles.winner : ""}`}></div>}
                        {selected === 'scissors' && <div id='scissors' className={`${styles.selected} ${styles.selected__scissors} ${winner === 'You Win' ? styles.winner : ""}`}></div>}
                        {selected === 'lizard' && <div id='lizard' className={`${styles.selected} ${styles.selected__lizard} ${winner === 'You Win' ? styles.winner : ""}`}></div>}
                        {selected === 'spock' && <div id='spock' className={`${styles.selected} ${styles.selected__spock} ${winner === 'You Win' ? styles.winner : ""}`}></div>}
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
                        {computerChoice === 'lizard' && <div id='scissors' className={`${styles.selected} ${styles.selected__lizard} ${winner === 'You Lose' ? styles.winner : ""}`}></div>}
                        {computerChoice === 'spock' && <div id='scissors' className={`${styles.selected} ${styles.selected__spock} ${winner === 'You Lose' ? styles.winner : ""}`}></div>}
                    </div>
                </div>
                }
                <div className={styles.rulesContainer}>
                    <button className={styles.rulesBtn} id='normal' onClick={(e) => rulesClick(e)}>
                        Rules
                    </button>
                </div>
            {rulesModal && <Rules setRulesModal={setRulesModal} rulesModal={rulesModal} bonusRules={bonusRules} setBonusRules={setBonusRules} normalRules={normalRules} setNormalRules={setNormalRules} />}
        </div>
    )
}

export default BonusGame;