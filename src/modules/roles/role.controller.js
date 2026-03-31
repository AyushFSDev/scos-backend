const service = require("./role.service");

exports.createRole = async (req, res) => {
  try {
    const data = await service.createRole(req.body);

    res.status(201).json({
      success: true,
      message: "Role created",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const data = await service.getRoles();

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};