const express = require('express');
const app = express();
const { verifyToken, verifyAdminRole } = require("../../middlewares/auth");
const { addCategory } = require("../../services/admin/categoriesService");

app.post("/add_category", [verifyToken, verifyAdminRole], async (req, res) => {
  try {
    let categoryDB = await addCategory(req.body.title);
    return res.json({ok:true,categoryDB});
  } catch (error) {
    return res.json({ok:false,categoryDB:{},error})
  }
});

module.exports = app;