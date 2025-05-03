const routes = require("express").Router()
const cityController= require("../controllers/CityController")
routes.get("/allcities",cityController.getAllCities)
routes.post("/add",cityController.addCity)
routes.get("/getCityByStateId/:stateId",cityController.getCityByStateId)

module.exports = routes