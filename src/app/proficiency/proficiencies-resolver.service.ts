import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Proficiency} from "./proficency.model";
import {ProficiencyService} from "./proficiency.service";

@Injectable()
export class ProficienciesResolverService implements Resolve<Proficiency[]> {
  constructor(private proficiencyService: ProficiencyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Proficiency[]> | Promise<Proficiency[]> | Proficiency[] {
    return this.proficiencyService.get();
  }

}
