# StudyFlow – Aplicație Full-Stack pentru Gestionarea Activităților de Studiu

## Descriere Generală

StudyFlow este o aplicație web full-stack dezvoltată în scop educațional, având ca obiectiv demonstrarea utilizării unei arhitecturi moderne client-server, precum și aplicarea conceptelor fundamentale din dezvoltarea aplicațiilor web. Aplicația permite utilizatorilor să își creeze un cont, să se autentifice și să gestioneze task-uri de studiu într-un mod structurat și eficient.

## Tehnologii Utilizate

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

### Frontend
- React
- Vite
- CSS
- Axios

## Arhitectura Aplicației

Aplicația urmează o arhitectură de tip client-server. Frontend-ul este responsabil de interfața utilizator și comunică cu backend-ul prin cereri HTTP (REST API).

Backend-ul gestionează:
- Logica aplicației
- Autentificarea utilizatorilor
- Persistența datelor în baza de date MongoDB

Accesul la rutele protejate este realizat prin utilizarea token-urilor JWT.

## Structura Proiectului

```
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

## Funcționalități Principale

- Înregistrare utilizator
- Autentificare utilizator
- Creare task-uri
- Editare task-uri
- Ștergere task-uri
- Marcare task-uri ca finalizate
- Separarea task-urilor active de cele finalizate
- Salvarea datei de finalizare a task-urilor
- Validarea termenului limită (nu pot fi create task-uri cu data din trecut)
- Protejarea rutelor prin autentificare JWT

## Cerințe Preliminare

Înainte de a rula aplicația, asigură-te că ai instalat:
- Node.js (versiunea 14 sau mai nouă)
- npm sau yarn
- MongoDB (local sau cont MongoDB Atlas)
- Git

## Instalare și Rulare Locală

### 1. Clonarea repository-ului

```bash
git clone https://github.com/bolocaserban/studyflow.git
cd studyflow
```

### 2. Configurare Backend

```bash
cd backend
npm install
```

Creează un fișier `.env` în directorul `backend/` cu următoarele variabile:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Pornește serverul backend:

```bash
npm run dev
```

### 3. Configurare Frontend

Deschide un nou terminal și navighează către directorul frontend:

```bash
cd frontend
npm install
```

Pornește aplicația frontend:

```bash
npm run dev
```

## Acces Aplicație

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

## Structura Bazei de Date

### User Model
- `username`: String (unic, obligatoriu)
- `email`: String (unic, obligatoriu)
- `password`: String (hash-uit, obligatoriu)

### Task Model
- `title`: String (obligatoriu)
- `description`: String
- `dueDate`: Date (obligatoriu)
- `completed`: Boolean (default: false)
- `completedAt`: Date
- `userId`: ObjectId (referință către User)


