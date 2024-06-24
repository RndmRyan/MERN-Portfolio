import React, { useState, useEffect } from 'react';
import './stylesheets/wordle.css';
import { useNavigate } from 'react-router-dom';

import WordleBoard from '../components/wordle/wordleboard';

function Wordle() 
{
  const navigate = useNavigate();

  const setpathHome = () => {
    navigate('/');
  };


  const [board, setBoard] = useState(
    Array(6).fill().map(() => Array(5).fill({ letter: '', color: 'grey' }))
  );

  const [targetWord, setTargetWord] = useState('');
  const [currentCell, setCurrentCell] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const [message, setMessage] = useState('');
  const [notify, setNotify] = useState('');
  const [gameOver, setGameOver] = useState(false);


  useEffect(() => {
    fetch('http://localhost:2010/getword')
      .then(response => response.json())
      .then(data => setTargetWord(data.word));
  }, []);


  useEffect(() => {
    const handleKeyPress = (event) => {
      if (gameOver) return; 

      const key = event.key;
      if (key === 'Backspace') {
        handleBackspace();
      } else if (key === 'Enter') {
        handleEnter();
      } else if (/^[a-zA-Z]$/.test(key)) {
        handleLetter(key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentCell, currentRow, board, gameOver]);

  const handleLetter = (letter) => {
    setNotify('');
    if (currentCell < 5) {
      const newBoard = board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === currentRow && colIndex === currentCell) {
            return { letter, color: 'grey' };
          }
          return cell;
        })
      );
      setBoard(newBoard);
      setCurrentCell((prevCell) => prevCell + 1);
    }
  };

  const handleBackspace = () => {
    setNotify('');
    if (currentCell > 0) {
      const newBoard = board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === currentRow && colIndex === currentCell - 1) {
            return { letter: '', color: 'grey' };
          }
          return cell;
        })
      );
      setBoard(newBoard);
      setCurrentCell((prevCell) => prevCell - 1);
    }
  };

  const handleEnter = () => {
    if (currentCell === 5) {
      const guess = board[currentRow].map(cell => cell.letter).join('');
      fetch('http://localhost:2010/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ guess }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            setNotify(data.message);
          } else {
            const newBoard = board.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                if (rowIndex === currentRow) {
                  return { letter: cell.letter, color: data.colors[colIndex] };
                }
                return cell;
              })
            );
            setBoard(newBoard);

            // Check if all colors are green
            if (data.colors.every(color => color === 'green')) {
              setMessage('You Guessed Correctly!');
              setGameOver(true); // Freeze the game
            } else if (currentRow < 5) {
              setCurrentRow((prevRow) => prevRow + 1);
              setCurrentCell(0);
            } else {
              setMessage(`Game Over, the word was ${targetWord}`);
              setGameOver(true); // Freeze the game
            }
          }
        });
    }
  };

  return (
    <>
      <button className="goHome" onClick={setpathHome}>Home</button>

      {message && <div className='Message'>{message}</div>}
      {notify && <div className='Notify'>{notify}</div>}

      <h1 className="GameTitle">Wordle</h1>

      <div className='MainPart'>
        <WordleBoard board={board} currentRow={currentRow} currentCell={currentCell} />

        <div className='Options'>
          <button onClick={() => window.location.reload()}>New Game</button>
        </div>
      </div>
    </>
  );
}

export default Wordle;