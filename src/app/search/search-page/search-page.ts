import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MovieCard } from '../../components/movie-card/movie-card';
import { PersonCard } from '../../components/person-card/person-card';
import { TvCard } from '../../components/tv-card/tv-card';
import { Movie } from '../../models/movie.model';
import { PersonResult } from '../../models/search.model';
import { TvShow } from '../../models/tv.model';
import { Tmdb } from '../../services/tmdb';

// Ricerca unica: una sola barra che trova film, serie e persone insieme.
// I risultati vengono divisi per categoria e mostrati con le card già fatte.
@Component({
  imports: [MovieCard, TvCard, PersonCard],
  selector: 'app-search-page',
  styleUrl: './search-page.css',
  templateUrl: './search-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPage {
  private readonly tmdb = inject(Tmdb);

  // Testo scritto nella barra di ricerca.
  protected readonly query = signal('');
  // Ultima ricerca fatta davvero (null = non hai ancora cercato nulla).
  protected readonly lastQuery = signal<string | null>(null);

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly movies = signal<Movie[]>([]);
  protected readonly shows = signal<TvShow[]>([]);
  protected readonly people = signal<PersonResult[]>([]);

  onQueryInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  async search(): Promise<void> {
    // trim() toglie gli spazi all'inizio e alla fine: "  " diventa "".
    const text = this.query().trim();
    if (text === '') {
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    try {
      const response = await this.tmdb.searchMulti(text);
      const results = response.results;

      // filter tiene solo un tipo di risultato; map lo trasforma nella forma
      // che la card si aspetta. (?? spiegato in PersonDetailPage)
      this.movies.set(
        results
          .filter((r) => r.media_type === 'movie')
          .map((r) => ({
            id: r.id,
            title: r.title ?? '',
            overview: r.overview ?? '',
            poster_path: r.poster_path ?? null,
            release_date: r.release_date ?? '',
            vote_average: r.vote_average ?? 0,
          })),
      );
      this.shows.set(
        results
          .filter((r) => r.media_type === 'tv')
          .map((r) => ({
            id: r.id,
            name: r.name ?? '',
            overview: r.overview ?? '',
            poster_path: r.poster_path ?? null,
            first_air_date: r.first_air_date ?? '',
            vote_average: r.vote_average ?? 0,
          })),
      );
      this.people.set(
        results
          .filter((r) => r.media_type === 'person')
          .map((r) => ({
            id: r.id,
            name: r.name ?? '',
            department: r.known_for_department ?? '',
            profile_path: r.profile_path ?? null,
          })),
      );
      this.lastQuery.set(text);
    } catch {
      this.error.set('Impossibile completare la ricerca. Riprova più tardi.');
    } finally {
      this.loading.set(false);
    }
  }
}
