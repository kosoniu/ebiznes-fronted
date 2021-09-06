
export class RaceFeature {
  id: number;
  name: string;
  description: string;
  raceId: number;

  constructor(id: number, name: string, description: string, raceId: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.raceId = raceId;
  }
}
