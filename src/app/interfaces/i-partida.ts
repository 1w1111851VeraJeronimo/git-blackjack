import { IJugador } from './i-jugador';
export interface IPartida {
    id: number;
    fecha: Date;
    idJugador: number;
    scoreCrupier: number;
    scoreJugador: number;
    jugador: IJugador;
}
