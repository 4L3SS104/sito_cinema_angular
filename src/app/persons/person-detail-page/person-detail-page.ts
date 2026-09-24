import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FilmographyItem, Person, PersonCredit } from '../../models/person.model';
import { Tmdb } from '../../services/tmdb';

// Scheda di una persona: biografia, dati anagrafici e filmografia
// (film e serie a cui ha partecipato, come attore e dietro le quinte).
@Component({
  imports: [RouterLink, DatePipe],
  selector: 'app-person-detail-page',
  styleUrl: './person-detail-page.css',
  templateUrl: './person-detail-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonDetailPage {
  private readonly tmdb = inject(Tmdb);
  // ActivatedRoute: stesso schema di MovieDetailPage per leggere l'id dall'URL.
  private readonly route = inject(ActivatedRoute);

  protected readonly imageUrl = environment.tmdbImageUrl;

  protected readonly loading = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly person = signal<Person | null>(null);
  protected readonly actingCredits = signal<FilmographyItem[]>([]);
  protected readonly crewCredits = signal<FilmographyItem[]>([]);

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPerson(id);
  }

  async loadPerson(id: number): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      // Due chiamate, una dopo l'altra: prima la scheda, poi la filmografia.
      const person = await this.tmdb.getPerson(id);
      const credits = await this.tmdb.getPersonCredits(id);
      this.person.set(person);
      this.actingCredits.set(this.toFilmography(credits.cast, false));
      this.crewCredits.set(this.toFilmography(credits.crew, true));
    } catch {
      this.error.set('Impossibile caricare la scheda della persona. Riprova più tardi.');
    } finally {
      this.loading.set(false);
    }
  }

  // Trasforma i lavori di TMDB (film e serie hanno campi diversi) in righe
  // tutte uguali, ordinate dalla più recente alla più vecchia.
  // useJob = true per la crew (ruolo = job), false per il cast (ruolo = character).
  private toFilmography(credits: PersonCredit[], useJob: boolean): FilmographyItem[] {
    // NUOVO rispetto alla lezione: l'operatore ?? ("nullish coalescing").
    // a ?? b vale a, ma se a manca (undefined o null) vale b.
    const items = credits.map((credit) => ({
      creditId: credit.credit_id,
      id: credit.id,
      mediaType: credit.media_type,
      title: credit.media_type === 'movie' ? (credit.title ?? '') : (credit.name ?? ''),
      date:
        credit.media_type === 'movie'
          ? (credit.release_date ?? '')
          : (credit.first_air_date ?? ''),
      role: (useJob ? credit.job : credit.character) ?? '',
    }));

    // NUOVO rispetto alla lezione: sort() ordina un array.
    // sort() modifica l'array su cui lavora, ma "items" è un array NUOVO
    // appena creato da map(), quindi i dati originali restano intatti.
    // Le date sono testi "AAAA-MM-GG": confrontarle come testo con
    // localeCompare le ordina correttamente; b prima di a = dal più recente.
    // Le righe senza data (testo vuoto) finiscono in fondo.
    return items.sort((a, b) => b.date.localeCompare(a.date));
  }
}
