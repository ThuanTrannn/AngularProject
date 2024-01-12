import { Injectable } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  constructor() {}

  animateContainer() {
    gsap.fromTo('.container', { opacity: 0 }, { opacity: 1, stagger: 0.1, duration: 1.5 });
  }
}
