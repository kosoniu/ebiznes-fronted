import { Component, OnInit } from '@angular/core';
import {RaceService} from "./race.service";
import {Race} from "./race.model";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RaceFeature} from "./race-feature.model";
import {RaceWithFeatures} from "./race-with-features.model";
import {SocialAuthService} from "angularx-social-login";

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {

  races: RaceWithFeatures[];
  raceFeatures: RaceFeature[] = [];
  loggedIn: boolean;

  raceForm = new FormGroup({
    id: new FormControl(0, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    raceFeatures: new FormArray([ this.createItem() ])
  });

  constructor(private raceService: RaceService, private route: ActivatedRoute, private socialAuthService: SocialAuthService) {
    this.races = [];
    this.route.data.subscribe(data => {
      console.log(data);
      this.races = data.races;
    });
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(socialUser => this.loggedIn = !!socialUser);
  }

  createItem(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      id: new FormControl(0)
    });
  }

  get features(): FormArray {
    return this.raceForm.get("raceFeatures") as FormArray;
  }

  addItem(): void {
    this.features.push(this.createItem());
  }

  deleteItem(): void {
    this.features.removeAt(this.features.length - 1);
  }

  onSubmit() {
    console.log(this.raceForm.value)

    let race = new Race(this.raceForm.get("id").value, this.raceForm.get("name").value, this.raceForm.get("description").value,)
    let raceFeatures = this.raceForm.value.raceFeatures;
    raceFeatures.forEach(feature => feature.raceId = race.id);
    let raceWithFeatures = new RaceWithFeatures(race, raceFeatures);

    this.raceService.add(raceWithFeatures).subscribe(() => {
      this.raceForm.reset({
        id: 0
      })
      this.raceService.get().subscribe(races => this.races = races);
    });
  }

  onDeleteFeature() {
    this.raceService.get().subscribe(races => this.races = races);
  }

}
