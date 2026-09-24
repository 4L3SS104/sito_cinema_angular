import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { GenreListResponse } from '../models/genre.model';
import { MovieDetail, MovieListResponse } from '../models/movie.model';
import { Person, PersonCreditsResponse } from '../models/person.model';
import { SearchResponse } from '../models/search.model';
import { TvDetail, TvListResponse } from '../models/tv.model';

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

  // Scheda di un film. append_to_response=credits aggiunge cast e crew
  // nella stessa risposta, così basta una sola chiamata.
  getMovieDetail(id: number): Promise<MovieDetail> {
    return firstValueFrom(
      this.http.get<MovieDetail>(
        `${this.apiUrl}/movie/${id}?append_to_response=credits&language=it-IT`,
        this.options,
      ),
    );
  }

  // --- SERIE TV: stessi endpoint dei film, con "tv" al posto di "movie" ---

  // Serie TV più popolari del momento.
  getPopularTvShows(): Promise<TvListResponse> {
    return firstValueFrom(
      this.http.get<TvListResponse>(`${this.apiUrl}/tv/popular?language=it-IT`, this.options),
    );
  }

  // Lista di tutti i generi delle serie TV (diversa da quella dei film).
  getTvGenres(): Promise<GenreListResponse> {
    return firstValueFrom(
      this.http.get<GenreListResponse>(`${this.apiUrl}/genre/tv/list?language=it-IT`, this.options),
    );
  }

  // Serie TV di un certo genere, ordinate per popolarità.
  getTvShowsByGenre(genreId: number): Promise<TvListResponse> {
    return firstValueFrom(
      this.http.get<TvListResponse>(
        `${this.apiUrl}/discover/tv?with_genres=${genreId}&sort_by=popularity.desc&language=it-IT`,
        this.options,
      ),
    );
  }

  // Scheda di una serie TV con cast e crew nella stessa risposta.
  getTvDetail(id: number): Promise<TvDetail> {
    return firstValueFrom(
      this.http.get<TvDetail>(
        `${this.apiUrl}/tv/${id}?append_to_response=credits&language=it-IT`,
        this.options,
      ),
    );
  }

  // --- PERSONE ---

  // Scheda di una persona: biografia e dati anagrafici.
  getPerson(id: number): Promise<Person> {
    return firstValueFrom(
      this.http.get<Person>(`${this.apiUrl}/person/${id}?language=it-IT`, this.options),
    );
  }

  // Filmografia di una persona: film e serie, sia come attore sia come troupe.
  getPersonCredits(id: number): Promise<PersonCreditsResponse> {
    return firstValueFrom(
      this.http.get<PersonCreditsResponse>(
        `${this.apiUrl}/person/${id}/combined_credits?language=it-IT`,
        this.options,
      ),
    );
  }

  // --- RICERCA ---

  // Ricerca unica: film, serie e persone insieme.
  // NUOVO rispetto alla lezione: encodeURIComponent() trasforma il testo
  // in una forma sicura per l'URL (es. spazi e "&" non rompono l'indirizzo).
  searchMulti(query: string): Promise<SearchResponse> {
    return firstValueFrom(
      this.http.get<SearchResponse>(
        `${this.apiUrl}/search/multi?query=${encodeURIComponent(query)}&language=it-IT`,
        this.options,
      ),
    );
  }
}
