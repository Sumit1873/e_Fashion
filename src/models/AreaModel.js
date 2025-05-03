const mognoose = require('mongoose');

const Schema = mognoose.Schema;

const areaSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    cityId: {
        type: Schema.Types.ObjectId,
        ref: "cities"
    },
    stateId: {
        type: Schema.Types.ObjectId,
        ref: "states"
    }
}, {
    timestamps: true
});

module.exports = mognoose.model('areas', areaSchema);