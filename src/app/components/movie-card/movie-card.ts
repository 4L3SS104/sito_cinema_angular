import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Movie } from '../../models/movie.model';

// Componente di presentazione: riceve un film dal genitore e lo mostra.
// Non sa da dove arrivano i dati (popolari, per genere...).
@Component({
  imports: [RouterLink, DatePipe, DecimalPipe],
  selector: 'app-movie-card',
  styleUrl: './movie-card.css',
  templateUrl: './movie-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCard {
  readonly movie = input.required<Movie>();

  // Indirizzo base delle immagini TMDB: nel template aggiungiamo misura e percorso.
  protected readonly imageUrl = environment.tmdbImageUrl;
}
