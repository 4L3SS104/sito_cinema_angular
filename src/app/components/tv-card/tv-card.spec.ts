import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TvCard } from './tv-card';

describe('TvCard', () => {
  let component: TvCard;
  let fixture: ComponentFixture<TvCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TvCard);
    component = fixture.componentInstance;
    // Il componente ha un input obbligatorio: nel test gli passiamo una serie finta.
    fixture.componentRef.setInput('show', {
      id: 1,
      name: 'Serie di prova',
      overview: '',
      poster_path: null,
      first_air_date: '2024-01-01',
      vote_average: 8,
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
