const Player = require('../models/player')

const getAllPlayers = async (limit = 10) => {
  try {
    return await Player.findAll({
      limit
    });
  } catch (error) {
    throw new Error(`Error al obtener las jugadoras: ${error.message}`);
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