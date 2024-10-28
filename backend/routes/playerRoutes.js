const express = require('express');
const router = express.Router();
const { 
  getAllPlayersController,
  getOnePlayerController,
  deletePlayerController,
  createPlayerController,
  updatePlayerController
 } = require('../controllers/playerController')
const {
  createPlayerValidations,
  updatePlayerValidations,
  deletePlayerValidations,
  getPlayerByIdValidations
} = require('../validations/playerValidations');

router.get('/players', getAllPlayersController);
router.get('/players/:id', getPlayerByIdValidations, getOnePlayerController);
router.post('/players', createPlayerValidations, createPlayerController);
router.put('/players/:id', updatePlayerValidations, updatePlayerController);
router.delete('/players/:id', deletePlayerValidations, deletePlayerController);

module.exports = router;