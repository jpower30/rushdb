import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validator';
import { RusheeFormPage } from '../rushee-form/rushee-form';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credentialsForm: FormGroup;
  failedLogIn : boolean;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder) {

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
            var promise = firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                page.failedLogIn = true;
            });
            promise.then(function(user) {
                if (user) {
                    console.log(user['qa']);
                    page.navCtrl.push(RusheeFormPage, {userToken: user['qa']});
                }
            });
        }
    }
}
