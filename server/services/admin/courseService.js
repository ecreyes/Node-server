const Course = require("../../models/course");

const addCourse = (title, description) => {
  return new Promise((resolve, reject) => {
    let newCourse = new Course({
      title,
      description
    });
    newCourse.save((error, courseDB) => {
      if (error)
        return reject({ ok: false, courseDB: {}, message: error })
      else
        return resolve({ ok: true, courseDB })
    })
  });
}

const addProfessorToCourse = (idCourse, idProfessor) => {
  return new Promise((resolve, reject) => {
    Course.findOneAndUpdate({ _id: idCourse },
      { "$push": { "professors": idProfessor } }, { new: true }, (error, courseDB) => {
        if (error) return reject({});
        else return resolve(courseDB);
      });
  });
}

const removeProfessorToCoure = (idCourse, idProfessor) => {
  return new Promise((resolve, reject) => {
    Course.findOneAndUpdate({ _id: idCourse },
      { "$pull": { "professors":  idProfessor  } }, { new: true }, (error, courseDB) => {
        if (error) return reject(error);
        else return resolve(courseDB);
      });
  });
}

module.exports = {
  addCourse,
  addProfessorToCourse,
  removeProfessorToCoure
}