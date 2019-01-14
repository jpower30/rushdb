import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
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
  daysVisited: string;
  hasPicture: boolean;
  private brothers = [];
  private comments = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider,
              private formBuilder: FormBuilder, public modalCtrl: ModalController) {

    this.getBrothers();

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
    this.hasPicture = navParams.get('hasPicture');

    let visited = navParams.get('visited');
    if (visited != undefined) {
      let dayString = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let days = [];
      for (var i = 0; i < visited.length; i++) {
        var date = new Date(visited[i] + " UTC");
        var day = dayString[date.getDay()];
        if (days.indexOf(day) < 0) {
          days.push(day);
        }
      }
      this.daysVisited = days.join(", ");
    }

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
      notes: [""]
    });

    this.comments = this.notes.split("~~~");
    this.comments.reverse();
    if (this.comments[0] === "") {
      this.comments = [];
    }
    console.log(navParams);
  }

  onSave() {
        if (this.rusheeInfo.valid) {
            let newNotes = this.notes;
            //If something has been added to notes
            if (this.rusheeInfo.controls['notes'].value !== this.notes &&
                this.rusheeInfo.controls['notes'].value !== "") {
              //Add the seperator if the notes field already has something
              if (this.notes !== "") {
                newNotes += "~~~";
              }
              newNotes += this.rusheeInfo.controls['notes'].value + " -" + this.navParams.get('userName');
            }
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
                notes: newNotes,
                userKey: this.navParams.get('userKey'),
                userToken: this.navParams.get('userToken')
            }
            console.log(body);
            var promise = this.restProvider.editRushee(body).catch(function(err) {
              console.log(err);
            });
            promise.then(data => {
                console.log(data);
                this.navCtrl.push(DashboardPage, this.navParams);
            });
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

  viewPic() {
     var body = {
       userToken: this.navParams.get('userToken'),
       userKey: this.navParams.get('userKey')
     }
     var promise = this.restProvider.getPicture(body).catch(function(err) {
       console.log(err);
     });
     var name = this.name;
     var modalCtrl = this.modalCtrl;
     promise.then(function(resp) {
       let imageModal = modalCtrl.create(RusheeImage, { image: resp['picture'], name: name });
       imageModal.present();
     });
  }

  markVisited() {
    var body = {
      userToken: this.navParams.get('userToken'),
      userKey: this.navParams.get('userKey')
    }
    this.restProvider.markVisited(body).catch(function(err) {
      console.log(err);
    });
  }
}

@Component({
  selector: 'page-rushee-image',
  templateUrl: 'rushee-image.html',
})
export class RusheeImage {

 image: string;
 name: string;

 constructor(public navCtrl: NavController, params: NavParams) {
   this.image = "data:image/jpeg;base64," + params.get('image');
   this.name = params.get('name');
 }
 goBack() {
   this.navCtrl.pop();
 }
}
