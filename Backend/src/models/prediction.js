const mongoose = require("mongoose")

const PredictionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    breed: String,
    animalType: String,
    result: Object,
    confidence: String,
    imagePath: String,
},
    { timestamps: true }
)

module.exports = mongoose.model("Prediction", PredictionSchema)