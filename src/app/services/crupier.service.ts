import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrupierService {
  
  constructor() { }

  getHazValue() : Observable<number> {
    return this.getHazValueObservable;
  }

  private getHazValueObservable: Observable<number> = new Observable((observer) => {
    observer.next(this.getValueOfHaz());
    observer.complete();
  });
  
  private getValueOfHaz() : number {
      let ramdomNumber = this.randomIntFromInterval(1,100)%2;
      return ramdomNumber == 0 ? 1 : 11;
  }

  randomIntFromInterval(min: number, max: number) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
