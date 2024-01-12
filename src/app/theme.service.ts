import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  darkTheme$ = new BehaviorSubject<boolean>(false);

  toggleTheme() {
    this.darkTheme$.next(!this.darkTheme$.value);
  }
}
