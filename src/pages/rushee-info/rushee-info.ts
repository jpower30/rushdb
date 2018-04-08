import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { ThanksPage } from '../thanks/thanks';

/**
 * Generated class for the RusheeInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rushee-info',
  templateUrl: 'rushee-info.html',
})
export class RusheeInfoPage {

  rusheeInfo: FormGroup;
  name: string;
  email: string;
  phone: string;
  homeTown: string;
  major: string;
  year: number;
  champion: string;
  status: string;
  description: string;
  notes: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider,
              private formBuilder: FormBuilder) {

    this.name = navParams.get('name');
    this.email = navParams.get('email');
    this.phone = navParams.get('phone');
    this.homeTown = navParams.get('homeTown');
    this.major = navParams.get('major');
    this.year = navParams.get('year');
    this.champion = navParams.get('champion');
    this.status = navParams.get('status');
    this.description = navParams.get('description');
    this.notes = navParams.get('notes');

    this.rusheeInfo = this.formBuilder.group({
      name: [this.name],
      email: [this.email],
      phone: [this.phone],
      homeTown: [this.homeTown],
      major: [this.major],
      year: [this.year],
      champion: [this.champion],
      status: [this.status],
      description: [this.description],
      notes: [this.notes]
    });
  }

  onSave() {
        if (this.rusheeInfo.valid) {
            var body = {
                name: this.rusheeInfo.controls['name'].value,
                email: this.rusheeInfo.controls['email'].value,
                phone: this.rusheeInfo.controls['phone'].value,
                homeTown: this.rusheeInfo.controls['homeTown'].value,
                major: this.rusheeInfo.controls['major'].value,
                year: this.rusheeInfo.controls['year'].value,
                champion: this.rusheeInfo.controls['champion'].value,
                status: this.rusheeInfo.controls['status'].value,
                description: this.rusheeInfo.controls['description'].value,
                notes: this.rusheeInfo.controls['notes'].value,
                userKey: this.navParams.get('userKey'),
                userToken: this.navParams.get('userToken')
            }
            var promise = this.restProvider.editRushee(body);
            promise.then(data => {
                console.log(data);
            });
            this.navCtrl.push(ThanksPage, this.navParams);
        }
  }
}
