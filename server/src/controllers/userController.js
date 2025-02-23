const UserModel = require("../db/models/user.model");

exports.Register = async (req, res) => {
  console.log(req.body, "req.body");
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      status: false,
      message: "Please provide required information for Register",
    });
  }

  try {
    const newUser = await UserModel.create({ username, email, password });

    if (newUser) {
      return res.status(201).json({
        status: true,
        message: "User registered successfully",
      });
    }

    res.status(500).json({
      status: false,
      message: "User creation failed, please try again",
    });
  } catch (error) {
    console.error("Error occurred while registering: ", error);

    res.status(500).json({
      status: false,
      message: "Failed to register the user",
      error: error.message,
    });
  }
};
