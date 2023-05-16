import store,{ Filters } from "../../store/store";

let element;

export const renderPending = (elementId) => {

    if (!element)
        element = document.querySelector(elementId);

    if (!element)
        throw new Error(`Element ${elementId} not found`);

        element.innerHTML = store.getTodos(Filters.Pending).length;
}