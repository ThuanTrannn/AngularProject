import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ThemeService } from '../../../theme.service';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isActive: boolean = false;
  constructor(
  @Inject(PLATFORM_ID) private platformId: Object, 
  private themeService: ThemeService,
  private authService: AuthService,
  private router: Router) { }
  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    const isDarkTheme = this.themeService.darkTheme$.value;
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }

  viewOrder() {
    if (isPlatformBrowser(this.platformId)) {
      const userId = sessionStorage.getItem('username');
      if (userId) {
        this.router.navigate(['/order-details'], { queryParams: { userId: userId } });
        this.isActive = true;
      } else {
        console.error('userId not found in sessionStorage');
      }
    } else {
      return;
    }
  }
}
