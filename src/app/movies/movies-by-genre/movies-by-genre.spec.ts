import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MoviesByGenre } from './movies-by-genre';

describe('MoviesByGenre', () => {
  let component: MoviesByGenre;
  let fixture: ComponentFixture<MoviesByGenre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesByGenre],
      // Nel test le chiamate HTTP sono finte: nessuna richiesta reale a TMDB.
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesByGenre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
