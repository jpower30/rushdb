import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RusheeFormPage } from '../pages/rushee-form/rushee-form'
import { ThanksPage } from '../pages/thanks/thanks'
import { RusheeInfoPage } from '../pages/rushee-info/rushee-info'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RusheeFormPage,
    ThanksPage,
    RusheeInfoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RusheeFormPage,
    ThanksPage,
    RusheeInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}
