import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RestProvider {

  myheader: HttpHeaders;
  apiUrl = 'https://rushdb.herokuapp.com';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
    this.myheader = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8')
  }

  submitRushee(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/submit-rushee', JSON.stringify(data), {headers: this.myheader})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getRushees(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/get-rushees', JSON.stringify(data), {headers: this.myheader})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  editRushee(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/edit-rushee', JSON.stringify(data), {headers: this.myheader})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  logIn(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/login', JSON.stringify(data), {headers: this.myheader})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  register(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/create-new-user', JSON.stringify(data), {headers: this.myheader})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getOrgs() {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/get-org-list', JSON.stringify({}), {headers: this.myheader})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
