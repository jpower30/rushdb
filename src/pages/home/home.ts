import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validator';
import { DashboardPage } from '../dashboard/dashboard';
import { RestProvider } from '../../providers/rest/rest';
import { RegistrationPage } from '../registration/registration'

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
                    var promise2 = page.restProvider.getUserInfo(user['userToken']).catch(function(err) {
                        console.log(err);
                    });
                    promise2.then(function(info) {
                        const params = {
                            userToken: user['userToken'],
                            userName: info['name'],
                            userId: info['userId']
                        }
                        console.log(params);
                        page.navCtrl.push(DashboardPage, params);
                    });
                } else {
                  page.failedLogIn = true;
                }
            });
        }
    }

    onRegister() {
      this.navCtrl.push(RegistrationPage);
    }
}
