'use strict';
const {
  Model, Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
     const ov = await Todo.overdue();
     ov.forEach(todo => console.log(todo.displayableString()));
    
    
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const td = await Todo.overdue();
     td.forEach(todo => console.log(todo.displayableString()));
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const dl = await Todo.overdue();
     dl.forEach(todo => console.log(todo.displayableString()));
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const date = new Date();
      return await Todo.findAll({
        where: {
          dueDate: {[Op.lt]:date},
          completed: false
        },
        order: [['dueDate','ASC']]

      });
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const date = new Date();
      return await Todo.findAll({
        where: {
          dueDate: {[Op.eq]:date},
          completed: false
        },
        order: [['dueDate','ASC']]

      });
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const date = new Date();
      return await Todo.findAll({
        where: {
          dueDate: {[Op.gt]:date},
          completed: false
        },
        order: [['dueDate','ASC']]

      });
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      const todo = await Todo.findByPk(id);
      if(todo){
        todo.completed = true;
        await todo.save();
      }     

    }

    displayableString() {
      let check = this.completed ? "[x]" : "[ ]";
      const day = new Date(this.dueDate);
      if (this.completed && day < new Date()) {
        return `${this.id}. ${check} ${this.title} ${this.dueDate}`.trim();
      } else if (day.getDate() === new Date().getDate()) {
        return `${this.id}. ${check} ${this.title}`.trim();
      } else {
        return `${this.id}. ${check} ${this.title} ${this.dueDate}`.trim();
      }
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};