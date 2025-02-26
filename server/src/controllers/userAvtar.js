// const axios = require("axios");

// exports.Avtar = async (req, res) => {
//   try {
//     const avatarId = req.params.id;
//     const response = await axios.get(
//       `https://api.multiavatar.com/${avatarId}`,
//       {
//         responseType: "arraybuffer",
//       }
//     );

//     res.setHeader("Content-Type", "image/svg+xml");
//     res.status(200).send(response.data);
//   } catch (error) {
//     console.error("Error fetching avatar:", error);
//     res
//       .status(500)
//       .json({ error: "Error fetching avatar", errorMessage: error.message });
//   }
// };

const axios = require("axios");

exports.Avtar = async (req, res) => {
  try {
    const avatarId = req.params.id;
    const response = await axios.get(
      `https://api.multiavatar.com/${avatarId}.svg`, // Ensure .svg extension
      {
        responseType: "arraybuffer",
        headers: {
          "User-Agent": "Mozilla/5.0", // Mimic a browser request
          Accept: "image/svg+xml", // Request specifically an SVG image
        },
      }
    );

    res.setHeader("Content-Type", "image/svg+xml");
    res.status(200).send(response.data);
  } catch (error) {
    console.error(
      "Error fetching avatar:",
      error.response?.status,
      error.message
    );
    res.status(error.response?.status || 500).json({
      error: "Error fetching avatar",
      errorMessage: error.message,
    });
  }
};
