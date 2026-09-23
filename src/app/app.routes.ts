import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MoviesByGenre } from './movies/movies-by-genre/movies-by-genre';
import { PopularMovies } from './movies/popular-movies/popular-movies';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'film', component: PopularMovies },
  { path: 'film/genere', component: MoviesByGenre },
];
