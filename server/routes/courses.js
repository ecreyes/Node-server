const express = require('express');
const app = express();
const { verifyToken } = require("../middlewares/auth");
const { getAllCourses } = require("../services/courseService");

app.get("/all_courses", verifyToken, async (req, res) => {
  try {
    let coursesDB = await getAllCourses();
    return res.json({ok:true,coursesDB});
  } catch (error) {
    return res.json({ ok: false, coursesDB: {} });
  }
});


module.exports = app;