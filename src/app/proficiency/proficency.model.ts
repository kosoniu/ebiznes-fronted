
export class Proficiency {
  id: number;
  name: string;
  proficiencyType: number;

  constructor(id: number, name: string, proficiencyType: number) {
    this.id = id;
    this.name = name;
    this.proficiencyType = proficiencyType;
  }
}
