/* eslint-disable no-undef */


const todoList = require('../todo')
const {all,markAsComplete,add} = todoList();
describe("Todolist test suite",()=>{
    beforeAll(()=>{
        add({
            title: "Test Todo",
            completed: false,
            dueDate: '2023-02-23'
        })
    })
    test("should add new todo",()=>{
        const todoItemsCount = all.length;
        add(
            {
               title: "Test Todo",
                completed: false,
                dueDate: '2023-02-23'
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
        const date = "2023-02-20"
        expect(all[0].dueDate).toBe(date);
      });
    
      test('retrieves due today items', () => {
        expect(all[0].dueDate).toBe('2023-02-23');
      });
    
      test('retrieves due later items', () => {
        const date = "2023-02-28"
        expect(all[0].dueDate).toBe(date);
      });
    })
