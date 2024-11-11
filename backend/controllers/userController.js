const { validationResult } = require('express-validator');
const userService = require('../services/userService');

const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const result = await userService.login(email, password);
    res.status(200).json({
      success: true,
      message: "Login exitoso",
      data: result
    })
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
}

const registerController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await userService.register(email, password);
    res.status(201).json({ 
      success: true,
      message: "Registro exitoso",
      data: user });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener los usuarios',
      error: error.message,
    });
  }
};
module.exports = {
  loginController,
  registerController,
  getAllUsersController
}