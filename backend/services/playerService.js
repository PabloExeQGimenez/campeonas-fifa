const Player = require('../models/player')

// Servicio para obtener todos los jugadores
const getAllPlayers = async (limit, offset) => {
  try {
    const { rows: players, count: totalPlayers } = await Player.findAndCountAll({
      limit: limit,
      offset: offset
    });
    return { players, totalPlayers }; // Devuelve players y totalPlayers
  } catch (error) {
    console.error('Error en getAllPlayers:', error);
    throw error; // Lanza el error para que el controlador lo capture
  }
};


const getOnePlayerById = async (id) => {
  try {
    const player = await Player.findByPk(id);
    if (!player) {
      throw new Error('Jugadora no encontrada');
    }
    return player;
  } catch (error) {
    throw new Error(`Error al obtener una jugadora: ${error.message}`);
  }
};

const createPlayer = async (data) => {
  try {
    const { 
      long_name,
      age,
      player_face_url,
      player_positions,
      overall,
      potential,
      fifa_version,
      fifa_update
    } = data;

    const newPlayer = await Player.create({
      long_name,
      age,
      player_face_url,
      player_positions,
      overall,
      potential,
      fifa_version,
      fifa_update
    });

    return newPlayer;
  } catch (error) {
    throw new Error (error);
  }
};


const updatePlayer = async (id, data) => {
  try {
    const player = await Player.findByPk(id);
    if (!player) {
      throw new Error("No se encontró la jugadora");
    }
    await player.update(data);
    return player;
  } catch (error) {
    throw new Error(`Error al actualizar la jugadora: ${error.message}`);
  }
};

const deletePlayer = async (id) => {
  try {
    const player = await Player.findByPk(id);
    if (!player) {
      throw new Error('No se encontró la jugadora');
    };
    await player.destroy();
    return { message: "Jugadora eliminada correctamente"};
  } catch (error) {
    throw new Error(`Error al eliminar la jugadora: ${error.message}`);
  }
}

module.exports = {
  getAllPlayers,
  getOnePlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer
};