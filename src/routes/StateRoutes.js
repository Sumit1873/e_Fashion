const routes = require("express").Router()
const stateController= require("../controllers/StateController")
routes.get("/allstates",stateController.getAllState)
routes.post("/add",stateController.addState)

module.exports = routes