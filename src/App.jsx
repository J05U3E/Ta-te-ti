import { useState } from 'react';
import './index.css';
import confetti from 'canvas-confetti';
import { checkWinnerFrom } from './logics/board';
import { Square } from './components/Square.jsx';
import { WinnerModal } from './components/WinnerModal.jsx'
import { TURN } from './constants/constants.js';
import { saveGameToStorage, resetGameStorage } from './logics/storage/index.js';


function App(){
  // antes
  //const [board, setBoard] = useState(Array(9).fill(null)) 

  //guardando partida en localstorage
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null);
  }) 

  //antes el guardado del ESTADO del turno
  //const [turn, setTurn] = useState(TURN.X);
  //con localstorage el guardado de turno
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURN.X
    }
  );

  // "null" no hay ganador y "false" hay un empate
  const [winner, setWinner] = useState(null) 

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.X)
    setWinner(null)

    resetGameStorage()
  }
  
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {  // actualizar el tablero
    // si no tiene nada y no hay ganador actualizamos de lo contrario salimos de la funcion.
    if(board[index] || winner ) return 
    
    
    const newBoard = [...board] 
    // crear una copia de forma superficial del tablero, porque nunca se deben mutar los estados 
    // de react y las props. LOS ESTADOS SIEMPRE DEBEN SER NUEVOS PARA EVITAR PROBLEMAS DE RENDERIZADO
    newBoard[index]= turn       // en esa posiscion (index), ha guardado el turno "x" u "O"
    setBoard(newBoard)          // setear el tablero con el nuevo tablero modificado
    
    const newTurn = turn === TURN.X ? TURN.O : TURN.X; // cambiar el turno
    setTurn(newTurn);

    // Guardar partida en localStorage

    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

  
    // revisar si hay un ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){
      setWinner(newWinner)
      confetti()
    } else if(checkEndGame(newBoard)){
      setWinner(false) // empate
    }
  }


  return(
    <main className='board'> 
      <h1>TA-TE-TI</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return(
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURN.X}>{TURN.X}</Square>
        <Square isSelected={turn === TURN.O}>{TURN.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App;
