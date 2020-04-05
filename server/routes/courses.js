const express = require('express');
const app = express();
const { verifyToken, verifyProfessorRole } = require("../middlewares/auth");
const { getAllCourses, removeStudentToCourse,
  addStudentToCourse, getAllCoursesByProfessor, getAllCoursesByStudent } = require("../services/courseService");

app.get("/all_courses", verifyToken, async (req, res) => {
  try {
    let coursesDB = await getAllCourses();
    return res.json({ ok: true, coursesDB });
  } catch (error) {
    return res.json({ ok: false, coursesDB: {} });
  }
});

app.get("/all_courses_by_professor", verifyToken, async (req, res) => {
  try {
    let coursesDB = await getAllCoursesByProfessor(req.body.id);
    return res.json({ ok: true, coursesDB });
  } catch (error) {
    return res.json({ ok: false, coursesDB: {}, error });
  }
});

app.get("/all_courses_by_student", verifyToken, async (req, res) => {
  try {
    let coursesDB = await getAllCoursesByStudent(req.body.id);
    return res.json({ ok: true, coursesDB });
  } catch (error) {
    return res.json({ ok: false, coursesDB: {}, error });
  }
});

app.put("/add_student", [verifyToken, verifyProfessorRole], async (req, res) => {
  try {
    let body = req.body;
    let courseDB = await addStudentToCourse(body.id, body.idStudent);
    return res.json({ ok: true, courseDB });
  } catch (error) {
    return res.json({ ok: false, courseDB: {} })
  }
});

app.put("/remove_student", [verifyToken, verifyProfessorRole], async (req, res) => {
  try {
    let body = req.body;
    let courseDB = await removeStudentToCourse(body.id, body.idStudent);
    return res.json({ ok: true, courseDB });
  } catch (error) {
    return res.json({ ok: false, courseDB: {}, error })
  }
});


module.exports = app;