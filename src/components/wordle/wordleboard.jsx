import React, { memo } from 'react';

const WordleBoard = ({ board, currentRow, currentCell }) => {
  const renderCell = (cell, rowIndex, colIndex) => {
    const cellClass = rowIndex === currentRow && colIndex === currentCell ? 'current-cell' : '';
    const backgroundColorClass = cell.color;

    return (
      <td key={colIndex} className={`${cellClass} ${backgroundColorClass}`}>{cell.letter}</td>
    );
  };

  const renderRow = (row, rowIndex) => {
    const rowClass = rowIndex === currentRow ? 'current-row' : '';
    return (
      <tr key={rowIndex} className={rowClass}>
        {row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))}
      </tr>
    );
  };

  return (
    <div className='WordleBoard'>
      <table className='Wordle'>
        <tbody>
          {board.map((row, rowIndex) => renderRow(row, rowIndex))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(WordleBoard);
