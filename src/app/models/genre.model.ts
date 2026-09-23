// Interfacce per i generi (usate sia per i film sia per le serie TV).

// Un genere: id numerico (da passare a with_genres) e nome da mostrare.
export interface Genre {
  id: number;
  name: string;
}

// Risposta di TMDB per la lista dei generi: i generi stanno dentro "genres".
export interface GenreListResponse {
  genres: Genre[];
}
