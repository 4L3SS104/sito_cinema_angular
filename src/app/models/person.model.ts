// Interfacce per le persone (attori, registi, ecc.) restituite da TMDB.

// Scheda di una persona: dati anagrafici e biografia.
// Le date e il luogo possono mancare, quindi sono "string | null".
export interface Person {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  known_for_department: string;
  profile_path: string | null;
}

// Un lavoro della filmografia: può essere un film o una serie (media_type).
// I campi con "?" sono opzionali: i film hanno title e release_date,
// le serie hanno name e first_air_date; il cast ha character, la crew ha job.
export interface PersonCredit {
  id: number;
  credit_id: string;
  media_type: 'movie' | 'tv';
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  character?: string;
  job?: string;
}

// Risposta di /person/{id}/combined_credits: lavori come attore e come troupe.
export interface PersonCreditsResponse {
  cast: PersonCredit[];
  crew: PersonCredit[];
}

// Riga della filmografia già pronta da mostrare nel template:
// un'unica forma semplice per film e serie.
export interface FilmographyItem {
  creditId: string;
  id: number;
  mediaType: 'movie' | 'tv';
  title: string;
  date: string;
  role: string;
}
