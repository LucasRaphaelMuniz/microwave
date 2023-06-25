const { Router } = require("express");

const usersRoutes = require("./users.routes");
const programsRoutes = require("./programs.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/programs", programsRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;
