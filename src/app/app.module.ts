import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RusheeFormPage } from '../pages/rushee-form/rushee-form'
import { ThanksPage } from '../pages/thanks/thanks'
import { RusheeInfoPage, RusheeImage } from '../pages/rushee-info/rushee-info'
import { DashboardPage} from '../pages/dashboard/dashboard'
import { RegistrationPage } from '../pages/registration/registration'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RusheeFormPage,
    ThanksPage,
    RusheeInfoPage,
    DashboardPage,
    RegistrationPage,
    RusheeImage
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
    DashboardPage,
    RusheeFormPage,
    ThanksPage,
    RusheeInfoPage,
    DashboardPage,
    RegistrationPage,
    RusheeImage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    Camera
  ]
})
export class AppModule {}
