const service = require("./tenant.service");

exports.createTenant = async (req, res) => {
  try {
    const data = await service.createTenant(req.body);

    res.status(201).json({
      success: true,
      message: "Tenant created",
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getTenants = async (req, res) => {
  const data = await service.getTenants();

  res.json({
    success: true,
    data,
  });
};