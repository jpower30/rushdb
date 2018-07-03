import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { regexValidators } from '../validators/validator';
import { RestProvider } from '../../providers/rest/rest';
import { ThanksPage } from '../thanks/thanks';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  image: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public restProvider: RestProvider,
              public camera: Camera,
              private formBuilder: FormBuilder) {

    this.image = "";

    this.infoForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', regexValidators.email],
      phone: ['', regexValidators.phone],
      hometown: [''],
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
                hometown: this.infoForm.controls['hometown'].value,
                major: this.infoForm.controls['major'].value,
                year: this.infoForm.controls['year'].value,
                status: "Rushing",
                notes: "",
                description: "",
                champion: "",
                visited: [],
                hasPicture: false,
                userToken: this.navParams.get('userToken')
            }
            var promise = this.restProvider.submitRushee(body).catch(function(err) {
              console.log(err);
            });
            promise.then(data => {
                if (this.image) {
                  var body = {
                    userKey: data['userKey'],
                    userToken: this.navParams.get('userToken'),
                    picture: this.image
                  }
                  console.log(body);
                  this.restProvider.submitPicture(body).catch(function(err) {
                    console.log(err);
                  });
                }
            });
            this.navCtrl.push(ThanksPage, this.navParams);
        }
  }

  takePicture(){
      if (!this.image) {
        const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          saveToPhotoAlbum: false,
          mediaType: this.camera.MediaType.PICTURE,
          cameraDirection: this.camera.Direction.FRONT
        }

        var promise = this.camera.getPicture(options).catch(function(err) {
          console.log(err);
        });
        promise.then((imageData) => {
          this.image = imageData;
          console.log(this.image);
        }, (err) => {
          console.log(err);
        });
      }
  }
}
