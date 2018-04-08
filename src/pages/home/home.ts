import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validator';
import { RusheeFormPage } from '../rushee-form/rushee-form';
import { RusheeInfoPage } from '../rushee-info/rushee-info';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credentialsForm: FormGroup;
  failedLogIn : boolean;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              public restProvider: RestProvider) {

    this.failedLogIn = false;

    this.credentialsForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.pattern(regexValidators.email), Validators.required])],
      password: ['']//, Validators.compose([Validators.pattern(regexValidators.password), Validators.required])]
    });
  }

    onSignIn() {
        if (this.credentialsForm.valid) {
            var email = this.credentialsForm.controls['email'].value;
            var password = this.credentialsForm.controls['password'].value;

            console.log('Email: ' + email);
            console.log('Password: ' + password);

            var page = this;
            var body = {
              email: email,
              password: password
            }
            var promise = this.restProvider.logIn(body).catch(function(err) {
              console.log(err);
            });
            promise.then(function(user) {
                console.log(user);
                if (user['userToken']) {
                    console.log(user['userToken']);
                    page.navCtrl.push(RusheeInfoPage, {userToken: user['userToken']});
                }
            });
        }
    }
}
