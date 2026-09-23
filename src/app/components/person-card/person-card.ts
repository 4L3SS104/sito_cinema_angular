import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

// Componente di presentazione per una persona: foto, nome e ruolo.
// Riceve valori semplici (non un'interfaccia) così si può riusare ovunque:
// cast di film e serie (ruolo = personaggio), crew (ruolo = lavoro), ricerca.
@Component({
  imports: [RouterLink],
  selector: 'app-person-card',
  styleUrl: './person-card.css',
  templateUrl: './person-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonCard {
  readonly personId = input.required<number>();
  readonly name = input.required<string>();
  readonly role = input('');
  readonly profilePath = input<string | null>(null);

  protected readonly imageUrl = environment.tmdbImageUrl;
}
