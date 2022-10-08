import { ICarta } from './i-carta';
export interface ICrupier {
    id: number;
    score: number;
    cartas: ICarta[];
}
