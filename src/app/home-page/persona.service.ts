import { Persona } from './../shared/persona.model';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  configUrl = 'assets/config.json';
private people: Persona[];
  constructor(private http: HttpClient) {
    
   }
  getPeople() {
    return this.people.slice();
  }
  getPeoplefromWeb() {
    return this.http.get('http://localhost:3000/people');
  }
  deletePerson(id: string) {
   return this.http.delete('http://localhost:3000/people/' + id);
  }
  updatePerson(person: Persona) {
    return this.http.put('http://localhost:3000/people/' + person.id, person);
  }
  createPerson(person: Persona) {
    return this.http.post('http://localhost:3000/people/', person);
  }
}
