import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MovieCard } from '../../components/movie-card/movie-card';
import { Genre } from '../../models/genre.model';
import { Movie } from '../../models/movie.model';
import { Tmdb } from '../../services/tmdb';

// Vista "Film per genere": l'utente sceglie un genere dal <select>
// e vede i film di quel genere. Lo stato resta tutto qui.
@Component({
  imports: [MovieCard, RouterLink, RouterLinkActive],
  selector: 'app-movies-by-genre',
  styleUrl: './movies-by-genre.css',
  templateUrl: './movies-by-genre.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesByGenre {
  private readonly tmdb = inject(Tmdb);

  protected readonly genres = signal<Genre[]>([]);
  protected readonly selectedGenreId = signal<number | null>(null);

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly movies = signal<Movie[]>([]);

  // Come in PopularMovies: il costruttore fa solo partire il primo caricamento.
  constructor() {
    this.loadGenres();
  }

  async loadGenres(): Promise<void> {
    try {
      const response = await this.tmdb.getMovieGenres();
      this.genres.set(response.genres);
    } catch {
      this.error.set('Impossibile caricare la lista dei generi. Riprova più tardi.');
    }
  }

  // NUOVO rispetto alla lezione: evento (change) di un <select>.
  // Funziona come (input): leggiamo il valore da event.target,
  // ma qui l'elemento è un HTMLSelectElement. Il valore arriva come
  // testo ("28"), quindi lo trasformiamo in numero con Number().
  onGenreChange(event: Event): void {
    const genreId = Number((event.target as HTMLSelectElement).value);
    this.selectedGenreId.set(genreId);
    this.loadMovies(genreId);
  }

  async loadMovies(genreId: number): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const response = await this.tmdb.getMoviesByGenre(genreId);
      this.movies.set(response.results);
    } catch {
      this.error.set('Impossibile caricare i film di questo genere. Riprova più tardi.');
    } finally {
      this.loading.set(false);
    }
  }
}
