const Course = require("../models/course");

const getAllCourses = () => {
  return new Promise((resolve, reject) => {
    Course.find().populate("professors").exec((error, coursesDB) => {
      if (error)
        return reject([])
      else
        return resolve(coursesDB);
    });
  })
}

module.exports = {
  getAllCourses
}