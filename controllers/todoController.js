const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Connect to the database
mongoose.connect(
  "mongodb+srv://admin:admin@todo-xi2sa.mongodb.net/test?retryWrites=true&w=majority"
);

// Create data schema
var todoSchema = new mongoose.Schema({
  item: String,
});

// Define the model(a.k.a collection in mongodb) and assign to it the schema to be used
var Todo = mongoose.model("Todo", todoSchema);

// let data = [
//   { item: "Build CKWF Website" },
//   { item: "Practice Trumpet" },
//   { item: "Work on final year project" },
// ];

const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {
  // Get data from the db and pass it to the view
  app.get("/todo", (req, res) => {
    Todo.find({}, (err, data) => {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });

  app.post("/todo", urlencodedParser, (req, res) => {
    // Get data from the view and add to the database
    let newTodo = Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete("/todo/:item", (req, res) => {
    Todo.find({ item: req.params.item.replace(/-/g, " ") }).deleteOne(
      (err, data) => {
        if (err) throw err;
        res.json(data);
      }
    );
  });
};
