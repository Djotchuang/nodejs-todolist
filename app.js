const express = require("express");
const todoController = require("./controllers/todoController");

const app = express();

// Set the template engine
app.set("view engine", "ejs");

// Set express middleware to find static files
app.use(express.static("./public"));

// Kick Start Controller
todoController(app);

// Listen to a port
app.listen(3000);
