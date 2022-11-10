export interface UpdateGameStatusRequestDto {
    idJuego: number;
    idUsuario: number;
    scoreCrupier: number;
    scoreJugador: number;
    ganaJugador: boolean;
    esEmpate: boolean;
}
