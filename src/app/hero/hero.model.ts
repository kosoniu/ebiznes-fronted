import {RaceWithFeatures} from "../race/race-with-features.model";
import {OriginWithProficiencies} from "../origin/origin-with-proficiencies.model";
import {ClassWithProficiencies} from "../class/class-with-proficiencies.model";

export class Hero {
  id: number;
  name: string;
  level: number;
  race: RaceWithFeatures;
  origin: OriginWithProficiencies;
  clazz: ClassWithProficiencies;

  constructor(heroId: number, name: string, level: number, race: RaceWithFeatures, origin: OriginWithProficiencies, clazz: ClassWithProficiencies) {
    this.id = heroId;
    this.name = name;
    this.level = level;
    this.race = race;
    this.origin = origin;
    this.clazz = clazz;
  }
}
