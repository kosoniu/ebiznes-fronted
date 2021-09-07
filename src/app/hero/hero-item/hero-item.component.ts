import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HeroService} from "../hero.service";
import {RaceWithFeatures} from "../../race/race-with-features.model";
import {OriginWithProficiencies} from "../../origin/origin-with-proficiencies.model";
import {ClassWithProficiencies} from "../../class/class-with-proficiencies.model";
import {SocialAuthService} from "angularx-social-login";

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.css']
})
export class HeroItemComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() level: number;
  @Input() race: RaceWithFeatures;
  @Input() origin: OriginWithProficiencies;
  @Input() clazz: ClassWithProficiencies;

  @Output() stateChanged = new EventEmitter<boolean>();

  loggedIn: boolean;

  constructor(private heroService: HeroService, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(socialUser => this.loggedIn = !!socialUser);
  }

  onDelete(id: number) {
    return this.heroService.delete(id).subscribe(() => this.stateChanged.emit());
  }

}
