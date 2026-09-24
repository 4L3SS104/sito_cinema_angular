import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { TvShow } from '../../models/tv.model';

// Componente di presentazione: riceve una serie TV dal genitore e la mostra.
// È come MovieCard, ma usa i campi delle serie (name, first_air_date).
@Component({
  imports: [RouterLink, DatePipe, DecimalPipe],
  selector: 'app-tv-card',
  styleUrl: './tv-card.css',
  templateUrl: './tv-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvCard {
  readonly show = input.required<TvShow>();

  protected readonly imageUrl = environment.tmdbImageUrl;
}
