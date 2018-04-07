import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validator';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credentialsForm: FormGroup;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder) {

    this.credentialsForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.pattern(regexValidators.email), Validators.required])],
      password: ['', Validators.compose([Validators.pattern(regexValidators.password), Validators.required])]
    });
  }

  onSignIn() {
    if (this.credentialsForm.valid) {
      console.log('Email: ' +
        this.credentialsForm.controls['email'].value);
      console.log('Password: ' +
        this.credentialsForm.controls['password'].value);
    }
  }
}
