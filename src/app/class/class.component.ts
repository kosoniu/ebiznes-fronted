import { Component, OnInit } from '@angular/core';
import {Proficiency} from "../proficiency/proficency.model";
import {Class} from "./class.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IDropdownSettings} from "ng-multiselect-dropdown";
import {ClassService} from "./class.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ClassWithProficiencies} from "./class-with-proficiencies.model";
import {SocialAuthService} from "angularx-social-login";

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  proficiencies: Proficiency[] = [];
  classes: ClassWithProficiencies[];
  loggedIn: boolean;

  classForm: FormGroup;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(private classService: ClassService, private router: Router, private route: ActivatedRoute, private socialAuthService: SocialAuthService) {
    this.classForm = new FormGroup({
      id: new FormControl(0, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      hitDice: new FormControl(null, [Validators.required]),
      healthPoints: new FormControl(null, [Validators.required]),
      healthPointsOnHigherLevels: new FormControl(null, [Validators.required]),
      proficiencies: new FormControl(null, [Validators.required])
    });

    this.route.data.subscribe(data => {
      this.proficiencies = data.proficiencies;
      this.classes = data.classes;
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

  onSubmit() {
    this.classForm.value.proficiencies = this.proficiencies.filter(proficiency => this.isProficiencyInArray(
      proficiency,
      this.classForm.value.proficiencies)
    );
    this.classForm.value.proficiencies.map(proficiency => this.applyProficiencyType(proficiency));

    let clazz = new Class(
      this.classForm.get("id").value,
      this.classForm.get("name").value,
      this.classForm.get("description").value,
      this.classForm.get("hitDice").value,
      this.classForm.get("healthPoints").value,
      this.classForm.get("healthPointsOnHigherLevels").value
    );
    let proficiencies = this.classForm.value.proficiencies;
    let classWithProficiencies = new ClassWithProficiencies(clazz, proficiencies);

    this.classService.add(classWithProficiencies).subscribe(() => {
      this.classForm.reset({
        id: 0
      });
      this.selectedItems = [];
      this.classService.get().subscribe(classes => this.classes = classes);
    });
  }

  onDelete() {
    this.classService.get().subscribe(classes => this.classes = classes);
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
