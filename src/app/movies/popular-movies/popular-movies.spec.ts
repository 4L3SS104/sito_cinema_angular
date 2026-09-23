import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PopularMovies } from './popular-movies';

describe('PopularMovies', () => {
  let component: PopularMovies;
  let fixture: ComponentFixture<PopularMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularMovies],
      // Nel test le chiamate HTTP sono finte: nessuna richiesta reale a TMDB.
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(PopularMovies);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
