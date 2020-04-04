const express = require('express');
const app = express();
const { verifyToken, verifyAdminRole } = require("../../middlewares/auth");
const { addCourse,addProfessorToCourse } = require("../../services/admin/courseService");

app.post("/add_course", [verifyToken, verifyAdminRole], async (req, res) => {
  try {
    let body = req.body;
    let courseDB = await addCourse(body.title, body.description);
    return res.json({ ok: true, courseDB });
  } catch (error) {
    return res.json({ ok: false, courseDB: {} });
  }
});

app.put("/add_professor",[verifyToken,verifyAdminRole],async (req,res)=>{
  try{
    let body = req.body;
    let courseDB = await addProfessorToCourse(body.id,body.idProfessor);
    return res.json({ok:true,courseDB});
  }catch(error){
    return res.json({ok:false,courseDB:{}})
  }
});


module.exports = app;