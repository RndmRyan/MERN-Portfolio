import React from 'react';
import './strenghtDisplay.css'

const StrengthDisplay = ({ passwordStrength, indicatorColors }) => {
  return (
    <div className='strenghtLevel'>
        <p style={{color: '#a4ffaf'}}>STRENGTH</p>
        <div className='strenghticon'>
            <p>{passwordStrength}</p>
            <div className='squareIndicators'>
            {indicatorColors.map((color, index) => (
                <div
                    key={index}
                    className={`indicator ${color}`}
                    style={{
                    border: color === 'border' ? '1px solid #a4ffaf' : 'none',
                    backgroundColor: color !== 'border' ? color : 'transparent',

                    }}
                ></div>
            ))}
            </div>
        </div>
    </div>
  );
}

export default StrengthDisplay;