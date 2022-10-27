import { Injectable } from '@angular/core';

/*
  adding HttpClient, so it can use Http modules that's connected with app.module.ts,
  and adding Observable module for handling asynchronous requests and responses
*/
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIUrl = 'https://localhost:44355/api';
  readonly PhotoUrl = 'https://localhost:44355/Photos/';

  constructor(private http: HttpClient) {}

  // Department APIs
  getDepartmentsList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/department');
  }

  addDepartment(val: any) {
    return this.http.post(this.APIUrl + '/Department', val);
  }

  updateDepartment(val: any) {
    return this.http.put(this.APIUrl + '/department', val);
  }

  // Employee APIs
  getEmployeesList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/employee');
  }

  addEmployee(val: any) {
    return this.http.post(this.APIUrl + '/employee', val);
  }

  updateEmployee(val: any) {
    return this.http.put(this.APIUrl + '/employee', val);
  }

  // Upload photo Api
  uploadPhoto(val: any) {
    return this.http.post(this.APIUrl + '/employee/savefile', val);
  }

  // Get all names for departments
  getAllDepartmentNames(): Observable<any[]> {
    return this.http.get<any[]>(
      this.APIUrl + '/employee/getAllDepartmentNames'
    );
  }
}
