import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PersonCard } from '../../components/person-card/person-card';
import { CastMember } from '../../models/credits.model';
import { TvDetail } from '../../models/tv.model';
import { Tmdb } from '../../services/tmdb';

// Scheda di dettaglio di una serie TV: titolo, trama, immagini, ideatori e cast.
@Component({
  imports: [PersonCard, DatePipe, DecimalPipe],
  selector: 'app-tv-detail-page',
  styleUrl: './tv-detail-page.css',
  templateUrl: './tv-detail-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TvDetailPage {
  private readonly tmdb = inject(Tmdb);
  // ActivatedRoute: stesso schema di MovieDetailPage per leggere l'id dall'URL.
  private readonly route = inject(ActivatedRoute);

  protected readonly imageUrl = environment.tmdbImageUrl;

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly show = signal<TvDetail | null>(null);
  protected readonly cast = signal<CastMember[]>([]);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadShow(id);
  }

  async loadShow(id: number): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const response = await this.tmdb.getTvDetail(id);
      this.show.set(response);
      // Solo i primi 12 attori del cast (slice crea un array nuovo).
      this.cast.set(response.credits.cast.slice(0, 12));
    } catch {
      this.error.set('Impossibile caricare la scheda della serie. Riprova più tardi.');
    } finally {
      this.loading.set(false);
    }
  }
}
