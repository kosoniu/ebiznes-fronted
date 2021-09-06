import {Proficiency} from "../proficiency/proficency.model";
import {Origin} from "./origin.model";

export class OriginWithProficiencies {
  origin: Origin;
  proficiencies: Proficiency[];

  constructor(origin: Origin, proficiencies: Proficiency[]) {
    this.origin = origin;
    this.proficiencies = proficiencies;
  }

}
