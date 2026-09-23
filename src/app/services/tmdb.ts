import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { GenreListResponse } from '../models/genre.model';
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

  // Lista di tutti i generi dei film (id + nome), per riempire il <select>.
  getMovieGenres(): Promise<GenreListResponse> {
    return firstValueFrom(
      this.http.get<GenreListResponse>(`${this.apiUrl}/genre/movie/list?language=it-IT`, this.options),
    );
  }

  // Film di un certo genere, ordinati per popolarità.
  getMoviesByGenre(genreId: number): Promise<MovieListResponse> {
    return firstValueFrom(
      this.http.get<MovieListResponse>(
        `${this.apiUrl}/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&language=it-IT`,
        this.options,
      ),
    );
  }
}
