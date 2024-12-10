import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
    selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ab-website';
}
