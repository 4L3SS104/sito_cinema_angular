// Interfacce per cast e crew (usate sia per i film sia per le serie TV).
// credit_id è unico per ogni riga: una persona può comparire più volte
// (es. regista e sceneggiatore), quindi nel @for usiamo track credit_id.

// Un attore del cast, con il personaggio che interpreta.
export interface CastMember {
  id: number;
  credit_id: string;
  name: string;
  character: string;
  profile_path: string | null;
}

// Un membro della troupe, con il suo ruolo (es. job: "Director").
export interface CrewMember {
  id: number;
  credit_id: string;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

// Blocco "credits" che TMDB aggiunge con append_to_response=credits.
export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}
