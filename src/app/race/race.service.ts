import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Race} from "./race.model";
import {Observable} from "rxjs";
import {RaceWithFeatures} from "./race-with-features.model";

@Injectable({providedIn: 'root'})
export class RaceService {

  private static url: string = "http://localhost:9000/races";

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<RaceWithFeatures[]>(RaceService.url)
  }

  add(race: RaceWithFeatures): Observable<RaceWithFeatures> {
    return this.http.post<RaceWithFeatures>(RaceService.url, race);
  }

  delete(id: number): Observable<RaceWithFeatures> {
    return this.http.delete<RaceWithFeatures>(RaceService.url + "/" + id);
  }
}
