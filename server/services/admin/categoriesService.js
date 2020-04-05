const Category = require("../../models/category");

const addCategory = (title) => {
  return new Promise((resolve, reject) => {
    let newCategory = new Category({
      title
    });
    newCategory.save((error, categoryDB) => {
      if (error)
        return reject(error)
      else
        return resolve(categoryDB)
    })
  });

}

module.exports = {
  addCategory
}