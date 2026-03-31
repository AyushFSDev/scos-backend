const service = require("./auth.service");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await service.login(email, password);

    res.json({
      success: true,
      message: "Login successful",
      pre_context_token: result.token,
      user: {
        id: result.user.id,
        full_name: result.user.full_name,
        email: result.user.email,
      },
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getMyInstitutesRoles = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const data = await service.getMyInstitutesRoles(decoded.user_id);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.selectContext = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.token_type !== "pre_context") {
      return res.status(403).json({
        success: false,
        message: "Invalid token type",
      });
    }

    const { tenant_id, institute_id, role_id } = req.body;

    const accessToken = await service.selectContext(
      decoded.user_id,
      tenant_id,
      institute_id,
      role_id
    );

    res.json({
      success: true,
      access_token: accessToken,
      selected_context: {
        tenant_id,
        institute_id,
        role_id,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


exports.me = (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
};