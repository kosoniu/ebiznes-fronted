import { Component, OnInit } from '@angular/core';
import {OriginService} from "./origin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Proficiency} from "../proficiency/proficency.model";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {Origin} from "./origin.model";
import {OriginWithProficiencies} from "./origin-with-proficiencies.model";
import {SocialAuthService} from "angularx-social-login";

@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrls: ['./origin.component.css']
})
export class OriginComponent implements OnInit {

  proficiencies: Proficiency[] = [];
  origins: OriginWithProficiencies[] = [];
  loggedIn: boolean;

  originForm: FormGroup;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private originService: OriginService, private router: Router, private route: ActivatedRoute, private socialAuthService: SocialAuthService) {
    this.originForm = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      proficiencies: new FormControl(null, [Validators.required])
    });

    this.route.data.subscribe(data => {
      this.proficiencies = data.proficiencies;
      this.origins = data.origins;
      data.proficiencies.forEach(proficiency => this.dropdownList.push(proficiency))
    });
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(socialUser => this.loggedIn = !!socialUser);

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Wybierz wszystkie',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
  }

  onOriginSubmit() {
    this.originForm.value.proficiencies = this.proficiencies.filter(proficiency => this.isProficiencyInArray(proficiency, this.originForm.value.proficiencies));
    this.originForm.value.proficiencies.map(proficiency => this.applyProficiencyType(proficiency));

    let origin = new Origin(this.originForm.get("id").value, this.originForm.get("name").value, this.originForm.get("description").value);
    let proficiencies = this.originForm.value.proficiencies;
    let originWithProficiencies = new OriginWithProficiencies(origin, proficiencies)

    this.originService.add(originWithProficiencies).subscribe(() => {
      this.originForm.reset({
        id: 0
      })
      this.selectedItems = [];
      this.originService.get().subscribe(origins => this.origins = origins);
    });
  }

  onDeleteOrigin() {
    this.originService.get().subscribe(origins => this.origins = origins);
  }

  private isProficiencyInArray(proficiency, proficiencies) {
    return proficiencies.find(p => p.id === proficiency.id);
  }

  private applyProficiencyType(proficiency: Proficiency) {
    let foundProficiency = this.proficiencies.find(p => p.id === proficiency.id);

    if(foundProficiency)
      proficiency.proficiencyType = foundProficiency.proficiencyType;

  }

}
