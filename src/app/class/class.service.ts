import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {Class} from "./class.model";
import {ClassWithProficiencies} from "./class-with-proficiencies.model";

@Injectable({providedIn: 'root'})
export class ClassService {

  private static url: string = "http://localhost:9000/classes";

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<ClassWithProficiencies[]>(ClassService.url)
  }

  add(clazz: ClassWithProficiencies): Observable<ClassWithProficiencies> {
    return this.http.post<ClassWithProficiencies>(ClassService.url, clazz);
  }

  delete(id: number): Observable<ClassWithProficiencies> {
    return this.http.delete<ClassWithProficiencies>(ClassService.url + "/" + id);
  }
}
