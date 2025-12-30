STUDYFLOW
APLICAȚIE FULL-STACK PENTRU GESTIONAREA ACTIVITĂȚILOR DE STUDIU

DESCRIERE GENERALĂ

StudyFlow este o aplicație web full-stack dezvoltată pentru gestionarea activităților de studiu.
Aplicația permite utilizatorilor să își creeze un cont, să se autentifice și să își administreze task-urile personale într-un mod structurat.

Proiectul a fost realizat în scop educațional și are ca obiectiv demonstrarea utilizării unei arhitecturi moderne client-server, precum și a conceptelor fundamentale din dezvoltarea aplicațiilor web.

TEHNOLOGII UTILIZATE

    Backend

Node.js
Express.js
MongoDB
Mongoose
JSON Web Tokens (JWT)

    Frontend

React
Vite
CSS
Axios

ARHITECTURA APLICAȚIEI

Aplicația urmează o arhitectură client-server:
Frontend-ul este responsabil de interfața utilizator și comunică cu backend-ul prin cereri HTTP (REST API).
Backend-ul gestionează logica aplicației, autentificarea utilizatorilor și persistența datelor în baza de date MongoDB.

Accesul la rutele protejate este realizat prin utilizarea token-urilor JWT.

STRUCTURA PROIECTULUI

studyflow
|
|-- backend
| |-- config
| |-- middleware
| |-- models
| |-- routes
| |-- server.js
| |-- package.json
|
|-- frontend
| |-- public
| |-- src
| | |-- components
| | |-- pages
| | |-- services
| | |-- App.jsx
| | |-- main.jsx
| |-- package.json
|
|-- .gitignore
|-- README.md

FUNCȚIONALITĂȚI PRINCIPALE

Înregistrare utilizator
Autentificare utilizator
Creare task-uri
Editare task-uri
Ștergere task-uri
Marcare task-uri ca finalizate
Separarea task-urilor active de cele finalizate
Salvarea datei de finalizare a task-urilor
Validarea termenului limită (nu pot fi create task-uri cu dată din trecut)
Protejarea rutelor prin autentificare JWT

INSTALARE ȘI RULARE LOCALĂ

    Clonarea proiectului

git clone https://github.com/bolocaserban/studyflow.git
cd studyflow

    Configurare Backend

cd backend
npm install
npm run dev

Se creează un fișier .env în directorul backend cu următoarele variabile:

PORT=5000
MONGO_URI=string_de_conectare_mongodb
JWT_SECRET=cheie_secreta

    Configurare Frontend

cd frontend
npm install
npm run dev

ACCES APLICAȚIE

Frontend: http://localhost:5173
Backend: http://localhost:5000

SECURITATE ȘI CONFIGURARE

Fișierele sensibile (ex: .env) și directoarele generate automat (node_modules) sunt excluse din repository prin fișierul .gitignore.