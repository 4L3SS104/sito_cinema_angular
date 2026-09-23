import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { MovieListResponse } from '../models/movie.model';

// Service che contiene SOLO le chiamate HTTP verso TMDB.
// Ogni metodo restituisce una Promise; lo stato resta nei componenti.
@Injectable({ providedIn: 'root' })
export class Tmdb {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.tmdbApiUrl;

  // NUOVO rispetto alla lezione: header Authorization.
  // TMDB vuole il token in ogni richiesta, nella forma "Bearer <token>".
  // Lo passiamo come secondo argomento di http.get: { headers: ... }.
  private readonly options = {
    headers: { Authorization: `Bearer ${environment.tmdbToken}` },
  };

  // Film più popolari del momento (language=it-IT: titoli e trame in italiano).
  getPopularMovies(): Promise<MovieListResponse> {
    return firstValueFrom(
      this.http.get<MovieListResponse>(`${this.apiUrl}/movie/popular?language=it-IT`, this.options),
    );
  }
}
