import { Credits } from './credits.model';
import { Genre } from './genre.model';

// Interfacce per i dati delle serie TV restituiti da TMDB.
// Rispetto ai film cambiano alcuni nomi: "name" invece di "title",
// "first_air_date" (prima messa in onda) invece di "release_date".

// Una serie come appare negli elenchi (popolari, per genere).
export interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  vote_average: number;
}

// Risposta di TMDB per gli elenchi di serie: le serie stanno dentro "results".
export interface TvListResponse {
  page: number;
  results: TvShow[];
  total_pages: number;
  total_results: number;
}

// Un ideatore della serie (le serie hanno "created_by" al posto del regista).
export interface Creator {
  id: number;
  credit_id: string;
  name: string;
  profile_path: string | null;
}

// Scheda completa di una serie, con cast e crew (append_to_response=credits).
export interface TvDetail {
  id: number;
  name: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  vote_average: number;
  genres: Genre[];
  created_by: Creator[];
  credits: Credits;
}
