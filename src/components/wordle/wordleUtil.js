export const initializeBoard = () => {
    return Array(6).fill().map(() => Array(5).fill({ letter: '', color: 'grey' }));
  };
  
  export const handleLetter = (board, currentRow, currentCell, letter) => {
    if (currentCell < 5) {
      const newBoard = board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === currentRow && colIndex === currentCell) {
            return { letter, color: 'grey' };
          }
          return cell;
        })
      );
      return newBoard;
    }
    return board;
  };
  
  export const handleBackspace = (board, currentRow, currentCell) => {
    if (currentCell > 0) {
      const newBoard = board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === currentRow && colIndex === currentCell - 1) {
            return { letter: '', color: 'grey' };
          }
          return cell;
        })
      );
      return newBoard;
    }
    return board;
  };
  
  export const evaluateGuess = async (guess) => {
    const response = await fetch('http://localhost:2010/evaluate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guess }),
    });
    const data = await response.json();
    return data;
  };
  
  export const fetchTargetWord = async () => {
    const response = await fetch('http://localhost:2010/getword');
    const data = await response.json();
    return data.word;
  };