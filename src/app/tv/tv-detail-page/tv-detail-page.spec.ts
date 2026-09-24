import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { TvDetailPage } from './tv-detail-page';

describe('TvDetailPage', () => {
  let component: TvDetailPage;
  let fixture: ComponentFixture<TvDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvDetailPage],
      // Nel test le chiamate HTTP sono finte: nessuna richiesta reale a TMDB.
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TvDetailPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
