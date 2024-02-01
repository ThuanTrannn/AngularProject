import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient
  ) {}

  apiurl = 'http://localhost:3000/user';

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(this.apiurl + '/' + sessionStorage.getItem('username'));
  }
 
  registerUser(inputdata: any) {
    return this.http.post(this.apiurl, inputdata)
  }

  getUserByCode(id: any) {
    return this.http.get(this.apiurl + '/' + id);
  }

  getAll() {
    return this.http.get(this.apiurl);
  }

  updateUser(id: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + id, inputdata);
  }

  getUserRole() {
    return this.http.get('http://localhost:3000/role');
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('username') != null;
    }
    return false;
  }

  login(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem('userData', JSON.stringify(user));
      this.currentUser = user;
    }
  }

  getRole() {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('role') != null ? sessionStorage.getItem('role')?.toString() : '';
    }
    return false;
  }

  getAllCustomer() {
    return this.http.get('http://localhost:3000/customer');
  }

  getAccessByRole(role: any, menu: any) {
    return this.http.get('http://localhost:3000/roleaccess?role=' + role + '&menu=' + menu)
  }

  deleteAccount(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  logOut() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = null;
      sessionStorage.removeItem('userData');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('role');
    }
  }
}
