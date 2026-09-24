// Interfacce per la ricerca unica (/search/multi).

// Un risultato può essere un film, una serie o una persona (media_type).
// Ogni tipo ha campi diversi, quindi quasi tutti sono opzionali ("?").
export interface SearchResult {
  id: number;
  media_type: 'movie' | 'tv' | 'person';
  title?: string; // film
  name?: string; // serie e persone
  overview?: string;
  poster_path?: string | null; // film e serie
  profile_path?: string | null; // persone
  release_date?: string; // film
  first_air_date?: string; // serie
  vote_average?: number;
  known_for_department?: string; // persone
}

// Risposta di TMDB per la ricerca: i risultati stanno dentro "results".
export interface SearchResponse {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}

// Persona trovata dalla ricerca, già pronta per PersonCard.
export interface PersonResult {
  id: number;
  name: string;
  department: string;
  profile_path: string | null;
}
