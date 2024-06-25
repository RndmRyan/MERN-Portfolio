import React, {useContext} from 'react'
import { WordleContext } from '../../pages/wordle';

function keys({keyVal}) {

    const {gameOver, handleLetterPress, handleEnterPress, handleBackspacePress
        , disabledLetters, correctLetters, almostLetters
    } = useContext(WordleContext);

    const SelectLetter = () => {
        if (gameOver) return;

        if (keyVal === 'Del') {
          handleBackspacePress();
        } else if (keyVal === 'Enter') {
          handleEnterPress();
        } else if (/^[a-zA-Z]$/.test(keyVal)) {
          handleLetterPress(keyVal.toUpperCase());
        }
    }

    const getLetterClass = () => {
        if (correctLetters.includes(keyVal)) return 'green';
        if (almostLetters.includes(keyVal)) return 'yellow';
        if (disabledLetters.includes(keyVal)) return 'grey';
        return '';
      };

  return (
    <div className={`Letters ${getLetterClass()}`} onClick={SelectLetter}>{keyVal}</div>
  )
}

export default keys