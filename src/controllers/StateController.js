const stateModel = require('../models/StateModel');

const addState = async (req, res) => {
    try {
        const savedState = await stateModel.create(req.body);
        res.status(201).json({
            message: "State created successfully",
            data: savedState,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error",
            data: err.message,
        });
    }
}

const getAllState = async (req, res) => {
    const allState = await stateModel.find();
    res.status(200).send({
        message: "all State",
        data: allState
    })
}

module.exports = {
    addState,
    getAllState
}