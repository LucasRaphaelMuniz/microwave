const { Router } = require("express")

const ProgramsControllers = require("../controllers/ProgramsControllers")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const programsRoutes = Router()

const programsControllers = new ProgramsControllers();
programsRoutes.use(ensureAuthenticated)

programsRoutes.post("/", programsControllers.create);
programsRoutes.get("/", programsControllers.show);

module.exports = programsRoutes;