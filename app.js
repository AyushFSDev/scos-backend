// app.js
const express = require("express");
const cors = require("cors");
const { globalErrorHandler } = require("./src/config/errors");

const app = express();

// ─── CORS ─────────────────────────────────────────────
// React dev server (port 3000) allow karo
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://mentrixos-roles-login.netlify.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// ─── ROUTES ───────────────────────────────────────────
const userRoutes = require("./src/modules/users/user.routes");
const instituteRoutes = require("./src/modules/institutes/institute.routes");
const roleRoutes = require("./src/modules/roles/role.routes");
const mappingRoutes = require("./src/modules/mappings/mapping.routes");
const authRoutes = require("./src/modules/auth/auth.routes");
const tenantRoutes = require("./src/modules/tenants/tenant.routes");

app.use("/users", userRoutes);
app.use("/institutes", instituteRoutes);
app.use("/roles", roleRoutes);
app.use("/user-institute-roles", mappingRoutes);
app.use("/auth", authRoutes);
app.use("/tenants", tenantRoutes);

app.get("/", (req, res) => {
  res.send("SCOS Backend Running...");
});

// ─── GLOBAL ERROR HANDLER ─────────────────────────────
// Sabse last mein hona chahiye
app.use(globalErrorHandler);

module.exports = app;
