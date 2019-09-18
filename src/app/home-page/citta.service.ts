import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CittaService {
  constructor(private http: HttpClient) { }
  getCityfromWeb() {
    return this.http.get('http://localhost:3000/capoluoghi');
  }
  getname(id: string, cities: City[]): string {
    for(let i = 0; i < cities.length; i++) {
      if( cities[i].value === id) {
        return cities[i].label;
      }
    }
  }
}
