import {Race} from "./race.model";
import {RaceFeature} from "./race-feature.model";

export class RaceWithFeatures {
  race: Race;
  raceFeatures: RaceFeature[];

  constructor(race: Race, raceFeatures: RaceFeature[]) {
    this.race = race;
    this.raceFeatures = raceFeatures;
  }
}
