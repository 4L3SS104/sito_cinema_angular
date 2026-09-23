import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PersonCard } from './person-card';

describe('PersonCard', () => {
  let component: PersonCard;
  let fixture: ComponentFixture<PersonCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonCard);
    component = fixture.componentInstance;
    // Gli input obbligatori: nel test passiamo valori finti.
    fixture.componentRef.setInput('personId', 1);
    fixture.componentRef.setInput('name', 'Persona di prova');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
