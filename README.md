StudyFlow

StudyFlow este o aplicație full-stack pentru gestionarea activităților de studiu. Aplicația permite utilizatorilor să se înregistreze, să se autentifice și să își administreze task-urile într-un mod structurat și eficient.

Proiectul a fost realizat în scop educațional și demonstrează utilizarea unei arhitecturi client–server moderne.

Funcționalități

Înregistrare și autentificare utilizatori

Autentificare bazată pe JSON Web Tokens (JWT)

Creare, modificare și ștergere task-uri

Dashboard pentru gestionarea activităților

API REST pentru comunicarea client–server

Tehnologii utilizate
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

Structura proiectului
Proiect StudyFlow/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── .gitignore
└── README.md

Instalare și rulare locală
1. Clonarea repository-ului
git clone https://github.com/bolocaserban/studyflow.git
cd studyflow

2. Configurare Backend
cd backend
npm install
npm run dev


Creează un fișier .env în directorul backend cu următoarele variabile:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

3. Configurare Frontend
cd frontend
npm install
npm run dev


Aplicația va fi disponibilă implicit la:

Frontend: http://localhost:5173

Backend: http://localhost:5000

Autentificare și securitate

Aplicația folosește autentificare bazată pe token-uri JWT.
Rutele protejate pot fi accesate doar de utilizatorii autentificați, iar task-urile sunt asociate fiecărui utilizator.