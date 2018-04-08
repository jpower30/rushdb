import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { DashboardPage } from '../dashboard/dashboard';

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
  hometown: string;
  major: string;
  year: number;
  champion: string;
  status: string;
  description: string;
  notes: string;
  private brothers = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider,
              private formBuilder: FormBuilder) {

    this.name = navParams.get('name');
    this.email = navParams.get('email');
    this.phone = navParams.get('phone');
    this.hometown = navParams.get('hometown');
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
      hometown: [this.hometown],
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
                hometown: this.rusheeInfo.controls['hometown'].value,
                major: this.rusheeInfo.controls['major'].value,
                year: this.rusheeInfo.controls['year'].value,
                champion: this.rusheeInfo.controls['champion'].value,
                status: this.rusheeInfo.controls['status'].value,
                description: this.rusheeInfo.controls['description'].value,
                notes: this.rusheeInfo.controls['notes'].value,
                userKey: this.navParams.get('userKey'),
                userToken: this.navParams.get('userToken')
            }
            var promise = this.restProvider.editRushee(body).catch(function(err) {
              console.log(err);
            });
            promise.then(data => {
                console.log(data);
            });
            this.navCtrl.push(DashboardPage, this.navParams);
        }
  }

  getBrothers() {
    var body = {
      userToken: this.navParams.get('userToken')
    }
    var page = this;
    var promise = this.restProvider.getBrothers(body).catch(function(err) {
      console.log(err);
    });
    promise.then(function(bros) {
         let i = 0;
         while (bros[i] != null) {
           page.brothers.push(bros[i]);
           i++;
         }
         console.log(page.brothers);
    });

  }
}
