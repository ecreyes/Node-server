const User = require("../../models/user");

const countUsers = () => {
  return new Promise((resolve, reject) => {
    User.where({ role: "USER_ROLE" }).countDocuments((error, numberUsers) => {
      if (error)
        return reject(-1)
      else
        return resolve(numberUsers);
    });
  });
}

const countPages = (numberUsers) => {
  let usersPerPage = getUserPerPage();
  let resultDivision = Math.floor(numberUsers / usersPerPage);
  if (Math.floor(numberUsers % usersPerPage) == 0) {
    return resultDivision
  } else {
    return resultDivision + 1
  }
}

const getUsers = (page) => {
  return new Promise((resolve, reject) => {
    User.find({ role: "USER_ROLE" })
      .skip(page * getUserPerPage())
      .limit(getUserPerPage())
      .exec((error, usersDB) => {
        if (error)
          return reject([])
        else
          return resolve(usersDB);
      });
  });
}

const getUserPerPage = () => {
  return 5;
}

const getPrevAndNext = (req, maxPage) => {
  let res = { prev: "", next: "" };
  let protocol = req.protocol;
  let host = req.get("host");
  let originalUrl = req.originalUrl;
  let fullUrl = protocol + '://' + host + originalUrl;
  if (originalUrl == "/users") {
    res.prev = "";
    if (maxPage == 1) {
      res.next = "";
    } else {
      res.next = `${fullUrl}?page=2`;
    }
    return res;
  } else {
    let originalUrlSplit = originalUrl.split("=");
    let page = parseInt(originalUrlSplit[originalUrlSplit.length - 1]);
    if (page <= maxPage && page >= 2) {
      let nextPage = page + 1;
      if (page == maxPage) {
        res.next = "";
        if (page == 2) {
          res.prev = `${protocol}://${host}/users`;
        } else {
          res.prev = `${protocol}://${host}/users?page=${page - 1}`;
        }
      } else {
        res.next = `${protocol}://${host}/users?page=${nextPage}`;
        if (page == 2) {
          res.prev = `${protocol}://${host}/users`;
        } else {
          res.prev = `${protocol}://${host}/users?page=${page - 1}`;
        }
      }
      return res;
    }
    return res;
  }
}

module.exports = {
  countUsers,
  countPages,
  getUsers,
  getPrevAndNext
}