import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProficiencyService} from "../proficiency.service";
import {ActivatedRoute} from "@angular/router";
import {SocialAuthService} from "angularx-social-login";

@Component({
  selector: 'app-proficiency-item',
  templateUrl: './proficiency-item.component.html',
  styleUrls: ['./proficiency-item.component.css']
})
export class ProficiencyItemComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() proficiencyType: number;

  @Output() stateChanged = new EventEmitter<boolean>();

  loggedIn: boolean;

  constructor(private proficiencyService: ProficiencyService, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(socialUser => this.loggedIn = !!socialUser);
  }

  onDelete(id: number) {
    return this.proficiencyService.delete(id).subscribe(() => this.stateChanged.emit());
  }

}
