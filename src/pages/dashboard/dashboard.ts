import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RusheeFormPage } from '../rushee-form/rushee-form';
import { RestProvider } from '../../providers/rest/rest';
import { RusheeInfoPage } from '../rushee-info/rushee-info';
import { HomePage } from '../home/home';

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
    private dateList  = [];
    private searchQuery : string;
    private currentStatus : string;
    private currentDate : number;

    constructor(public navCtrl: NavController, public navParams: NavParams, public nav: NavController, public restProvider: RestProvider) {
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
            userToken: this.navParams.get('userToken'),
            visited: person.visited,
            hasPicture: person.hasPicture
        };
        console.log(body);
        this.navCtrl.push(RusheeInfoPage, body);
    }

    public setColor(person) : string  {
        if (person.status == "Rushing") {
            return "primary";
        }  else if (person.status == "Bid Eligible") {
            return "bidEligible";
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
            let i = 0;
            while (rushees[i] != null) {
                page.people.push(
                    {
                        email: rushees[i].email,
                        hometown: rushees[i].hometown,
                        userKey: rushees[i].userKey,
                        major: rushees[i].major,
                        name: rushees[i].name,
                        phone: rushees[i].phone,
                        year: rushees[i].year,
                        champion: rushees[i].champion,
                        status: rushees[i].status,
                        description: rushees[i].description,
                        notes: rushees[i].notes,
                        visited: rushees[i].visited,
                        hasPicture: rushees[i].hasPicture
                    }
                );
                i++;
            }
            page.activePeople = page.people;

            let dayStr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            var dates = [];
            for (var i = 0; i < page.people.length; i++) {
                for (var j = 0; j < page.people[i].visited.length; j++) {
                    dates.push(new Date(page.people[i].visited[j] + " UTC"));
                }
            }
            dates.sort(function(a, b) {
                return a.getTime() - b.getTime();
            });
            var days = [];
            for (var i = 0; i < dates.length; i++) {
                var day = dayStr[dates[i].getDay()];
                if (days.indexOf(dates[i].getDay()) < 0) {
                    page.dateList.push({value: dates[i].getDay(), text: day});
                    days.push(dates[i].getDay());
                }
            }
        });
    }

    public updateDisplay() {
        this.activePeople = [];
        for (var i = 0; i < this.people.length; i++) {
            var person = this.people[i];
            if ((!this.searchQuery ||
                 person.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0) &&
                (!this.currentStatus ||
                 person.status == this.currentStatus) && this.dateMatch(person)) {

                this.activePeople.push(this.people[i]);
            }
        }
        console.log(this.currentDate);
    }

    public dateMatch(person) : boolean {
        if (this.currentDate == -1) {
            return true;
        }
        for (var i = 0; i < person.visited.length; i++) {
            if (new Date(person.visited[i] + " UTC").getDay() == this.currentDate) {
                return true;
            }
        }
        return false;
    }

    public logOut() {
        this.navCtrl.push(HomePage);
    }

}
