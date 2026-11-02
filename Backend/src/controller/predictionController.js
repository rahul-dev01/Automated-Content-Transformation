const Prediction = require("../models/prediction");
const { sendImageToFlask } = require("../service/predictionService");

const predictImage = async (req, res) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: userId missing" });
  }

  const imageFile = req.file;
  if (!imageFile) {
    return res.status(400).json({ error: "No image file provided" });
  }

  try {
    // Pass both the path and the original filename
    const predictionData = await sendImageToFlask(imageFile.path, imageFile.originalname);

    if (predictionData && predictionData.error) {
      // If Flask returned an error, send it to the frontend directly without saving
      return res.status(400).json({ error: predictionData.error });
    }

    let breed = "Unknown";
    let animalType = "unknown";
    let confidence = "N/A";
    let description = "";

    if (predictionData && predictionData.breed) {
      breed = predictionData.breed;
      animalType = predictionData.animal_type || "unknown";
      confidence = predictionData.confidence_percent || "N/A";
      description = predictionData.description || "";
    }

    const newPrediction = new Prediction({
      userId: userId,
      breed: breed,
      animalType: animalType,
      result: predictionData, // Save the entire JSON data in 'result' object
      confidence: String(confidence),
      imagePath: imageFile.path,
    });

    await newPrediction.save();

    // Send back the full rich prediction data from Flask to the frontend
    res.status(201).json(predictionData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Prediction failed" });
  }
};

const getUserHistory = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const history = await Prediction.find({ userId }).sort({ createdAt: -1 });
  
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch history" });
  }
};

const deletePrediction = async (req, res) => {
  try {
    const prediction = await Prediction.findById(req.params.id);
    if (!prediction) return res.status(404).json({ error: "Not found" });

    if (prediction.imagePath) {
      const fs = require("fs");
      try {
        fs.unlinkSync(prediction.imagePath);
      } catch(e) {
        console.error("Error deleting image file:", e);
      }
    }

    await Prediction.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Deletion failed" });
  }
};

module.exports = {
  predictImage,
  getUserHistory,
  deletePrediction,
};
