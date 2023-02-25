
const todoList = require('../todo')
const {all,markAsComplete,add} = todoList();
describe("Todolist test suite",()=>{
    beforeAll(()=>{
        add({
            title: "Test Todo",
            completed: false,
            dueDate: new Date().toLocaleDateString("en-CA")
        })
    })
    test("should add new todo",()=>{
        const todoItemsCount = all.length;
        add(
            {
               title: "Test Todo",
                completed: false,
                dueDate: new Date().toLocaleDateString("en-CA")
        }   
        );
        expect(all.length).toBe(todoItemsCount+1) ;
    })
    test("should mark as complete",()=>{
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    })
    test('retrieves overdue items', () => {
        const date = new Date().toLocaleDateString("en-CA")
        expect(all[0].dueDate).toBe(date);
      });
    
      test('retrieves due today items', () => {
        const date = new Date().toLocaleDateString("en-CA")
        expect(all[0].dueDate).toBe(date);
      });
    
      test('retrieves due later items', () => {
        const date = new Date().toLocaleDateString("en-CA")
        expect(all[0].dueDate).toBe(date);
      });
    })