import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) { }

  apiurl = 'http://localhost:3000/user';

  RegisterUser(inputdata: any) {
    return this.http.post(this.apiurl, inputdata)
  }

  GetUserbyCode(id: any) {
    return this.http.get(this.apiurl + '/' + id);
  }

  Getall() {
    return this.http.get(this.apiurl);
  }

  updateuser(id: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + id, inputdata);
  }

  getuserrole() {
    return this.http.get('http://localhost:3000/role');
  }

  isLoggedIn() {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('username') != null;
    }
  
    return false;
  }

  getrole() {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('role') != null ? sessionStorage.getItem('role')?.toString() : '';
    }
    return false;
  }
  GetAllCustomer() {
    return this.http.get('http://localhost:3000/customer');
  }
  Getaccessbyrole(role: any, menu: any) {
    return this.http.get('http://localhost:3000/roleaccess?role=' + role + '&menu=' + menu)
  }

  deleteAccount(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('role');
    }
  }
}
