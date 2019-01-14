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
    private dateList = [];
    private currentDate = -1;
    private currentStatus = "";
    private searchQuery : string;
    private today : boolean;
    private championFilter : boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, public nav: NavController, public restProvider: RestProvider) {
        this.getData();
    }

    public getInfo(person) : void {
        let params = {
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
            visited: person.visited,
            hasPicture: person.hasPicture,
            userToken: this.navParams.get('userToken'),
            userName: this.navParams.get('userName'),
            userId: this.navParams.get('userId')
        };
        this.navCtrl.push(RusheeInfoPage, params);
    }

    public setColor(person) : string  {
        if (person.status == "Rushing") {
            return "primary";
        }  else if (person.status == "Interested") {
            return "interested";
        } else if (person.status == "Bid Eligible") {
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
            for (i = 0; i < page.people.length; i++) {
                for (var j = 0; j < page.people[i].visited.length; j++) {
                    dates.push(new Date(page.people[i].visited[j] + " UTC"));
                }
            }
            dates.sort(function(a, b) {
                return a.getTime() - b.getTime();
            });
            var days = [];
            for (var k = 0; k < dates.length; k++) {
                var day = dayStr[dates[k].getDay()];
                if (days.indexOf(dates[k].getDay()) < 0) {
                    page.dateList.push({value: dates[k].getDay(), text: day});
                    days.push(dates[k].getDay());
                }
            }
            console.log(page.people);
        });
    }

    public updateDate() {
        this.today = false;
        this.updateDisplay();
    }

    public updateDisplay() {
        this.activePeople = [];
        for (var i = 0; i < this.people.length; i++) {
            var person = this.people[i];
            if ((!this.searchQuery || person.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) >= 0) &&
                (!this.currentStatus || person.status == this.currentStatus) &&
                this.dateMatch(person) &&
                (!this.championFilter || person.champion === this.navParams.get("userId"))) {

                this.activePeople.push(this.people[i]);
            }
        }
    }

    public dateMatch(person) : boolean {
        if (!this.today && this.currentDate == -1) {
            return true;
        }
        let date = new Date().getDay();
        if (!this.today) {
            date = this.currentDate;
        }
        for (var i = 0; i < person.visited.length; i++) {
            if (new Date(person.visited[i] + " UTC").getDay() == date) {
                return true;
            }
        }
        return false;
    }

    public logOut() {
        this.navCtrl.push(HomePage);
    }

}
