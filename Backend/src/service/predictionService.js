const fs = require("fs");
const FormData = require("form-data");
const axios = require("axios");
require("dotenv").config()

const sendImageToFlask = async (imagePath, originalFilename) => {

  const Flask_URl = process.env.FLASK_API_URL ;

  console.log("sendImageToFlask called with imagePath:", imagePath, "filename:", originalFilename);

  const formData = new FormData();
  // Pass the original filename so Flask can check the extension
  formData.append("image_file", fs.createReadStream(imagePath), { filename: originalFilename });

  try {
    const response = await axios.post( `${Flask_URl}${"/detection/upload/"}` , formData, {
      headers: {
        ...formData.getHeaders(),
        "Accept": "application/json"
      },
      validateStatus: function (status) {
        return status >= 200 && status < 500; // Resolve promise for any status < 500
      }
    });

    console.log("Flask server responded:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Error communicating with Flask:", error.message);
    throw error;
  }
};

module.exports = { sendImageToFlask };
