import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loggedIn: boolean;

  constructor(private router: Router, private socialAuthService: SocialAuthService) {
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe(socialUser => this.loggedIn = !!socialUser);
  }

  login(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(socialUser => {
        this.loggedIn = true;
        console.log(socialUser)
        this.router.navigate(['heroes'])
      }, error => {
        console.log(error);
        this.loggedIn = false;
      });
  }

  logout() {
    this.socialAuthService.signOut().then(() => {
      this.loggedIn = false;
      this.router.navigate(['heroes'])
    });
  }
}
