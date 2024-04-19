import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MsalModule, MsalService, MsalGuard, MsalInterceptor, MsalBroadcastService, MsalRedirectComponent } from "@azure/msal-angular";
import { PublicClientApplication, InteractionType, BrowserCacheLocation } from "@azure/msal-browser";

const protectedResourceMap = new Map([
  ['*', ['user.read'] ]
]);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    MsalModule.forRoot( new PublicClientApplication({ // MSAL Configuration
      auth: {
          clientId: "fd492486-1576-4412-b3c1-f1935a3ce7fe",
          authority: "https://login.microsoftonline.com/e260fb4d-d711-45c9-8586-c3ddc7b9351c/",
          redirectUri: "https://rathore-chatappui.azurewebsites.net",
          postLogoutRedirectUri: "https://rathore-chatappui.azurewebsites.net",
          navigateToLoginRequestUrl: true
      },
      cache: {
          cacheLocation : BrowserCacheLocation.LocalStorage,
          storeAuthStateInCookie: true, // set to true for IE 11
      },
      system: {
          loggerOptions: {
              loggerCallback: () => {},
              piiLoggingEnabled: false
          }
      }
  }), {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
      authRequest: {
        scopes: ['user.read']
      },
  }, {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap
  })

  ],
  providers: [
    HttpClientModule, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
  },
  MsalGuard
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
