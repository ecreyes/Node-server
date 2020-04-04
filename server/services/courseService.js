const Course = require("../models/course");

const getAllCourses = () => {
  return new Promise((resolve, reject) => {
    Course.find().populate("professors").populate("students").exec((error, coursesDB) => {
      if (error)
        return reject([])
      else
        return resolve(coursesDB);
    });
  })
}

const addStudentToCourse = (idCourse, idStudent) => {
  return new Promise((resolve, reject) => {
    Course.findOneAndUpdate({ _id: idCourse },
      { "$push": { "students": idStudent } }, { new: true }, (error, courseDB) => {
        if (error) return reject({});
        else return resolve(courseDB);
      });
  });
}

const removeStudentToCourse = (idCourse, idStudent) => {
  return new Promise((resolve, reject) => {
    Course.findOneAndUpdate({ _id: idCourse },
      { "$pull": { "students":  idStudent  } }, { new: true }, (error, courseDB) => {
        if (error) return reject(error);
        else return resolve(courseDB);
      });
  });
}

module.exports = {
  getAllCourses,
  addStudentToCourse,
  removeStudentToCourse
}