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
}
