import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Proficiency} from "../../proficiency/proficency.model";
import {OriginService} from "../origin.service";
import {Router} from "@angular/router";
import {SocialAuthService} from "angularx-social-login";

@Component({
  selector: 'app-origin-item',
  templateUrl: './origin-item.component.html',
  styleUrls: ['./origin-item.component.css']
})
export class OriginItemComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() description: string;
  @Input() proficiencies: Proficiency[];

  @Output() stateChanged = new EventEmitter<boolean>();

  loggedIn: boolean;

  constructor(private originService: OriginService, private socialAuthService: SocialAuthService) {
  }

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
    return this.originService.delete(id).subscribe(() => this.stateChanged.emit());
  }

}
