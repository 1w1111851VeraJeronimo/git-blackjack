import { IDetalleUsuarioDto } from './security/i-detalle-usuario-dto';
import { IDetalleJuego } from './i-detalle-juego';

export interface IJuego {
    id: number;
    idUsuario: number;
    fecha: Date;
    activo: boolean;
    descripcion: string;
    ganoJugador: boolean;
    esEmpate: boolean;
    usuario: IDetalleUsuarioDto;
    detalleJuego: IDetalleJuego[];
    scoreCrupier: number;
    scoreJugador: number;
}
