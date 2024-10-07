const { User } = require('../models');

const updateUserService = async (id, userData) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    await user.update(userData);
    return user;
  } catch (error) {
    throw new Error('Error al actualizar usuario');
  }
};

module.exports = updateUserService;
