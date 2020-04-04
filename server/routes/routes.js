const express = require('express');
const app = express();

//users routes
app.use(require('./auth'));
app.use(require("./courses"));

//admin routes
app.use(require("./admin/users"));
app.use(require("./admin/courses"));

module.exports = app;