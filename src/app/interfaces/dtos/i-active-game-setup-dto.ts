import { ICarta } from '../i-carta';
import { IJugador } from '../i-jugador';

export interface IActiveGameSetupDto {
    idUsuario: number; 
    idJuego: number;
    active: boolean;
    jugador: IJugador,
    cartasUsuario: ICarta[],
    cartasCrupier: ICarta[]
}
