import { Todo } from '../todos/models/todo';

export const Filters = {
    All: 'all',
    Completed: 'completed',
    Pending: 'pending',
};

const state = {
    todos: [
        new Todo('xd'),
        new Todo('xdxd'),
    ],
    filter: Filters.All,
}

const initStore = () => {
    loadState();
}

const loadState = () => {
    if (!localStorage.getItem('state')) return;

    const { todos = [],filter = Filters.All } = JSON.parse(localStorage.getItem('state'));

    state.todos = todos;
    state.filter = filter;

}

const saveState = () => {
    localStorage.setItem('state',JSON.stringify(state));
}

const getTodos = (filter = Filters.All) => {

    switch (filter) {
        case Filters.All:
            return [...state.todos];

        case Filters.Completed:
            return state.todos.filter(todo => todo.done);

        case Filters.Pending:
            return state.todos.filter(todo => !todo.done);

        default:
            throw new Error(`option ${filter} is not valid`);
    }

}

const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => todo.id === todoId ? { ...todo,done: !todo.done } : todo);
    saveState()
}

const addTodo = (description) => {
    if (!description) throw new Error('Description is required');
    state.todos = [new Todo(description),...state.todos];
    saveState()
}

const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveState()
}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveState()
}

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveState();
}

const getCurrentFilter = () => {
    return state.filter;
    
}

export default {
    initStore,
    getTodos,
    toggleTodo,
    addTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter
}