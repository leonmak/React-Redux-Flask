import { FETCH_TODO, RECEIVE_TODO, UPSERT_TODO, DELETE_TODO, FETCH_TODO_LISTS, RECEIVE_TODO_LISTS } from '../constants/index';
import { parseJSON, groupBy } from '../utils/misc';
import { todos_data, todo_lists_data, todo_upsert, todo_delete } from '../utils/http_functions';
import { logoutAndRedirect } from './auth';

export function getToDoAction() {
    return {
        type: FETCH_TODO,
    };
}

export function receiveToDoAction(data) {
    return {
        type: RECEIVE_TODO,
        payload: {
            data: groupBy('listId', data),
        },
    };
}

export function fetchToDo() {
    return (dispatch) => {
        dispatch(getToDoAction());
        todos_data()
            .then(parseJSON)
            .then(response => dispatch(receiveToDoAction(response.data)))
            .catch(error => error.status === 401 && dispatch(logoutAndRedirect(error)));
    };
}

export function getToDoListsAction() {
    return {
        type: FETCH_TODO_LISTS
    };
}

export function receiveToDoListsAction(data) {
    return {
        type: RECEIVE_TODO_LISTS,
        payload: {data},
    };
}

export function fetchToDoLists() {
    return dispatch => {
        dispatch(getToDoListsAction);
        todo_lists_data()
            .then(parseJSON)
            .then(response => dispatch(receiveToDoListsAction(response.data)))
            .catch(error => error.status === 401 && dispatch(logoutAndRedirect(error)));
    };
}

export function upsertToDoAction(id, name, description, listId) {
    return {
        type: UPSERT_TODO,
        id,
        name, 
        description, 
        listId,
    };
}

export function upsertToDo(id, name, description, listId) {
    return (dispatch) => {
        dispatch(upsertToDoAction(id, name, description, listId));
        return todo_upsert(id, name, description, listId)
            .then(parseJSON)
            .then(response => fetchToDoLists()(dispatch))
            .catch(error => error.status === 401 && dispatch(logoutAndRedirect(error)));
    };
}

export function deleteToDoAction(id) {
    return {
        type: DELETE_TODO,
        id,
    };
}

export function deleteToDo(id) {
    return (dispatch) => {
        dispatch(deleteToDoAction(id));
        return todo_delete(id)
            .then(parseJSON)
            .then(response => fetchToDoLists()(dispatch))
            .catch(error => error.status === 401 && dispatch(logoutAndRedirect(error)));
    };
}
