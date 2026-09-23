import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PopularMovies } from './movies/popular-movies/popular-movies';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'film', component: PopularMovies },
];
