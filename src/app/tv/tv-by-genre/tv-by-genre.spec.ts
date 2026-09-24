import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { TvByGenre } from './tv-by-genre';

describe('TvByGenre', () => {
  let component: TvByGenre;
  let fixture: ComponentFixture<TvByGenre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvByGenre],
      // Nel test le chiamate HTTP sono finte: nessuna richiesta reale a TMDB.
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TvByGenre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
