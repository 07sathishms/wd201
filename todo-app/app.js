const { request, response } = require('express')
const express = require('express')
const app = express()
const {Todo} = require("./models")
const bodyParser = require('body-parser')
app.use(bodyParser.json());

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

app.put("/todos/:id",async(request,response)=>{
    console.log("Delete a todo",request.params.id)
    const id = request.params.id;
        const deleted = await Todo.destroy({ where: { id: request.params.id } });
        response.send(deleted ? true : false);
})
module.exports = app;

