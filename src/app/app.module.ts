import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import {HeroService} from "./hero/hero.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { RaceComponent } from './race/race.component';
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProficiencyComponent } from './proficiency/proficiency.component';
import {ProficiencyService} from "./proficiency/proficiency.service";
import { OriginComponent } from './origin/origin.component';
import {OriginService} from "./origin/origin.service";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {ProficienciesResolverService} from "./proficiency/proficiencies-resolver.service";
import { OriginItemComponent } from './origin/origin-item/origin-item.component';
import {OriginResolverService} from "./origin/origin-resolver.service";
import { ProficiencyItemComponent } from './proficiency/proficiency-item/proficiency-item.component';
import {ProficiencyFilter} from "./utils/utils.service";
import {HttpErrorInterceptor} from "./utils/httperror.interceptor";
import {RaceResolverService} from "./race/race-resolver.service";
import { RaceItemComponent } from './race/race-item/race-item.component';
import { ClassComponent } from './class/class.component';
import {ClassResolverService} from "./class/class-resolver.service";
import { ClassItemComponent } from './class/class-item/class-item.component';
import { HeroItemComponent } from './hero/hero-item/hero-item.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CalculatorItemComponent } from './calculator/calculator-item/calculator-item.component';
import {GoogleLoginProvider, SocialLoginModule} from "angularx-social-login";
import { LoginComponent } from './login/login.component';
import {AuthGuardService} from "./login/auth-guard-service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeroComponent,
    RaceComponent,
    ProficiencyComponent,
    OriginComponent,
    OriginItemComponent,
    ProficiencyItemComponent,
    ProficiencyFilter,
    RaceItemComponent,
    ClassComponent,
    ClassItemComponent,
    HeroItemComponent,
    CalculatorComponent,
    CalculatorItemComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    SocialLoginModule
  ],
  providers: [
    HeroService,
    ProficiencyService,
    OriginService,
    ProficienciesResolverService,
    OriginResolverService,
    RaceResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    ClassResolverService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true, //keeps the user signed in
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider('152580977759-4i5980qd1mvjqg3q69osimd195991nqn.apps.googleusercontent.com') // your client id
          }
        ]
      }
    },
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
