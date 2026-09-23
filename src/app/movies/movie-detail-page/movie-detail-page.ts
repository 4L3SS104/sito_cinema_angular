import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PersonCard } from '../../components/person-card/person-card';
import { CastMember, CrewMember } from '../../models/credits.model';
import { MovieDetail } from '../../models/movie.model';
import { Tmdb } from '../../services/tmdb';

// Scheda di dettaglio di un film: titolo, trama, immagini, regia e cast.
@Component({
  imports: [PersonCard, DatePipe, DecimalPipe],
  selector: 'app-movie-detail-page',
  styleUrl: './movie-detail-page.css',
  templateUrl: './movie-detail-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailPage {
  private readonly tmdb = inject(Tmdb);
  // NUOVO rispetto alla lezione: ActivatedRoute descrive la rotta attuale.
  // Da lui leggiamo i parametri dell'URL, come l'id in /film/:id.
  private readonly route = inject(ActivatedRoute);

  protected readonly imageUrl = environment.tmdbImageUrl;

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly movie = signal<MovieDetail | null>(null);
  protected readonly directors = signal<CrewMember[]>([]);
  protected readonly cast = signal<CastMember[]>([]);

  constructor() {
    // snapshot.paramMap.get('id') restituisce l'id dell'URL come testo
    // (es. "550"): Number() lo trasforma in numero.
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMovie(id);
  }

  async loadMovie(id: number): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const response = await this.tmdb.getMovieDetail(id);
      this.movie.set(response);
      // filter e slice creano array NUOVI (non modificano quello originale):
      // solo i registi, e solo i primi 12 attori del cast.
      this.directors.set(response.credits.crew.filter((person) => person.job === 'Director'));
      this.cast.set(response.credits.cast.slice(0, 12));
    } catch {
      this.error.set('Impossibile caricare la scheda del film. Riprova più tardi.');
    } finally {
      this.loading.set(false);
    }
  }
}
