const service = require("./institute.service");

exports.createInstitute = async (req, res) => {
  try {
    const data = await service.createInstitute(req.body);

    res.status(201).json({
      success: true,
      message: "Institute created",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getInstitutes = async (req, res) => {
  const data = await service.getInstitutes();

  res.json({
    success: true,
    data,
  });
};