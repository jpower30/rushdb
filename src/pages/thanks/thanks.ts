import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RusheeFormPage } from '../rushee-form/rushee-form';

/**
 * Generated class for the ThanksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-thanks',
  templateUrl: 'thanks.html',
})
export class ThanksPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onClick() {
    this.navCtrl.push(RusheeFormPage, this.navParams);
  }
}
