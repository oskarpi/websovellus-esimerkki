'use strict';
// userController
const userModel = require('../models/userModel');


const users = userModel.users;

const user_list_get = async(req, res) => {
  const users = await userModel.getAllUsers();
  users.map(kayttaja => delete kayttaja.password);
  res.json(users);
};

const user_get = async(req, res) =>{
  const id = req.params.id;
  const user = await userModel.getUser(id);
  delete user.password;
  res.json(user);
}

module.exports = {
  user_list_get,
  user_get,
};