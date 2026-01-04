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
- bcryptjs (pentru hash-uire parole)

### Frontend
- React
- Vite
- CSS (custom styling)
- Fetch API

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
│   │   └── db.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Toast.jsx
│   │   │   └── SkeletonList.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── auth.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── .gitignore
└── README.md
```

## Funcționalități Principale

- Înregistrare utilizator cu validare
- Autentificare utilizator securizată (JWT)
- Creare task-uri cu deadline opțional
- Editare task-uri existente
- Ștergere task-uri
- Marcare task-uri ca finalizate (status: done)
- Separarea automată a task-urilor active de cele finalizate
- Salvarea datei de finalizare a task-urilor (completedAt)
- Validarea termenului limită (nu pot fi create task-uri cu data din trecut)
- Evidențierea vizuală a task-urilor întârziate (overdue)
- Sortare inteligentă: task-uri overdue apar primele, apoi după deadline
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
JWT_SECRET=your_secret_key_min_32_characters
```

**Nota**: Pentru `MONGO_URI`, poți folosi MongoDB Atlas (gratuit) sau o instanță MongoDB locală.

Pornește serverul backend:

```bash
npm run dev
```

Serverul va rula pe `http://localhost:5001` și ar trebui să vezi mesajul:
```
MongoDB conectat ✔️
Server pornit pe portul 5001
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
- **Backend API**: [http://localhost:5001](http://localhost:5001)

## Structura Bazei de Date

### User Model
- `name`: String (obligatoriu, trimmed)
- `email`: String (unic, obligatoriu, lowercase)
- `password`: String (hash-uit cu bcrypt, obligatoriu)
- `createdAt`: Date (auto-generat)
- `updatedAt`: Date (auto-generat)

### Task Model
- `owner`: ObjectId (referință către User, obligatoriu)
- `title`: String (obligatoriu, trimmed)
- `description`: String (opțional, default: "")
- `status`: String (enum: ["todo", "inprogress", "done"], default: "todo")
- `dueDate`: Date (opțional, nullable)
- `completedAt`: Date (opțional, nullable - se setează automat când status devine "done")
- `createdAt`: Date (auto-generat)
- `updatedAt`: Date (auto-generat)

## API Endpoints

### Autentificare
- `POST /api/auth/register` - Înregistrare utilizator nou
- `POST /api/auth/login` - Autentificare utilizator

### Task-uri (necesită autentificare JWT)
- `GET /api/tasks` - Obține toate task-urile utilizatorului
- `POST /api/tasks` - Creează task nou
- `PUT /api/tasks/:id` - Actualizează task existent
- `DELETE /api/tasks/:id` - Șterge task

## Securitate și Considerente Etice

### Măsuri de Securitate Implementate

**Autentificare și Autorizare:**
- Hash-uire parole cu bcrypt (10 salt rounds)
- Autentificare bazată pe JWT cu expirare 7 zile
- Middleware de protecție pentru rute sensibile
- Verificare ownership: utilizatorii pot accesa doar propriile task-uri

**Validări:**
- Validări server-side pentru toate input-urile
- Validări client-side pentru feedback instant
- Protecție împotriva datelor invalide (ex: deadline în trecut)
- Sanitizare input-uri (trim, lowercase pentru email)

**Configurare CORS:**
- Whitelist pentru origin-uri permise
- Credentials enabled pentru cookie/token handling
- Headers specificate explicit

**Protecție Date:**
- Parola nu este returnată niciodată în răspunsuri API
- Token JWT nu conține date sensibile (doar user ID)
- Environment variables pentru informații sensibile

### Aspecte Etice

**Confidențialitate:**
- Task-urile sunt private și vizibile doar proprietarului
- Nu există sharing de date între utilizatori
- Datele sunt stocate securizat în MongoDB

**Transparență:**
- Utilizatorii știu exact ce date sunt colectate
- Mesaje de eroare clare fără a expune vulnerabilități
- Logout disponibil oricând

**Accesibilitate:**
- Interfață intuitivă și ușor de folosit
- Feedback vizual pentru toate acțiunile
- Validări cu mesaje descriptive

## Provocări Întâmpinate și Lecții Învățate

Pe parcursul dezvoltării acestui proiect, am învățat:

- **Implementarea unui sistem complet de autentificare cu JWT** - gestionarea token-urilor, refresh logic, middleware de protecție
- **Gestionarea state-ului în React** - folosirea hook-urilor (useState, useEffect, useMemo) pentru performance și organizare
- **Validări dual-layer** - importanța validării atât pe frontend cât și pe backend pentru securitate și UX
- **Structurarea unei aplicații full-stack moderne** - separarea responsabilităților, arhitectura REST API
- **Securizarea aplicațiilor web** - hash-uire parole, protecție rute, input sanitization
- **Sortare și filtrare complexă** - logică pentru prioritizarea task-urilor overdue și sortare multiplă
- **Error handling robust** - gestionarea erorilor pe ambele părți și comunicarea clară către utilizator

## Testare

### Scenarii de Test Validate

✅ Utilizator poate crea cont nou cu credențiale valide  
✅ Sistemul previne înregistrarea cu email duplicat  
✅ Utilizator se poate autentifica cu credențiale corecte  
✅ Autentificarea eșuează cu credențiale incorecte  
✅ Utilizator poate crea task cu deadline valid  
✅ Sistemul previne crearea task-urilor cu deadline în trecut  
✅ Utilizator poate marca task ca finalizat (completedAt se setează automat)  
✅ Utilizator poate reveni task finalizat la status "todo"  
✅ Utilizator poate șterge task-uri  
✅ Task-urile overdue apar primele în listă  
✅ Task-urile sunt sortate corect după deadline și dată creare  
✅ Doar proprietarul poate accesa/modifica propriile task-uri  
✅ Token JWT expirat redirectează la pagina de login  

## Deploy

### Environment Variables

**Backend (.env):**
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key_minimum_32_characters
NODE_ENV=production
```

**Frontend:**
Pentru deployment, actualizează `API_URL` în `src/services/api.js` cu URL-ul backend-ului tău de producție.

Opțiuni de Deployment
Backend: Render, Railway, Fly.io
Frontend: Vercel, Netlify, GitHub Pages
Database: MongoDB Atlas (free tier 512MB)

### Build Commands

```bash
# Backend
npm install
npm start

# Frontend
npm install
npm run build
npm run preview  # test local al build-ului
```

## Funcționalități Viitoare Posibile

- Categorii/tag-uri pentru task-uri
- Filtrare și căutare avansată
- Notificări email pentru deadline-uri apropiate
- Calendar view pentru vizualizare task-uri
- Statistici și dashboard (tasks completed, productivitate)
- Dark/Light mode toggle
- Export task-uri (CSV, PDF)
- Task-uri recurente
- Colaborare și sharing între utilizatori

