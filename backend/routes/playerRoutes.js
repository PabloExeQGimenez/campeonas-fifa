const express = require('express');
const router = express.Router();
const { 
  getAllPlayersController,
  getOnePlayerController,
  deletePlayerController,
  createPlayerController,
  updatePlayerController,
  getAllClubsController
 } = require('../controllers/playerController');
const {
  loginController,
  registerController,
  getAllUsersController
} = require('../controllers/userController');
const {
  createPlayerValidations,
  updatePlayerValidations,
  deletePlayerValidations,
  getPlayerByIdValidations
} = require('../validations/playerValidations');
const { 
  loginValidations,
  registerValidations
} = require('../validations/userValidations');
const { authenticateToken } = require('../middlewares/authMiddleware');


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Email o password incorrectos
 */
router.post('/login', loginValidations, loginController);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registro exitoso.
 *       400:
 *         description: Error en el registro.
 */
router.post('/register', registerValidations, registerController);

router.use(authenticateToken);

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Obtener la lista de jugadoras
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de jugadoras obtenida con éxito.
 *       401:
 *         description: No autorizado. Token faltante o inválido.
 */
router.get('/players', getAllPlayersController);

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Obtener una jugadora por ID
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la jugadora
 *     responses:
 *       200:
 *         description: Detalles de la jugadora obtenidos con éxito.
 *       401:
 *         description: No autorizado. Token faltante o inválido.
 *       404:
 *         description: Jugadora no encontrada.
 */
router.get('/players/:id', getPlayerByIdValidations, getOnePlayerController);

/**
 * @swagger
 * /players:
 *   post:
 *     summary: Crea una jugadora
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               club:
 *                 type: string
 *               rating:
 *                 type: integer
 *               nationality:
 *                 type: string
 *     responses:
 *       201:
 *         description: Jugadora creada con éxito.
 *       400:
 *         description: Error de validación.
 *       401:
 *         description: No autorizado. Token faltante o inválido.
 */
router.post('/players', createPlayerValidations, createPlayerController);

/**
 * @swagger
 * /players/{id}:
 *   put:
 *     summary: Actualiza la información de una jugadora
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la jugadora
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *               club:
 *                 type: string
 *               rating:
 *                 type: integer
 *               nationality:
 *                 type: string
 *     responses:
 *       200:
 *         description: Jugadora actualizada exitosamente.
 *       400:
 *         description: Error de validación.
 *       401:
 *         description: No autorizado. Token faltante o inválido.
 *       404:
 *         description: Jugadora no encontrada.
 */
router.put('/players/:id', updatePlayerValidations, updatePlayerController);

/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     summary: Elimina una jugadora por ID
 *     tags: [Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la jugadora
 *     responses:
 *       200:
 *         description: Jugadora eliminada exitosamente.
 *       401:
 *         description: No autorizado. Token faltante o inválido.
 *       404:
 *         description: Jugadora no encontrada.
 */
router.delete('/players/:id', deletePlayerValidations, deletePlayerController);

/**
 * @swagger
 * /clubs:
 *   get:
 *     summary: Obtener la lista de todos los clubes
 *     tags: [Clubs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clubes obtenida con éxito.
 *       401:
 *         description: No autorizado. Token faltante o inválido.
 */
router.get('/clubs', getAllClubsController);

router.get('/playersall', getAllClubsController)
module.exports = router;
