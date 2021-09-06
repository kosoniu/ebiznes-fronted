import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {RaceService} from "./race.service";
import {RaceWithFeatures} from "./race-with-features.model";

@Injectable()
export class RaceResolverService implements Resolve<RaceWithFeatures[]> {
  constructor(private raceService: RaceService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RaceWithFeatures[]> | Promise<RaceWithFeatures[]> | RaceWithFeatures[] {
    return this.raceService.get();
  }

}
