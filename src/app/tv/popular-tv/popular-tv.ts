import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TvCard } from '../../components/tv-card/tv-card';
import { TvShow } from '../../models/tv.model';
import { Tmdb } from '../../services/tmdb';

// Vista "Serie popolari": possiede lo stato (caricamento, errore, serie)
// e passa ogni serie al componente di presentazione TvCard.
@Component({
  imports: [TvCard, RouterLink, RouterLinkActive],
  selector: 'app-popular-tv',
  styleUrl: './popular-tv.css',
  templateUrl: './popular-tv.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopularTv {
  private readonly tmdb = inject(Tmdb);

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly shows = signal<TvShow[]>([]);

  // Come in PopularMovies: il costruttore fa solo partire il caricamento.
  constructor() {
    this.loadShows();
  }

  async loadShows(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const response = await this.tmdb.getPopularTvShows();
      this.shows.set(response.results);
    } catch {
      this.error.set('Impossibile caricare le serie popolari. Riprova più tardi.');
    } finally {
      this.loading.set(false);
    }
  }
}
