import { Component, OnInit } from '@angular/core';
import gsap from 'gsap';
import { ThemeService } from '../../../theme.service';
import { AnimationService } from '../../../animation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private themeService: ThemeService, private animationService: AnimationService) { }

  ngOnInit(): void {
    this.animationService.animateContainer();
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
}
