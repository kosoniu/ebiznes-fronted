import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {OriginService} from "./origin.service";
import {OriginWithProficiencies} from "./origin-with-proficiencies.model";

@Injectable()
export class OriginResolverService implements Resolve<OriginWithProficiencies[]> {
  constructor(private originService: OriginService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OriginWithProficiencies[]> | Promise<OriginWithProficiencies[]> | OriginWithProficiencies[] {
    return this.originService.get();
  }

}
