import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeroService} from "./hero.service";
import {Hero} from "./hero.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ClassWithProficiencies} from "../class/class-with-proficiencies.model";
import {RaceWithFeatures} from "../race/race-with-features.model";
import {OriginWithProficiencies} from "../origin/origin-with-proficiencies.model";
import {SocialAuthService} from "angularx-social-login";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  heroes: Hero[] = [];
  origins: OriginWithProficiencies[] = [];
  classes: ClassWithProficiencies[] = [];
  races: RaceWithFeatures[] = [];
  loggedIn: boolean;

  heroForm: FormGroup;

  constructor(private heroService: HeroService, private route: ActivatedRoute, private socialAuthService: SocialAuthService) {
    this.route.data.subscribe(data => {
      this.origins = data.origins;
      this.classes = data.classes;
      this.races = data.races;
    });

    this.heroService.get().subscribe(heroes => this.heroes = heroes);

    this.heroForm = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      classId: new FormControl(null, [Validators.required]),
      raceId: new FormControl(null, [Validators.required]),
      originId: new FormControl(null, [Validators.required]),
      level: new FormControl(1, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(socialUser => this.loggedIn = !!socialUser);
  }

  onSubmit(): void {
    console.log(this.heroForm.value)
    this.heroService.add(this.heroForm.value).subscribe(() => {
      this.heroForm.reset({
        id: 0
      })
      this.heroService.get().subscribe(heroes => this.heroes = heroes);
    });
  }

  onDelete(): void {
    this.heroService.get().subscribe(heroes => this.heroes = heroes);
  }

}
