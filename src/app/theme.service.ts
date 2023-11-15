// theme.service.ts
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public isDarkTheme: boolean = false;
  public themeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  private themedElements: HTMLElement[] = [];

  addThemedElement(element: HTMLElement) {
    this.themedElements.push(element);
    this.applyTheme(element);
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeChanged.emit(this.isDarkTheme);
    this.themedElements.forEach((element) => this.applyTheme(element));
  }

  private applyTheme(element: HTMLElement) {
    if (this.isDarkTheme) {
      element.classList.add('dark-theme');
    } else {
      element.classList.remove('dark-theme');
    }
  }
}

// private isDarkMode: boolean = false;

// getIsDarkMode(): boolean {
//   return this.isDarkMode;
// }

// toggleDarkMode(): void {
//   this.isDarkMode = !this.isDarkMode;
//   this.updateTheme();
// }

// private updateTheme(): void {
//   document.body.classList.toggle('dark-theme', this.isDarkMode);
// }
