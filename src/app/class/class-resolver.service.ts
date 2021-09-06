import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ClassService} from "./class.service";
import {ClassWithProficiencies} from "./class-with-proficiencies.model";

@Injectable()
export class ClassResolverService implements Resolve<ClassWithProficiencies[]> {
  constructor(private classService: ClassService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClassWithProficiencies[]> | Promise<ClassWithProficiencies[]> | ClassWithProficiencies[] {
    return this.classService.get();
  }

}
