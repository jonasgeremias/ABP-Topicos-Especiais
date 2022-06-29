const { requireAuthMiddleware } = require("../auth");
//const express = require("express");

module.exports = function (app) {
  app.use("/users", require("./users"));
  app.use("/clients", requireAuthMiddleware, require("./clients"));
  app.use("/documents", requireAuthMiddleware, require("./documents"));
  app.use("/email", requireAuthMiddleware, require("./email"));
  // app.use("/uploads", express.static(__dirname + "/uploads"));
};
