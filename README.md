# DT208G - Projekt 

Alexander Hilding

## Konstruktion
Projektet initierades med Angular CLI. Applikationen består av flera komponenter, tjänster och en modell för att hantera kursdata och ramschemat.

### Komponenter
- `CourseSearchComponent`: Ansvarig för att visa och söka bland kurser i tabellform. Inkluderar metoder för filtrering, sortering och paginering av kursdata, samt notifiering vid tillagd kurs i ramschemat.
- `CourseScheduleComponent`: Ansvarig för att visa och hantera det valda ramschemat. Inkluderar metoder för att lägga till / ta bort kurser och beräkna totala poäng, samt notifiering vid bortagen kurs i ramschemat.

### Modeller
- `Course`: Ett interface som representerar kursdata och används för att typsäkra data.

### Services
- `CourseDataService`: Ansvarig för att hämta kursdata från en extern JSON-fil via Angulars `HttpClient`. Använder Observables för att hantera asynkron datahämtning.
- `ScheduleService`: Ansvarig för att hantera ramschemat. Lagrar och hämtar kurser från `localStorage` och tillhandahåller metoder för att lägga till, ta bort och beräkna totala poäng.

## Funktion
Webbapplikationen syftar till att visa och hantera kurser från ett universitet. Användare kan söka bland kurser, filtrera och sortera resultaten, samt lägga till kurser till sitt ramschema. Ramschemat visar de valda kurserna och den totala mängden högskolepoäng. Data lagras i `localStorage` för att bevara användarens ramschema mellan sidladdningar.

## Angular
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.4.
