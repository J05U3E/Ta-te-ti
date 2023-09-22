import { WINNER_COMBOS } from "../constants/constants";

// revisamos todas las convinaciones de WINNER_COMBOS para ver si en el tablero hay un ganador  
export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if(
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
      ) {
      return boardToCheck[a];
      }
  }
  return null
} 