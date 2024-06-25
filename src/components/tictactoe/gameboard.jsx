import React from 'react';

const GameBoard = ({ board, handleCellClick }) => {
    const renderCell = (value, rowIndex, colIndex) => {
        return (
            <td key={colIndex} className={value ? '' : 'fakeX'} onClick={() => handleCellClick(rowIndex, colIndex)}>{value ? value : 'X'}</td>
        );
    }

    const renderRow = (row, rowIndex) => {
        return (
            <tr key={rowIndex}>
                {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
            </tr>
        );
    }

    return (
        <div className='GameBoard'>
            <table className='Game'>
                <tbody>
                    {board.map((row, rowIndex) => renderRow(row, rowIndex))}
                </tbody>
            </table>
        </div>
    );
}

export default GameBoard;
