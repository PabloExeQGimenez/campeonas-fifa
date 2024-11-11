const { check } = require('express-validator');

const loginValidations = [
  check('email').isEmail().withMessage('Ingrese un email correcto'),
  check('password').notEmpty().withMessage('Ingrese su contraseña')
]

const registerValidations = [
  check('email').isEmail().withMessage('Debe ser un email válido'),
  check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

module.exports = {
  loginValidations,
  registerValidations
}