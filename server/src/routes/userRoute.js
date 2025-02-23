const express = require("express");
const router = express.Router();

const { Register } = require("../controllers/UserController");

router.post("/register",Register);

module.exports= router