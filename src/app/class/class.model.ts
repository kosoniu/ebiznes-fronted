import {Proficiency} from "../proficiency/proficency.model";

export class Class {
  id: number;
  name: string;
  description: string;
  hitDice: number;
  healthPoints: number;
  healthPointsOnHigherLevels;

  constructor(id: number, name: string, description: string, hitDice: number, healthPoints: number, healthPointsOnHigherLevels) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.hitDice = hitDice;
    this.healthPoints = healthPoints;
    this.healthPointsOnHigherLevels = healthPointsOnHigherLevels;
  }
}
