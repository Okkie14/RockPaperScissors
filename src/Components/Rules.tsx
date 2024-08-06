import { Modal, Box, Button } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import styles from '../Styles/rules.module.css';
import NormalRules from "../assets/image-rules.svg";
import BonusRules from "../assets/image-rules-bonus.svg";

interface RulesProps {
    rulesModal: boolean;
    setRulesModal: Dispatch<SetStateAction<boolean>>;
    normalRules: boolean;
    bonusRules: boolean;
    setNormalRules: Dispatch<SetStateAction<boolean>>;
    setBonusRules: Dispatch<SetStateAction<boolean>>;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1,
    p: 2,
    overflowY: 'auto', // Enable vertical scrolling
    maxHeight: '95vh',
    width: { xs: '100%', md: '35%' },  // Responsive width
    minWidth: {xs: '100%', md: '35%'},
};

const Rules: React.FC<RulesProps> = ({ rulesModal, setRulesModal, normalRules, setNormalRules, bonusRules, setBonusRules }) => {
    function handleBackClick() {
        if (normalRules) {
            setNormalRules(false);
            setRulesModal(false);
        } else if (bonusRules) {
            setBonusRules(false);
            setRulesModal(false);
        } else {
            setRulesModal(false);
        }
    }

    function displayRules(normalRules: boolean, bonusRules: boolean) {
        if (normalRules) {
            return (
            <div className={styles.rulesContainer}>
                <img src={NormalRules} />
            </div>
            )
        } else if (bonusRules) {
            return (
                <div className={styles.rulesContainer}>
                    <img src={BonusRules} />
                </div>
            )
        } else {
            return (
                <>
                    <h1 className={styles.rulesHeader}>Rules</h1>
                    <h2 className={styles.rulesSubheader}>Normal Game</h2>
                    <p className={styles.rules}>Scissors cuts Paper</p>
                    <p className={styles.rules}>Paper covers Rock</p>
                    <p className={styles.rules}>Rock crushes Scissors</p>
                    <h2 className={styles.rulesSubheader}>Bonus Game</h2>
                    <h3 className={styles.rules}>Normal Game rules plus</h3>
                    <p className={styles.rules}>Rock crushes Lizard</p>
                    <p className={styles.rules}>Lizard poisons Spock</p>
                    <p className={styles.rules}>Spock smashes Scissors</p>
                    <p className={styles.rules}>Scissors decapitates Lizard</p>
                    <p className={styles.rules}>Lizard eats Paper</p>
                    <p className={styles.rules}>Paper disproves Spock</p>
                    <p className={styles.rules}>Spock vaporizes Rock</p>
                </>
            )
        }
    }
    return (
        <Modal open={rulesModal}>
            <Box sx={style}>
                {displayRules(normalRules, bonusRules)}
                <Box sx={{ justifyContent: 'center', display: 'flex', marginY: 2 }}>
                    <Button onClick={() => handleBackClick()} variant="contained">Close</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default Rules;