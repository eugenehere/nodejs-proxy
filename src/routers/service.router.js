const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { ServiceController } = require("../controllers/service.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

const serviceRouter = express.Router();

serviceRouter.use(morgan("dev"));
serviceRouter.use(authMiddleware);
serviceRouter.use(cookieParser());
serviceRouter.use(bodyParser.raw({ type: "*/*" }));
serviceRouter.use(ServiceController.proxy);

exports.serviceRouter = serviceRouter;
