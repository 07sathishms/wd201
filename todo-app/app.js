const { request, response } = require('express')
const express = require('express')
const app = express()
const {Todo} = require("./models")
const bodyParser = require('body-parser')
const path = require("path")
app.use(bodyParser.json());

app.set("view engine","ejs");

app.get("/",async (request,response)=>{
  const alltodos = await Todo.getTodos();
  if(request.accepts("html")){
    response.render('index',{
      alltodos
    });
  }else{
    response.json({
      alltodos
    })
  }


});

app.use(express.static(path.join(__dirname,'public')));

  app.get("/todos", async (request, response) => {
    try {
      const todos = await Todo.findAll({ order: [["id", "ASC"]] });
      return response.json(todos);
    } catch (error) {
      console.log(error);
      return response.status(422).json(error);
    }
  });
app.post("/todos", async(request,response)=>{
    console.log("creating a todo",request.body)
    try {
        const todo = await Todo.addTodo({title: request.body.title,dueDate: request.body.dueDate, completed: false})
        return response.json(todo)
    } catch (error) {
        console.log("error")
        return response.status(422).json(error)
    }
   
})

app.put("/todos/:id/markAsCompleted",async(request,response)=>{
    console.log("update a todo",request.params.id)
    const todo = await Todo.findByPk(request.params.id)
    
    try {
        const updatedTodo = await todo.markAsCompleted();
        return response.json(updatedTodo);
      } catch (error) {
        console.log(error);
        return response.status(422).json(error);
      }
})

app.delete("/todos/:id",async(request,response)=>{
  try {
    const todo = await Todo.findByPk(request.params.id);
    if (todo) {
      await todo.delete();
      return response.json(true);
    } else {
      return response.json(false);
    }
  } catch (error) {
    console.log(error);
    return response.status(422).json(false);
  }
})
module.exports = app;

