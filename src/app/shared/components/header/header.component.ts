import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../../auth/login/login.component'
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'authentication';
  isadmin = false;
  isMenuVisible = false;
  
  constructor(private route: Router, @Inject(PLATFORM_ID) private platformId: Object, private dialog: MatDialog, private authService: AuthService) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.checkRole();
    }
  }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  loginPopup() {
    this.OpenDialog('600ms', '300ms');
  }

  logout() {
    this.authService.logout();
  }

  OpenDialog(enteranimation: any, exitanimation: any) {
    const popup = this.dialog.open(LoginComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%',
    });
  }

  private checkRole(): void {
    let currentroute = this.route.url;
    let role = sessionStorage.getItem('role');

    if (currentroute == '/login' || currentroute == '/register') {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
    }

    if (role == 'admin') {
      this.isadmin = true;
    } else {
      this.isadmin = false;
    }
  }
}
