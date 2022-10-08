import { ICarta } from "../../interfaces/i-carta";
import { ICategoriaCarta } from "../../interfaces/i-categoria-carta";

export class datasetprovider {
    fillArray() : ICarta[] {
        let cartas: Array<ICarta> = [];
        let totalCats = 5;
        let index = 1;
        //Iteracion 1: Diamantes
        //Iteracion 2: Pica
        //Iteracion 3: Trebol
        //Iteracion 4: Corazon
    
        for(let i = 1; i < totalCats; i++){
            let descripcion = "";
            let codigo = "";
           
            if(i == 1){
              descripcion = "Diamante";
              codigo = "D";
            }else if(i == 2){
              descripcion = "Pica";
              codigo = "P";
            }else if(i == 3){
              descripcion = "Trebol";
              codigo = "T";
            }else if(i = 4){
              descripcion = "Corazon";
              codigo = "C";
            }
    
            let categoria = {id: i, descripcion: descripcion, codigo: codigo} as ICategoriaCarta;
    
            for(let j = 1; j < 14; j++){
              let valores = [];
              let nombreCarta = null;
    
              if(j == 1){
                nombreCarta = "A";
              }else if(j == 11){
                nombreCarta = "Q";
              }else if(j == 12){
                nombreCarta = "K";
              }else if(j == 13){
                nombreCarta = "J";
              }
    
              if(j == 1){
                valores = [1, 11];
              }else if(j >= 2 && j <= 9){
                valores = [j];
              }else{
                valores = [10];
              }
    
              cartas.push({id: index, identificador: index, numero: j, nombre: nombreCarta, valores: valores, categoriaId: i, categoria:  categoria} as ICarta);
              index++;
          }
        }  
        return cartas;
      }
}