import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RusheeFormPage } from '../rushee-form/rushee-form';
import { RestProvider } from '../../providers/rest/rest';
import { RusheeInfoPage } from '../rushee-info/rushee-info';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  private people = [];

  private activePeople = [];

  private searchString = "";


  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: NavController, public restProvider: RestProvider) {
    // this.people.push( {name: "Ranger", hometown: "Roswell, GA", major: "CS", year: 2, status: "Rushing", champion: "Papa P" });
    // this.people.push( {name: "Ranger", hometown: "Roswell, GA", major: "CS", year: 2, status: "Rushing", champion: "Papa P" });
    // this.people.push( {name: "Ranger", hometown: "Roswell, GA", major: "CS", year: 2, status: "Rushing", champion: "Papa P" });
    // this.people.push( {name: "Ranger", hometown: "Roswell, GA", major: "CS", year: 2, status: "Rushing", champion: "Papa P" });
    // this.people.push( {name: "Ranger", hometown: "Roswell, GA", major: "CS", year: 2, status: "Rushing", champion: "Papa P" });
    // this.people.push( {name: "Ranger", hometown: "Roswell, GA", major: "CS", year: 2, status: "Pledged", champion: "Papa P" });
    // this.people.push( {name: "Ranger", hometown: "Roswell, GA", major: "CS", year: 2, status: "Dumpster", champion: "Papa P" });
    //this.people.push( {name: "Ranger", hometown: "Roswell, GA", major: "CS", year: 2, status: "Rushing", champion: "Papa P" });
    this.getData();

  }

  public getInfo(person) : void {
    var body = {
      name: person.name,
      email: person.email,
      phone: person.phone,
      hometown: person.hometown,
      major: person.major,
      year: person.year,
      champion: person.champion,
      status: person.status,
      description: person.description,
      notes: person.notes,
      userKey: person.userKey,
      userToken: this.navParams.get('userToken')
    };
    console.log(body);
    this.navCtrl.push(RusheeInfoPage, body);
  }

  public setColor(person) : string  {
      if (person.status == "Rushing") {
        return "primary";
      }  else if (person.status == "Bid Eligable") {
        return "bidEligable";
      }  else if (person.status == "Received Bid") {
        return "receivedBid";
      } else if (person.status == "Pledged") {
        return "pledged";
      } else if (person.status == "Dumpster") {
        return "dumpster";
      }
  }

  public addRushee() : void {
      this.navCtrl.push(RusheeFormPage, this.navParams);
  }


  public getData() {
      var body = {
        userToken: this.navParams.get("userToken")
      }
      var page = this;  //used to access this
      var promise = this.restProvider.getRushees(body).catch(function(err) {
              console.log(err);
            });
            promise.then(function(rushees) {
             // console.log(rushees);
             let i = 0;
             while (rushees[i] != null) {
               page.people.push({email: rushees[i].email, hometown: rushees[i].hometown, userKey: rushees[i].userKey, major: rushees[i].major,
               name: rushees[i].name, phone: rushees[i].phone, year: rushees[i].year, champion: rushees[i].champion, status: rushees[i].status,
              description: rushees[i].description, notes: rushees[i].notes });

               i++;
             }
             page.activePeople = page.people;
            });
  }

  public filterData(str) : any {
    this.searchString += str.data;
    if (str.data == null) {
      this.searchString = this.searchString.substring(0, this.searchString.length - 1)
    }
    if (this.searchString.length == 0) {
      this.activePeople = this.people;
    } else {
      this.activePeople = [];
      for (var i = 0; i < this.people.length; i++) {
        if (this.people[i].name.toLowerCase().indexOf(this.searchString) >= 0) {
          this.activePeople.push(this.people[i]);
        }
      }
    }



   // this.people = this.activePeople;
  }

}
