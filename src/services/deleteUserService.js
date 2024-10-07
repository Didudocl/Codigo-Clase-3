const { User } = require('../models');

const deleteUserService = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    await user.destroy();
    return true;
  } catch (error) {
    throw new Error('Error al eliminar usuario');
  }
};

module.exports = deleteUserService;
