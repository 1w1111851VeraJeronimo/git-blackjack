import { ICarta } from '../i-carta';
import { IJugador } from '../i-jugador';
import { IJuego } from '../i-juego';

export interface IActiveGameSetupDto {
    idUsuario: number; 
    idJuego: number;
    active: boolean;
    scoreJugador: number;
    scoreCrupier: number;
    jugador: IJugador,
    cartasUsuario: ICarta[],
    cartasCrupier: ICarta[],
    juegoDto: IJuego
}
