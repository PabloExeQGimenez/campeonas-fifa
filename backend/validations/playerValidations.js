const { check } = require('express-validator');

const createPlayerValidations = [
  check('fifa_version').not().isEmpty().withMessage('La versión de FIFA es obligatoria'),
  check('fifa_update').isInt().withMessage('La actualización de FIFA debe ser una fecha válida'),
  check('long_name').not().isEmpty().withMessage('El nombre es obligatorio'),
  check('overall').isInt({ min: 1, max: 100 }).withMessage('El overall debe estar entre 1 y 100'),
  check('age').isInt({ min: 1, max: 99 }).withMessage('Ingrese una edad válida')
];

const updatePlayerValidations = [
  check('id').isInt().not().isEmpty().withMessage('ingrese un id válido'),
  check('long_name').optional().not().isEmpty().withMessage('Eñ nombre completo no puede estar vacío'),
  check('overall').optional().isInt({ min: 1, max: 100 }).withMessage('Ingrese un overall entre 1 y 100'),
  check('age').optional().isInt({ min: 1, max: 99}).withMessage('Ingrese una edad válida')
];

const deletePlayerValidations = [
  check('id').isInt().not().isEmpty().withMessage('Falta id o no es válido')
];

const getPlayerByIdValidations = [
  check('id').isInt().not().isEmpty().withMessage('Ingrese un id válido')
];

module.exports = {
  getPlayerByIdValidations,
  deletePlayerValidations,
  updatePlayerValidations,
  createPlayerValidations
}
