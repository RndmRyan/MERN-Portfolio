import React from 'react';

const GameOptions = ({ starter, setStarter, newGame, resetScores }) => {
    return (
        <div className='GameOptions'>
            <p>First Move:
                <label>
                    <input 
                        type="radio" 
                        name="starter" 
                        value="X" 
                        checked={starter === 'X'} 
                        onChange={() => setStarter('X')}
                    />
                    Human
                </label>
                <label>
                    <input 
                        type="radio" 
                        name="starter" 
                        value="O" 
                        checked={starter === 'O'} 
                        onChange={() => setStarter('O')}
                    />
                    AI
                </label>
            </p>
            <div className="Optionbuttons">
            <button onClick={newGame}>New Game</button>
            <button onClick={resetScores}>Reset Scores</button>
            </div>
        </div>
    );
}

export default GameOptions;
