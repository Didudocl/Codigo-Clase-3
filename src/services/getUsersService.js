const { User } = require('../models');

const getUsersService = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw new Error('Error al obtener usuarios');
  }
};

module.exports = getUsersService;
