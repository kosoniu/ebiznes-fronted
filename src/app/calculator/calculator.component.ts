import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  totalCost: number = 0;
  chosenRace;
  chosenSubrace;
  resetEventSubject: Subject<void> = new Subject<void>();

  raceForm: FormGroup;

  private costs = {
    "strength": 0,
    "dexterity": 0,
    "constitution": 0,
    "intelligence": 0,
    "wisdom": 0,
    "charisma": 0
  };

  headers: string[] = [
    "Cecha",
    "Ilość punktów cechy",
    "",
    "Bonus rasowy",
    "",
    "Sumaryczna ilość punktów cechy",
    "Modyfikator",
    "Wydane punkty"
  ];

  races = [
    {
      name: "Elf",
      modifiers: {
        "dexterity": 2
      },
      subraces: [
        {
          name: "Elf Wysoki",
          modifiers: {
            "intelligence": 1
          }
        },
        {
          name: "Elf Leśny",
          modifiers: {
            "wisdom": 1
          }
        }
      ]
    },
    {
      name: "Krasnolud",
      modifiers: {
        "constitution": 2
      },
      subraces: [
        {
          name: "Krasnolud Górski",
          modifiers: {
            "strength": 2
          }
        },
        {
          name: "Krasnolud Wzgórzowy",
          modifiers: {
            "wisdom": 1
          }
        }
      ]
    }
  ];

  attributes = {
    "strength": "Siła",
    "dexterity": "Zręczność",
    "constitution": "Kondycja",
    "wisdom": "Mądrość",
    "intelligence": "Inteligencja",
    "charisma": "Charyzma"
  }

  constructor() {
    this.raceForm = new FormGroup({
      race: new FormControl(this.races[0].name, [Validators.required]),
      subrace: new FormControl(this.races[0].subraces[0].name, [Validators.required])
    });

    this.chosenRace = this.races[0];
    this.chosenSubrace = this.chosenRace.subraces[0];
  }

  ngOnInit(): void {

    this.raceForm.get("race").valueChanges.subscribe(chosenRace => {
      this.chosenRace = this.races.find(race => race.name === chosenRace);
      this.raceForm.patchValue({
        subrace: this.chosenRace.subraces[0].name
      });
    });

    this.raceForm.get("subrace").valueChanges.subscribe(chosenSubrace => this.chosenSubrace = this.chosenRace.subraces.find(subrace => subrace.name === chosenSubrace));
  }

  onAttributeChange(event) {
    this.costs[event.attribute] = event.cost;
    this.totalCost = Object.values(this.costs).reduce((accumulator, currentValue) => accumulator + currentValue);
  }

  emitResetEvent() {
    this.resetEventSubject.next();
  }

  getRacialModifierForAttribute(attribute) {
    let modifierValue = 0;

    if(this.chosenRace.modifiers[attribute] != null) {
      modifierValue = this.chosenRace.modifiers[attribute];
    } else if (this.chosenSubrace.modifiers[attribute] != null) {
      modifierValue = this.chosenSubrace.modifiers[attribute];
    }

    return modifierValue;
  }

}
