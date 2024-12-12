import {Component, inject, input, OnInit, signal} from '@angular/core';
import {SecretMessageApiService} from "../../services/secret-message-api.service";
import {map, tap} from "rxjs";
import {SkeletonComponent} from "../../components/skeleton/skeleton.component";

@Component({
  selector: 'app-secret-message-display-page',
  imports: [
    SkeletonComponent,
  ],
  standalone: true,
  templateUrl: './secret-message-display-page.component.html',
  styleUrl: './secret-message-display-page.component.scss'
})
export class SecretMessageDisplayPageComponent implements OnInit {
  private readonly api = inject(SecretMessageApiService);
  readonly displayQuote = signal<string | undefined>(undefined);
  readonly loading = signal(true);

  ngOnInit() {
    this.api.getRandomQuote()
      .pipe(
        map(quote => quote.quote),
        tap(quote => {
          this.displayQuote.set(quote);
          this.loading.set(false);
        }),
      )
      .subscribe()
  }
}
