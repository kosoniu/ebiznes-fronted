import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HeroComponent} from "./hero/hero.component";
import {RaceComponent} from "./race/race.component";
import {ProficienciesResolverService} from "./proficiency/proficiencies-resolver.service";
import {OriginComponent} from "./origin/origin.component";
import {OriginResolverService} from "./origin/origin-resolver.service";
import {ProficiencyComponent} from "./proficiency/proficiency.component";
import {RaceResolverService} from "./race/race-resolver.service";
import {ClassComponent} from "./class/class.component";
import {ClassResolverService} from "./class/class-resolver.service";
import {CalculatorComponent} from "./calculator/calculator.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  {
    path: 'heroes',
    component: HeroComponent,
    resolve: {
      classes: ClassResolverService,
      origins: OriginResolverService,
      races: RaceResolverService
    },
  },
  {
    path: 'races',
    component: RaceComponent,
    resolve: {
      races: RaceResolverService
    },
  },
  {
    path: 'classes',
    component: ClassComponent,
    resolve: {
      classes: ClassResolverService,
      proficiencies: ProficienciesResolverService
    },
  },
  {
    path: 'origins',
    component: OriginComponent,
    resolve: {
      proficiencies: ProficienciesResolverService,
      origins: OriginResolverService
    }
  },
  {
    path: 'proficiencies',
    component: ProficiencyComponent,
    resolve: {
      proficiencies: ProficienciesResolverService,
    }
  },
  {
    path: 'calculator',
    component: CalculatorComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
