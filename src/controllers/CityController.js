const cityModel = require('../models/CityModel');

const addCity = async (req, res) => {
    try {
        const savedCity = await cityModel.create(req.body);
        res.status(201).json({
            message: "City created successfully",
            data: savedCity,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error",
            data: err.message,
        });
    }
}

const getAllCities = async (req, res) => {
    const allCity = await cityModel.find().populate("stateId");
    res.status(200).send({
        message: "all City",
        data: allCity
    })
}

const getCityByStateId = async (req, res) => {
    
    try{
        const city = await cityModel.find({stateId:req.params.stateId});
        res.status(200).send({
            message: "All Cities",
            data: city
        }) ; 

    }catch(err){
        console.error(err);
        res.status(500).json({
            message: "Error",
            data: err.message,
        });
    }
}

module.exports = {
    addCity,
    getAllCities,
    getCityByStateId
}
