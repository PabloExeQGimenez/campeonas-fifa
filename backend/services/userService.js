const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const login = async (email, password) => {
  const user = await User.findOne({
    where: { email }
  });
  
  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const passwordValid = await bcryptjs.compare(password, user.password);

  if (!passwordValid) {
    throw new Error('Contraseña incorrecta');
  }

  const token = jwt.sign({id: user.id, email: user.email}, secretKey, {expiresIn: '1h'});

  return {
    token,
    user: {
      id: user.id,
      email: user.email
    }
  }
}

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users; 
  } catch (error) {
    throw new Error(error);
  }
};

const register = async (email, password) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }
  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword
  });

  return { id: newUser.id, email: newUser.email };
};

module.exports = {
  login,
  register
}
