const Course = require("../../models/course");

const addCourse = (title, description) => {
  return new Promise((resolve, reject) => {
    let newCourse = new Course({
      title,
      description
    });
    newCourse.save((error, courseDB) => {
      if (error)
        return reject({ ok: false,courseDB:{}, message: error })
      else
        return resolve({ ok: true, courseDB })
    })
  });
}

module.exports = {
  addCourse
}