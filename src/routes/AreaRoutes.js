const routes = require("express").Router()
const areaController= require("../controllers/AreaController")
routes.get("/allareas",areaController.getAllAreas)
routes.post("/add",areaController.addArea)
routes.get("/getAreaByCityId/:cityId",areaController.getAreaByCityId)

module.exports = routes