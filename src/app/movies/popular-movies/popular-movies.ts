import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MovieCard } from '../../components/movie-card/movie-card';
import { Movie } from '../../models/movie.model';
import { Tmdb } from '../../services/tmdb';

// Vista "Film popolari": possiede lo stato (caricamento, errore, film)
// e passa ogni film al componente di presentazione MovieCard.
@Component({
  imports: [MovieCard, RouterLink, RouterLinkActive],
  selector: 'app-popular-movies',
  styleUrl: './popular-movies.css',
  templateUrl: './popular-movies.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopularMovies {
  private readonly tmdb = inject(Tmdb);

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly movies = signal<Movie[]>([]);

  // NUOVO rispetto alla lezione: usiamo il costruttore SOLO per far partire
  // il caricamento appena il componente viene creato (niente injection qui).
  constructor() {
    this.loadMovies();
  }

  async loadMovies(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const response = await this.tmdb.getPopularMovies();
      this.movies.set(response.results);
    } catch {
      this.error.set('Impossibile caricare i film popolari. Riprova più tardi.');
    } finally {
      this.loading.set(false);
    }
  }
}
