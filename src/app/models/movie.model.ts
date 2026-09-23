import { Credits } from './credits.model';
import { Genre } from './genre.model';

// Interfacce per i dati dei film restituiti da TMDB.

// Un film come appare negli elenchi (popolari, per genere).
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

// Risposta di TMDB per gli elenchi di film: i film stanno dentro "results".
export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// Scheda completa di un film, con cast e crew (append_to_response=credits).
export interface MovieDetail {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number | null;
  vote_average: number;
  genres: Genre[];
  credits: Credits;
}
