import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validator';
import { RestProvider } from '../../providers/rest/rest';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {

  credentialsForm: FormGroup;
  failedRegistration : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,
              public restProvider: RestProvider) {
    this.failedRegistration = false;

    this.credentialsForm = this.formBuilder.group({
      name: [''],
      orginization: [''],
      orgPassword: [''],
      email: ['', Validators.compose([Validators.pattern(regexValidators.email), Validators.required])],
      password: ['']//, Validators.compose([Validators.pattern(regexValidators.password), Validators.required])]
    });
  }

  onRegister() {
        if (this.credentialsForm.valid) {
            var page = this;
            var body = {
              name: this.credentialsForm.controls['name'].value,
              org: this.credentialsForm.controls['orginization'].value,
              orgPassword: this.credentialsForm.controls['orgPassword'].value,
              email: this.credentialsForm.controls['email'].value,
              password: this.credentialsForm.controls['password'].value
            }
            var promise = this.restProvider.register(body).catch(function(err) {
              console.log(err);
            });
            promise.then(function(user) {
                console.log(user);
                if (user && user['userToken']) {
                    console.log(user['userToken']);
                    page.navCtrl.push(DashboardPage, {userToken: user['userToken']});
                } else {
                  page.failedRegistration = true;
                }
            });
        }
    }
}
