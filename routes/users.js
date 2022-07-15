const {Router} = require('express');

const userController = require('../controllers/userController');

const router = new Router()

// desc User Login Page
// route GET /users/login
router.get("/login", userController.userLogin);

// desc Login Handle
// route POST /users/login
router.post("/login", userController.handleLogin);

// desc User Register Page
// route GET /users/register
router.get("/register", userController.userRegister)

// desc Handle User Register
// route POST /users/register
router.post("/register", userController.createUser)


module.exports = router