const express = require("express");

const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

// Obtener todos los usuarios
router.get("/", auth(["admin", "manager"]), getAllUsers);

// Obtener un usuario por ID
router.get("/:id", auth(["admin", "manager", "employee"]), getUserById);

// Crear un nuevo usuario
router.post("/", auth(["admin", "manager"]), createUser);

// Actualizar un usuario por ID
router.put("/:id", auth(["admin", "manager"]), updateUser);

// Eliminar un usuario por ID
router.delete("/:id", auth(["admin"]), deleteUser);

// Export the router
module.exports = router;
