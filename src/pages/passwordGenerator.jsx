import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import copyicon from '../../src/assets/copy.svg'

import './stylesheets/passwordGen.css'
import Passwordsetting from '../../src/components/passwordGen/Passwordsettings.jsx'

function passwordGenerator() 
{
    const navigate = useNavigate();

    const setpathHome = () => {
        navigate("/");
    }


    const [generatedPassword, setGeneratedPassword] = useState('');
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);

    const copyClipboard = () => {
        navigator.clipboard.writeText(generatedPassword);
        setShowCopiedMessage(true);
        setTimeout(() => {
        setShowCopiedMessage(false);
        }, 1000);
    }

  return (
    <>
    <button className="goHome" onClick={setpathHome}>Home</button>
    <div className='passwordgenerator'>
    
      <div className='name'>
        <p>Password Generator</p>
      </div>

      <div className='generatedpasswords'>
        <p id="generatedpassword">{generatedPassword}</p>
        {!showCopiedMessage && (<img src={copyicon} width="25px" onClick={copyClipboard}></img>
        )}
        {showCopiedMessage && (
        <div className='copiedMessage'>Copied!</div>
        )}
      </div>
      
      <Passwordsetting setGeneratedPassword={setGeneratedPassword} />
      
    </div>
    </>
  )
}

export default passwordGenerator