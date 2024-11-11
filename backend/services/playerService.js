const Player = require('../models/player');
const { Op } = require('sequelize');

const getAllPlayers = async (limit, offset, long_name = '', club_name = '') => {
  try {
    const whereConditions = {};
    if (long_name) {
      whereConditions.long_name = { [Op.like]: `%${long_name}%` };
    }

    if (club_name) {
      whereConditions.club_name = { [Op.like]: `%${club_name}%` };
    }
    
    const { rows: players, count: totalPlayers } = await Player.findAndCountAll({
      where: whereConditions,
      limit: limit,
      offset: offset
    });
    return { players, totalPlayers };
  } catch (error) {
    console.error(error);
    throw error;
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
    throw new Error(`Error al obtener la jugadora: ${error.message}`);
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
    throw new Error(error);
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
    return { message: "Jugadora eliminada correctamente" };
  } catch (error) {
    throw new Error(`Error al eliminar la jugadora: ${error.message}`);
  }
}

const findPlayersByName = async (name) => {
  try {
    const players = await Player.findAll({
      where: {
        long_name: {
          [Op.like]: `%${name}%`
        }
      }
    })
    console.log('Resultados encontrados:', players);
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllPlayers,
  getOnePlayerById,
  createPlayer,
  updatePlayer,
  deletePlayer,
  findPlayersByName
};