import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validator';
import { RestProvider } from '../../providers/rest/rest';

/**
 * Generated class for the RusheeFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-rushee-form',
  templateUrl: 'rushee-form.html',
})
export class RusheeFormPage {

  infoForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public restProvider: RestProvider,
              private formBuilder: FormBuilder) {

    console.log(navParams.get('userToken'));

    this.infoForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', regexValidators.email],
      phone: ['', regexValidators.phone],
      homeTown: [''],
      major: [''],
      year: ['', regexValidators.year]
    });
  }

    onSubmit() {
        if (this.infoForm.valid) {
            var body = {
                name: this.infoForm.controls['name'].value,
                email: this.infoForm.controls['email'].value,
                phone: this.infoForm.controls['phone'].value,
                homeTown: this.infoForm.controls['homeTown'].value,
                major: this.infoForm.controls['major'].value,
                year: this.infoForm.controls['year'].value,
                userToken: this.navParams.get('userToken')
            }
            var promise = this.restProvider.submitRushee(body);
            promise.then(data => {
                console.log(data);
            });
        }
  }
}
