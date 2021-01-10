const bodyParser = require("body-parser");
const express = require("express");
const { AuthController } = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.use(bodyParser.json({ type: "*/json" }));
authRouter.use(AuthController.signIn);

exports.authRouter = authRouter;
