const playerService = require('../services/playerService');
const { validationResult } = require('express-validator');

const getAllPlayersController = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const { players, totalPlayers } = await playerService.getAllPlayers(limit, offset);

    if (players.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron jugadores"
      });
    }

    return res.status(200).json({
      success: true,
      data: players,
      meta: {
        totalPlayers,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalPlayers / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error al mostrar las jugadoras: ${error.message}`
    });
  }
};


const getOnePlayerController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "datos invalidos",
      errors: errors.array()
    });
  }
  const { id } = req.params;
  try {
    const player = await playerService.getOnePlayerById(id);
    if (!player) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró la jugadora'
      });
    }
    return res.status(200).json({
      success: true,
      data: player
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `No se encontró la jugadora: ${error.message}`
    });
  }
};

const createPlayerController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "datos invalidos",
      errors: errors.array()
    })
  }
  const data = req.body;
  try {
    const newPlayer = await playerService.createPlayer(data);
    res.status(201).json({
      success: true,
      data: {newPlayer}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `error al crear jugadora: ${error.message}`
    });
  }
}

const updatePlayerController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "datos invalidos",
      errors: errors.array()
    })
  }
  const { id } = req.params;
  const data = req.body;
  try {
    const playerExists = await playerService.getOnePlayerById(id);
    if (!playerExists) {
      return res.status(404).json({
        success: false,
        message: 'No se encontró la jugadora para actualizar'
      });
    }
    const player = await playerService.updatePlayer(id, data);
    return res.status(200).json({
      success: true,
      data: player
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `error al actualizar la jugadora: ${error.message}`
    });
  }
};

const deletePlayerController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "datos invalidos",
      errors: errors.array()
    })
  }
  const { id } = req.params;
  try {
    await playerService.deletePlayer(id);
    return res.status(200).json({
      success: true,
      message: "Jugadora eliminada"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `error al eliminar una jugadora: ${error.message}`
    })
  }
}

module.exports = {
  getAllPlayersController,
  getOnePlayerController,
  deletePlayerController,
  createPlayerController,
  updatePlayerController
};