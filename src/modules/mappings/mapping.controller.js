const service = require("./mapping.service");

exports.createMapping = async (req, res) => {
  try {
    const data = await service.createMapping(req.body);

    res.status(201).json({
      success: true,
      message: "Mapping created",
      data,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getMappings = async (req, res) => {
  const data = await service.getMappings();

  res.json({
    success: true,
    data,
  });
};