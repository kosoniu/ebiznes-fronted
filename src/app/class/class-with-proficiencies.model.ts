import {Proficiency} from "../proficiency/proficency.model";
import {Class} from "./class.model";

export class ClassWithProficiencies {
  clazz: Class;
  proficiencies: Proficiency[];

  constructor(clazz: Class, proficiencies: Proficiency[]) {
    this.clazz = clazz;
    this.proficiencies = proficiencies;
  }
}
