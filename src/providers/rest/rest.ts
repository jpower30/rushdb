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

}
