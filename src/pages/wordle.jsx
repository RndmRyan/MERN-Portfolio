import React, { useState, useEffect, createContext } from 'react';
import './stylesheets/wordle.css';
import { useNavigate } from 'react-router-dom';

import WordleBoard from '../components/wordle/wordleboard';
import KeyBoard from '../components/wordle/keyboard';

import { initializeBoard, handleLetter, handleBackspace, evaluateGuess, fetchTargetWord } from '../components/wordle/wordleUtil';

export const WordleContext = createContext();

function Wordle() 
{
  const navigate = useNavigate();

  const setpathHome = () => {
    navigate('/');
  };


  const [board, setBoard] = useState(initializeBoard());
  const [targetWord, setTargetWord] = useState('');
  const [currentCell, setCurrentCell] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const [message, setMessage] = useState('');
  const [notify, setNotify] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);


  useEffect(() => {
    fetchTargetWord().then(word => setTargetWord(word));
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (gameOver) return;

      const key = event.key;
      if (key === 'Backspace') {
        handleBackspacePress();
      } else if (key === 'Enter') {
        handleEnterPress();
      } else if (/^[a-zA-Z]$/.test(key)) {
        handleLetterPress(key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentCell, currentRow, board, gameOver]);

  const handleLetterPress = (letter) => {
    setNotify('');
    const newBoard = handleLetter(board, currentRow, currentCell, letter);
    if (newBoard !== board) {
      setBoard(newBoard);
      setCurrentCell((prevCell) => prevCell + 1);
    }
  };

  const handleBackspacePress = () => 
  {
    setNotify('');
    const newBoard = handleBackspace(board, currentRow, currentCell);
    if (newBoard !== board) {
      setBoard(newBoard);
      setCurrentCell((prevCell) => prevCell - 1);
    }
  };

  const handleEnterPress = () => {
    if (currentCell === 5) 
    {
      const guess = board[currentRow].map(cell => cell.letter).join('');
      evaluateGuess(guess).then(data => {
        if (data.message) {
          setNotify(data.message);
        } 
        else {
          const newBoard = board.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              if (rowIndex === currentRow) {
                return { letter: cell.letter, color: data.colors[colIndex] };
              }
              return cell;
            })
          );
          setBoard(newBoard);

          const newDisabledLetters = [...disabledLetters];
          const newCorrectLetters = [...correctLetters];
          const newAlmostLetters = [...almostLetters];

          data.colors.forEach((color, index) => {
            const letter = guess[index];
            if (color === 'green') {
              if (!newCorrectLetters.includes(letter)) {
                newCorrectLetters.push(letter);
              }
            } else if (color === 'yellow') {
              if (!newAlmostLetters.includes(letter) && !newCorrectLetters.includes(letter)) {
                newAlmostLetters.push(letter);
              }
            } else {
              if (!newDisabledLetters.includes(letter)) {
                newDisabledLetters.push(letter);
              }
            }
          });

          setDisabledLetters(newDisabledLetters);
          setCorrectLetters(newCorrectLetters);
          setAlmostLetters(newAlmostLetters);


          if (data.colors.every(color => color === 'green')) {
            setMessage('You Guessed Correctly!');
            setGameOver(true);
          } else if (currentRow < 5) {
            setCurrentRow((prevRow) => prevRow + 1);
            setCurrentCell(0);
          } else {
            setMessage(`Game Over, the word was ${targetWord}`);
            setGameOver(true);
          }
        }
      });
    }
  };

  const resetGame = () => {
    setBoard(initializeBoard());
    setCurrentCell(0);
    setCurrentRow(0);
    setMessage('');
    setNotify('');
    setGameOver(false);
    fetchTargetWord().then(word => setTargetWord(word));
    setDisabledLetters([]);
    setAlmostLetters([]);
    setCorrectLetters([]);
  };

  return (
    <>
      <button className="goHome" onClick={setpathHome}>Home</button>

      {message && <div className='Message'>{message}</div>}
      {notify && <div className='Notify'>{notify}</div>}

      <h1 className="GameTitle">Wordle</h1>

      <div className='MainPart'>
        <WordleBoard board={board} currentRow={currentRow} currentCell={currentCell} />

        <WordleContext.Provider value={{gameOver, handleLetterPress, handleEnterPress,
           handleBackspacePress, disabledLetters, correctLetters, almostLetters}}>
          <KeyBoard />
        </WordleContext.Provider>

        <div className='Options'>
          <button onClick={()=>{resetGame(); document.activeElement.blur();}}>New Game</button>
        </div>
      </div>
    </>
  );
}

export default Wordle;