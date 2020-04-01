const express = require('express');
const app = express();
const { countUsers, countPages, getUsers, getPrevAndNext } = require("../../services/admin/usersService");
const { verifyToken, verifyAdminRole } = require("../../middlewares/auth");

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

module.exports = app;