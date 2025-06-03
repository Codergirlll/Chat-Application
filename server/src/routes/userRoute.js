const express = require("express");
const router = express.Router();

const { Register, Login } = require("../controllers/userController");
const { Avtar } = require("../controllers/userAvtar");

router.post("/register", Register);
router.post("/login", Login);
router.get("/avtar/:id", Avtar);

module.exports = router;
