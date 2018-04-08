import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  private people = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public nav: NavController) {
    this.people.push( {name: "Ranger", hometown: "Roswell, GA", major: "CS", year: 2, status: "Rushing", champion: "Papa P" });
    this.people.push( {name: "Ranger", hometown: "Roswell, GA", major: "CS", year: 2, status: "Rushing", champion: "Papa P" });
    this.people.push( {name: "Ranger", hometown: "Roswell, GA", major: "CS", year: 2, status: "Rushing", champion: "Papa P" });
    this.people.push( {name: "Ranger", hometown: "Roswell, GA", major: "CS", year: 2, status: "Rushing", champion: "Papa P" });
    this.people.push( {name: "Ranger", hometown: "Roswell, GA", major: "CS", year: 2, status: "Rushing", champion: "Papa P" });
    this.people.push( {name: "Ranger", hometown: "Roswell, GA", major: "CS", year: 2, status: "Pledged", champion: "Papa P" });
    this.people.push( {name: "Ranger", hometown: "Roswell, GA", major: "CS", year: 2, status: "Dumpster", champion: "Papa P" });
    //this.people.push( {name: "Ranger", hometown: "Roswell, GA", major: "CS", year: 2, status: "Rushing", champion: "Papa P" });
    this.setColor(this.people);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  public getInfo() : void {
    //call to rusheeForm
    console.log("wow");
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
    
  }


}
