const User = require("../../models/user");
const bcrypt = require('bcryptjs');


const disableUser = (id) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: id }, { state: false }, { new: true }, (error, userDB) => {
      if (error) return reject({});
      else return resolve(userDB);
    });
  });
}

const enableUser = (id) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: id }, { state: true }, { new: true }, (error, userDB) => {
      if (error) return reject({});
      else return resolve(userDB);
    });
  });
}

const changePasswordUser = (id, password) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: id }, { password: bcrypt.hashSync(password, 10) }, (error, userDB) => {
      if (error) return reject({});
      else return resolve(userDB);
    });
  });
}

const updateFields = (id, username, email) => {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate({ _id: id }, { username, email }, { new: true }, (error, userDB) => {
      if (error) return reject({});
      else return resolve(userDB);
    });
  });
}

module.exports = {
  disableUser,
  enableUser,
  changePasswordUser,
  updateFields
}