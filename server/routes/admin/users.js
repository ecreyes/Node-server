const express = require('express');
const app = express();
const { verifyToken, verifyAdminRole } = require("../../middlewares/auth");
const { getAllUsers, createUserByAdmin, countUsers, countPages, getUsers, getPrevAndNext } = require("../../services/admin/usersService");
const { disableUser, enableUser, changePasswordUser, updateFields } = require("../../services/admin/updateUserService");



app.get("/users", [verifyToken, verifyAdminRole], async (req, res) => {
  try {
    let page = req.query.page ? req.query.page - 1 : 0;
    let count = await countUsers();
    let pages = countPages(count);
    let data = getPrevAndNext(req, pages);
    let users = await getUsers(page);
    return res.json({
      ok: true,
      info: { count, pages, next: data.next, prev: data.prev },
      users
    });
  } catch (error) {
    return res.json({ ok: false, users: [], info: { count: 0, pages: 0, next: "", prev: "" } });
  }
});

app.get("/users_all", [verifyToken, verifyAdminRole], async (req, res) => {
  try {
    let users = await getAllUsers();
    return res.json({ ok: true, users });
  } catch (error) {
    return res.json({ ok: false, users: [] });
  }
});

app.post("/add_user", [verifyToken, verifyAdminRole], async (req, res) => {
  try {
    let body = req.body;
    let data = await createUserByAdmin(body.username, body.email, body.password);
    return res.status(200).json({ok:true,user:data.userDB});
  } catch (error) {
    return res.status(400).json({ok:false,user:{}});
  }
});

app.put("/disable_user", [verifyToken, verifyAdminRole], async (req, res) => {
  try {
    let id = req.body.id;
    let userDB = await disableUser(id);
    return res.json({
      ok: true,
      userDB
    });
  } catch (error) {
    return res.json({ ok: false, userDB: {} });
  }
});

app.put("/enable_user", [verifyToken, verifyAdminRole], async (req, res) => {
  try {
    let id = req.body.id;
    let userDB = await enableUser(id);
    return res.json({
      ok: true,
      userDB
    });
  } catch (error) {
    return res.json({ ok: false, userDB: {} });
  }
});

app.put("/update_password", [verifyToken, verifyAdminRole], async (req, res) => {
  try {
    let body = req.body;
    let userDB = await changePasswordUser(body.id, body.password);
    return res.json({ ok: true, userDB, message: "password has been updated" });
  } catch (error) {
    return res.json({ ok: false, userDB: {}, message: "occurs an error" });
  }
});

app.put("/update_fields_user", [verifyToken, verifyAdminRole], async (req, res) => {
  try {
    let body = req.body;
    let id = body.id;
    let username = body.username;
    let email = body.email;
    let userDB = await updateFields(id, username, email);
    return res.json({ ok: true, userDB });
  } catch (error) {
    return res.json({ ok: false, userDB: {}, message: "occurs an error" });
  }
});

module.exports = app;