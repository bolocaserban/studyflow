const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // trebuie înainte de a citi env

const connectDB = require("./config/db");

const app = express();

// 1) CORS trebuie setat înainte de rute
const allowedOrigins = [
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://localhost:5173",
  "http://localhost:5174",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // permite și request-uri fără origin (ex: curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// IMPORTANT: răspunde la preflight
app.options("*", cors());

app.use(express.json());

// 2) Conectare DB (după dotenv, înainte să folosești rutele)
connectDB();

// ruta test
app.get("/", (req, res) => {
  res.send("StudyFlow API funcționează ✅");
});

// rutele aplicației
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// 3) handler simplu de erori (util pt CORS / crash)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server pornit pe portul ${PORT}`));
