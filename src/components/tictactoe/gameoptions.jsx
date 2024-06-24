import React from 'react';

const GameOptions = ({ starter, setStarter, newGame }) => {
    return (
        <div className='GameOptions'>
            <p>Who starts:
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
            <button onClick={newGame}>New Game</button>
        </div>
    );
}

export default GameOptions;
