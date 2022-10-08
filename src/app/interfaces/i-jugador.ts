import { ICarta } from './i-carta';
export interface IJugador {
    id: number;
    nombre: string; 
    apellido: string; 
    score: number;
    cartas: ICarta[]
}
