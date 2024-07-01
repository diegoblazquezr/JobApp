const usersController = require('../controllers/users.controllers');
const router = require('express').Router();
const { validateCreateUser, validateUpdateUser, validateDeleteUser } = require("../validators/users.validators");

// POST http://localhost:3000/api/user
router.post("/", validateCreateUser, usersController.createUserController);
// GET http://localhost:3000/api/user
router.get("/", usersController.readUsersController);
// PUT http://localhost:3000/api/user
router.put("/", validateUpdateUser, usersController.updateUserController);
// DELETE http://localhost:3000/api/user?email=prueba2@gmail.com
router.delete("/", validateDeleteUser, usersController.deleteUserController);

// router.post("/api/login", usersController.postLogin);
// router.post("/api/logout", usersController.postLogout);

// router.get("/recoverpassword", apiController.recoverPassword);
// router.get("/restorepassword", apiController.restorePassword);

module.exports = router;