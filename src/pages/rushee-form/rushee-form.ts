import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validator';

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
              private formBuilder: FormBuilder) {

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
      console.log(this.infoForm.controls['name'].value);
      console.log(this.infoForm.controls['email'].value);
      console.log(this.infoForm.controls['phone'].value);
      console.log(this.infoForm.controls['homeTown'].value);
      console.log(this.infoForm.controls['major'].value);
      console.log(this.infoForm.controls['year'].value);
    }
  }

}
