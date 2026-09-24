import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MovieDetailPage } from './movies/movie-detail-page/movie-detail-page';
import { MoviesByGenre } from './movies/movies-by-genre/movies-by-genre';
import { PopularMovies } from './movies/popular-movies/popular-movies';
import { PopularTv } from './tv/popular-tv/popular-tv';
import { TvByGenre } from './tv/tv-by-genre/tv-by-genre';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'film', component: PopularMovies },
  { path: 'film/genere', component: MoviesByGenre },
  // NUOVO rispetto alla lezione: rotta con parametro. ":id" è un segnaposto:
  // /film/550 apre MovieDetailPage con id = "550".
  // Va DOPO 'film/genere', altrimenti "genere" verrebbe letto come un id.
  { path: 'film/:id', component: MovieDetailPage },
  { path: 'serie', component: PopularTv },
  { path: 'serie/genere', component: TvByGenre },
];
