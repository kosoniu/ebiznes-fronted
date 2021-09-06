import { Component, OnInit } from '@angular/core';
import {ProficiencyService} from "./proficiency.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Proficiency} from "./proficency.model";
import {SocialAuthService} from "angularx-social-login";

@Component({
  selector: 'app-proficiency',
  templateUrl: './proficiency.component.html',
  styleUrls: ['./proficiency.component.css']
})
export class ProficiencyComponent implements OnInit {

  proficiencyForm: FormGroup;
  proficiencies: Proficiency[] = [];
  loggedIn: boolean;

  constructor(private proficencyService: ProficiencyService, private route: ActivatedRoute, private socialAuthService: SocialAuthService) {
    this.proficiencyForm = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      proficiencyType: new FormControl(null, [Validators.required])
    });

    this.route.data.subscribe(data => this.proficiencies = data.proficiencies);
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(socialUser => this.loggedIn = !!socialUser);
  }

  onProficiencySubmit() {
    this.proficencyService.add(this.proficiencyForm.value)
      .subscribe(() => {
        this.proficiencyForm.reset({
          id: 0
        });
        this.proficencyService.get()
          .subscribe(proficiencies => this.proficiencies = proficiencies)
      });
  }

  onDeleteProficiency() {
    this.proficencyService.get().subscribe(proficiencies => this.proficiencies = proficiencies);
  }

}
