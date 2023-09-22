export const saveGameToStorage = ({ board, turn }) => {
    window.localStorage.setItem('board', JSON.stringify(board))  //guardado de tablero
    window.localStorage.setItem('turn', turn)  //guardado de turno
}

export const resetGameStorage = () => {
    window.localStorage.getItem('board')
    window.localStorage.getItem('turn')
}