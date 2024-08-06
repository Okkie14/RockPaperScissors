import LandingPage from "./Components/LandingPage";
import Rules from "./Components/Rules";
import BonusGame from "./Components/BonusGame";
import NormalGame from "./Components/NormalGame";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { useState } from 'react';

function App() {
  const [normalRules, setNormalRules] = useState(false);
  const [bonusRules, setBonusRules] = useState(false);
  const [rulesModal, setRulesModal] = useState(false);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/rock-paper-scissors" element={
          <NormalGame 
            normalRules={normalRules} 
            setNormalRules={setNormalRules} 
            bonusRules={bonusRules} 
            setBonusRules={setBonusRules} 
            rulesModal={rulesModal} 
            setRulesModal={setRulesModal} 
          />} 
        />
        <Route path="/bonus-game" element={
          <BonusGame 
            normalRules={normalRules} 
            setNormalRules={setNormalRules} 
            bonusRules={bonusRules} 
            setBonusRules={setBonusRules} 
            rulesModal={rulesModal} 
            setRulesModal={setRulesModal} 
          />} 
          
        />
        <Route path="/rules" element={
          <Rules 
            normalRules={normalRules} 
            setNormalRules={setNormalRules} 
            bonusRules={bonusRules} 
            setBonusRules={setBonusRules} 
            rulesModal={rulesModal} 
            setRulesModal={setRulesModal} 
          />} 
        />
      </Routes>
    </Router>
  )
}

export default App
