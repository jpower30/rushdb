import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp({
      apiKey: 'AIzaSyBJjyzlDHxvM-IcxWZwzYY-cIvtMpVreQU',
      authDomain: 'rushdb-b1177.firebaseapp.com',
      databaseURL: 'https://rushdb-b1177.firebaseio.com',
      storageBucket: 'rushdb-b1177.appspot.com'
    });
  }
}

