import { Component, Inject, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ChatAppUI';
  authenticated = false;
  constructor(private broadCastService: MsalBroadcastService, private msalService: MsalService) {

  }

  ngOnInit(): void {
    // This peice of code will listen if there is any login or logout redirect is happening and it  will  call the setIsAuthenticated function after the redirect to the current page is completed.
      this.broadCastService.inProgress$
      .subscribe(() => {this.setIsAuthenticated()})
  }

  login() {
    this.msalService.loginRedirect();
  }

  logout() {
    this.msalService.logout();
  }

  setIsAuthenticated() {
    this.authenticated = this.msalService.instance.getAllAccounts().length > 0;
  }

}
