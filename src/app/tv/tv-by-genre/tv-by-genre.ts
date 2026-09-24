import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TvCard } from '../../components/tv-card/tv-card';
import { Genre } from '../../models/genre.model';
import { TvShow } from '../../models/tv.model';
import { Tmdb } from '../../services/tmdb';

// Vista "Serie per genere": l'utente sceglie un genere dal <select>
// e vede le serie di quel genere. Come MoviesByGenre, ma per le serie.
@Component({
  imports: [TvCard, RouterLink, RouterLinkActive],
  selector: 'app-tv-by-genre',
  styleUrl: './tv-by-genre.css',
  templateUrl: './tv-by-genre.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvByGenre {
  private readonly tmdb = inject(Tmdb);

  protected readonly genres = signal<Genre[]>([]);
  protected readonly selectedGenreId = signal<number | null>(null);

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly shows = signal<TvShow[]>([]);

  constructor() {
    this.loadGenres();
  }

  async loadGenres(): Promise<void> {
    try {
      const response = await this.tmdb.getTvGenres();
      this.genres.set(response.genres);
    } catch {
      this.error.set('Impossibile caricare la lista dei generi. Riprova più tardi.');
    }
  }

  // (change) del <select>: stesso schema spiegato in MoviesByGenre.
  onGenreChange(event: Event): void {
    const genreId = Number((event.target as HTMLSelectElement).value);
    this.selectedGenreId.set(genreId);
    this.loadShows(genreId);
  }

  async loadShows(genreId: number): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const response = await this.tmdb.getTvShowsByGenre(genreId);
      this.shows.set(response.results);
    } catch {
      this.error.set('Impossibile caricare le serie di questo genere. Riprova più tardi.');
    } finally {
      this.loading.set(false);
    }
  }
}
