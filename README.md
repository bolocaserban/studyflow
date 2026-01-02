STUDYFLOW – APLICATIE FULL-STACK PENTRU GESTIONAREA ACTIVITATILOR DE STUDIU


1. DESCRIERE GENERALA

StudyFlow este o aplicatie web full-stack dezvoltata in scop educational, avand ca obiectiv
demonstrerea utilizarii unei arhitecturi moderne client–server, precum si aplicarea
conceptelor fundamentale din dezvoltarea aplicatiilor web.
Aplicatia permite utilizatorilor sa isi creeze un cont, sa se autentifice si sa gestioneze
task-uri de studiu intr-un mod structurat si eficient.


2. TEHNOLOGII UTILIZATE

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

Frontend:
- React
- Vite
- CSS
- Axios


3. ARHITECTURA APLICATIEI

Aplicatia urmeaza o arhitectura de tip client–server.
Frontend-ul este responsabil de interfata utilizator si comunica cu backend-ul prin cereri
HTTP (REST API).

Backend-ul gestioneaza:
- logica aplicatiei
- autentificarea utilizatorilor
- persistenta datelor in baza de date MongoDB

Accesul la rutele protejate este realizat prin utilizarea token-urilor JWT.


4. STRUCTURA PROIECTULUI

```text
studyflow/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── .gitignore
└── README.md
```


5. FUNCTIONALITATI PRINCIPALE

- Inregistrare utilizator
- Autentificare utilizator
- Creare task-uri
- Editare task-uri
- Stergere task-uri
- Marcare task-uri ca finalizate
- Separarea task-urilor active de cele finalizate
- Salvarea datei de finalizare a task-urilor
- Validarea termenului limita (nu pot fi create task-uri cu data din trecut)
- Protejarea rutelor prin autentificare JWT


6. INSTALARE SI RULARE LOCALA

1. Clonarea repository-ului:
   git clone https://github.com/bolocaserban/studyflow.git
   cd studyflow

2. Configurare Backend:
   cd backend
   npm install
   npm run dev

   Se va crea un fisier .env cu urmatoarele variabile:
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key

3. Configurare Frontend:
   cd frontend
   npm install
   npm run dev


7. ACCES APLICATIE

Frontend:
http://localhost:5173
Backend:
http://localhost:5000
