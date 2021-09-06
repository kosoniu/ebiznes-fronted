import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Hero} from "./hero.model";
import {HeroService} from "./hero.service";

@Injectable()
export class HeroResolverService implements Resolve<Hero[]> {
  constructor(private heroService: HeroService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Hero[]> | Promise<Hero[]> | Hero[] {
    return this.heroService.get();
  }

}
