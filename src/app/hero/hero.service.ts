import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Hero} from "./hero.model";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class HeroService {

  private url = "http://localhost:9000/heroes";

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<Hero[]>(this.url)
  }

  add(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.url, hero);
  }

  delete(id: number): Observable<Hero> {
    return this.http.delete<Hero>(this.url + "/" + id);
  }
}
