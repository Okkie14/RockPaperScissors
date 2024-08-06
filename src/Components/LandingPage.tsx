import { Button } from "@mui/material";
import styles from "../Styles/landingPage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Rules from "./Rules";

interface NormalGameProps {
    rulesModal: boolean;
    setRulesModal: React.Dispatch<React.SetStateAction<boolean>>;
    normalRules: boolean;
    setNormalRules: React.Dispatch<React.SetStateAction<boolean>>;
    bonusRules: boolean;
    setBonusRules: React.Dispatch<React.SetStateAction<boolean>>
}

const LandingPage: React.FC<NormalGameProps> = ({ rulesModal, setRulesModal, normalRules, setNormalRules, bonusRules, setBonusRules }) =>  {
    const navigate = useNavigate();
    const [hoverNormal, setHoverNormal] = useState(false);
    const [hoverBonus, setHoverBonus] = useState(false);

    function handleOnClicks(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const id = e.currentTarget.id;
        if (id === 'rules') {
            setRulesModal(true);
        } else if (id === 'normal') {
            navigate('/rock-paper-scissors');
        } else if (id === 'bonus') {
            navigate('bonus-game');
        }
    }

    return (
        <>
        <div className={styles.container}>
            <h1 className={styles.header}>Welcome back!</h1>
            <h2 className={styles.subheader}>Which game would you like to play?</h2>
            <h2 className={styles.gameType}>{hoverBonus ? 'Rock, Paper, Scissors, Lizard, Spock' : hoverNormal ? 'Rock, Paper, Scissors' : ''}</h2>
            <div className={styles.btnContainer}>
                <div className={styles.btns}>
                    <Button onMouseEnter={() => setHoverNormal(true)} onMouseLeave={() => setHoverNormal(false)} variant="contained" color="primary" id='normal' onClick={e => handleOnClicks(e)}>
                        Normal Game
                    </Button>
                    <Button onMouseEnter={() => {setHoverNormal(true); setHoverBonus(true)}} onMouseLeave={() => {setHoverNormal(false); setHoverBonus(false)}} variant="contained" color="primary" id='bonus' onClick={e => handleOnClicks(e)}>
                        Bonus Game
                    </Button>
                </div>
                <div className={styles.divider}>
                    {(hoverNormal || hoverBonus) && <div className={`${styles.normal} ${hoverNormal ? styles.rock : styles.game}`}></div>}
                    {(hoverNormal || hoverBonus) &&<div className={`${styles.normal} ${hoverNormal ? styles.paper : styles.game}`}></div>}
                    {(hoverNormal || hoverBonus) &&<div className={`${styles.normal} ${hoverNormal ? styles.scissors : styles.game}`}></div>}
                    {(hoverNormal && hoverBonus) &&<div className={`${styles.normal} ${hoverNormal && hoverBonus ? styles.lizard : styles.game}`}></div>}
                    {(hoverNormal && hoverBonus) &&<div className={`${styles.normal} ${hoverNormal && hoverBonus ? styles.spock : styles.game}`}></div>}
                </div>
                
            </div>
            <div className={styles.rulesBtn}>
                <Button variant="outlined" id='rules' onClick={e => handleOnClicks(e)} sx={{ color: 'white', borderColor: 'white' }}>
                    Rules
                </Button>
            </div>
        </div>
        {/* Modal */}
        {rulesModal && <Rules setRulesModal={setRulesModal} rulesModal={rulesModal} normalRules={normalRules} setNormalRules={setNormalRules} bonusRules={bonusRules} setBonusRules={setBonusRules} />}
        </>
    )
}

export default LandingPage;