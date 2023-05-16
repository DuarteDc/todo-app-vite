import html from './app.html?raw';
import store,{ Filters } from '../store/store';
import { renderTodos, renderPending } from './use-cases';

const elementIDs = {
    clearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PendingCountLabel: '#pending-count',
}

export const App = (elementId) => {

    const { getTodos,getCurrentFilter,addTodo,toggleTodo,deleteTodo,deleteCompleted,setFilter } = store;

    const displayTodo = () => {
        const todos = getTodos(getCurrentFilter());
        renderTodos(elementIDs.TodoList,todos);
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending(elementIDs.PendingCountLabel);
    }
    
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodo();
    })();

    const newTodo = document.querySelector(elementIDs.newTodoInput);
    const todoListUL = document.querySelector(elementIDs.TodoList);
    const clearCompleted = document.querySelector(elementIDs.clearCompleted);
    const filtersLis = document.querySelectorAll(elementIDs.TodoFilters);
    const pendingCountLabel = document.querySelector(elementIDs.PendingCountLabel);

    newTodo.addEventListener('keyup',({ target,keyCode }) => {
        if (keyCode !== 13) return;

        if (target.value.trim().length === 0) return;

        addTodo(target.value);
        displayTodo();
        target.value = '';
    })

    todoListUL.addEventListener('click',(event) => {
        const element = event.target.closest('[data-id]');
        toggleTodo(element.getAttribute('data-id'));
        displayTodo();
    })

    todoListUL.addEventListener('click',(event) => {
        const classElement = event.target.className;
        if (classElement !== 'destroy') return;

        const element = event.target.closest('[data-id]');
        deleteTodo(element.getAttribute('data-id'));

        displayTodo();
    })

    clearCompleted.addEventListener('click',(event) => {
        deleteCompleted()
        displayTodo();
    });

    filtersLis.forEach(element => {
        element.addEventListener('click',(element) => {
            filtersLis.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            switch (element.target.text) {
                case 'Todos':
                    setFilter(Filters.All);
                    break;
                case 'Pendientes':
                    setFilter(Filters.Pending);
                    break;
                case 'Completados':
                    setFilter(Filters.Completed);
                    break;
                default:
                    setFilter(Filters.All)
            }

            displayTodo();

        })
    })

}