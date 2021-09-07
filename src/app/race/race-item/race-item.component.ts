import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RaceService} from "../race.service";
import {RaceFeature} from "../race-feature.model";
import {SocialAuthService} from "angularx-social-login";

@Component({
  selector: 'app-race-item',
  templateUrl: './race-item.component.html',
  styleUrls: ['./race-item.component.css']
})
export class RaceItemComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() description: string;
  @Input() raceFeatures: RaceFeature[];

  @Output() stateChanged = new EventEmitter<boolean>();

  loggedIn: boolean;

  constructor(private raceService: RaceService, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(socialUser => this.loggedIn = !!socialUser);
  }

  onDelete(id: number) {
    return this.raceService.delete(id).subscribe(() => this.stateChanged.emit());
  }

}
