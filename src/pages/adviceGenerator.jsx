import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import diceIcon from '../assets/icon-dice.svg'
import patternDivider from '../assets/pattern-divider-desktop.svg'

import './stylesheets/advicestyles.css'

const AdviceGenerator = () => 
{
  const [adviceId, setAdviceId] = useState('');
  const [adviceText, setAdviceText] = useState('');

  const navigate = useNavigate();

  const setpathHome = () => {
      navigate("/");
  }

  const fetchAdvice = async () => {
    const button = document.getElementById('advice_button');
    document.body.style.cursor = 'progress';
    button.disabled = true;
    button.classList.add('disabled');

    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      const data = await response.json();
      setAdviceId(data.slip.id);
      setAdviceText(data.slip.advice);
      updateShareLinks(data.slip.advice);
    } catch (error) {
      console.error('Error fetching advice:', error);
    } finally {
      document.body.style.cursor = 'default';
      button.disabled = false;
      button.classList.remove('disabled');
    }
  };

  const updateShareLinks = (advice) => {
    const encodedAdvice = encodeURIComponent(advice);
    document.getElementById('facebook_share').href = `https://www.facebook.com/`;
    document.getElementById('instagram_share').href = `https://www.instagram.com/`;
    document.getElementById('linkedin_share').href = `https://www.linkedin.com/`;
    document.getElementById('whatsapp_share').href = `https://api.whatsapp.com/send?text=${encodedAdvice}`;
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div>
    <button className="goHome" onClick={setpathHome}>Home</button>

      <div className="advice_container">
        <div id="advice_no">ADVICE #<span id="advice_id">{adviceId}</span></div>
        <div id="advice_content">{adviceText && `"${adviceText}"`}</div>
        <img src={patternDivider} width="100%" alt="Pattern Divider" />
      </div>
      <div id="new_advice">
        <button id="advice_button" onClick={fetchAdvice}><img src={diceIcon} alt="Dice Icon" /></button>      
      </div>

      <div className="share-container">
        <p>Share:</p>
        <a id="facebook_share" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
        <a id="instagram_share" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
        <a id="linkedin_share" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
        <a id="whatsapp_share" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
      </div>

      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noopener noreferrer">Frontend Mentor</a>. 
        Coded by <a href="https://github.com/RndmRyan" target="_blank" rel="noopener noreferrer">Rayyan M. Zia</a>.
      </div>
    </div>
  );
};

export default AdviceGenerator;