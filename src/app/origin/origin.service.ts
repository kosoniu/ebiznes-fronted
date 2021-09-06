import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Origin} from "./origin.model";
import {OriginWithProficiencies} from "./origin-with-proficiencies.model";

@Injectable({providedIn: 'root'})
export class OriginService {

  private url = "http://localhost:9000/origins";

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<OriginWithProficiencies[]>(this.url)
  }

  add(origin: OriginWithProficiencies): Observable<OriginWithProficiencies> {
    return this.http.post<OriginWithProficiencies>(this.url, origin);
  }

  delete(id: number): Observable<OriginWithProficiencies> {
    return this.http.delete<OriginWithProficiencies>(this.url + "/" + id);
  }
}
