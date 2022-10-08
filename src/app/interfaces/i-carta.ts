import { ICategoriaCarta } from './i-categoria-carta';
export interface ICarta {
    id: number; 
    identificador: number;
    numero: number;
    nombre: string; 
    valores: number[];
    showBack: boolean;
    categoriaId: number;
    categoria: ICategoriaCarta;
}
