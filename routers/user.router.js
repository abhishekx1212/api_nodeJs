const { Router } = require("express");
const { create, login, logout, dataUpdate, deleteData, getData } = require("../controllers/user.controller");
const { isAuthJwt } = require("../middleware/auth.js");

const adminrouter = Router();

adminrouter.get("/getJWt",getData)

adminrouter.get("/logout", logout);

adminrouter.post("/create", create);

adminrouter.patch("/update/:id", dataUpdate);

adminrouter.delete("/delete/:id", deleteData);

adminrouter.post("/login",login);

module.exports = {adminrouter};
