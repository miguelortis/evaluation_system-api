const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

// Registro de usuarios
router.post("/register", register);

// Inicio de sesión
router.post("/login", login);

module.exports = router;
