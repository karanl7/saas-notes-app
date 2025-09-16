const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const notesRoutes = require("./routes/notes");
const tenantsRoutes = require("./routes/tenants");

app.use("/api", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/tenants", tenantsRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
