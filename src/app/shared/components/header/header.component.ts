import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'authentication';
  
  constructor(private route: Router, @Inject(PLATFORM_ID) private platformId: Object, private authService: AuthService) { }

  ngOnInit(): void { }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
