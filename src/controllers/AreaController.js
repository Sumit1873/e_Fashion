const areaModel = require('../models/AreaModel');

const addArea = async (req, res) => {
    try {
        const savedArea = await areaModel.create(req.body);
        res.status(201).json({
            message: "Area created successfully",
            data: savedArea,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error",
            data: err.message,
        });
    }
}

const getAllAreas = async (req, res) => {
    const allArea = await areaModel.find().populate("cityId stateId");
    res.status(200).send({
        message: "all Area",
        data: allArea
    })
}

const getAreaByCityId = async (req, res) => {
    
    try{
        const area = await areaModel.find({cityId:req.params.cityId});
        res.status(200).send({
            message: "All Areas",
            data: area
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
    addArea,
    getAllAreas,
    getAreaByCityId
}