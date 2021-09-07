import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Proficiency} from "../../proficiency/proficency.model";
import {ClassService} from "../class.service";
import {SocialAuthService} from "angularx-social-login";

@Component({
  selector: 'app-class-item',
  templateUrl: './class-item.component.html',
  styleUrls: ['./class-item.component.css']
})
export class ClassItemComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() description: string;
  @Input() hitDice: number;
  @Input() healthPoints: number;
  @Input() healthPointsOnHigherLevels: number;
  @Input() proficiencies: Proficiency[];

  @Output() stateChanged = new EventEmitter<boolean>();

  loggedIn: boolean;

  constructor(private classService: ClassService, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(socialUser => this.loggedIn = !!socialUser);
  }

  private types = {
    "SAVING_THROW": "Rzut obronny",
    "LANGUAGE": "Język",
    "SKILL": "Umiejętność",
    "TOOLS": "Narzędzia"
  }

  proficiencyTypeToString(type) {
    return this.types[type];
  }

  onDelete(id: number) {
    return this.classService.delete(id).subscribe(response => this.stateChanged.emit());
  }

}
