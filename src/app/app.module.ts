import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MsalModule, MsalService, MsalGuard, MsalInterceptor, MsalBroadcastService, MsalRedirectComponent, MSAL_INSTANCE } from "@azure/msal-angular";
import { PublicClientApplication, InteractionType, BrowserCacheLocation, IPublicClientApplication } from "@azure/msal-browser";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: 'fd492486-1576-4412-b3c1-f1935a3ce7fe',
          authority: 'https://login.microsoftonline.com/e260fb4d-d711-45c9-8586-c3ddc7b9351c',
          redirectUri: 'https://4200-rasurathore13-chatappui-yakafolq0nu.ws-us110.gitpod.io/'
        },
        cache: {
          cacheLocation: 'sessionStorage'
        }
      }),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: ["user.read"],
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          ['*',['user.read']]
        ])
      }
    ),
  ],
  providers: [
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
