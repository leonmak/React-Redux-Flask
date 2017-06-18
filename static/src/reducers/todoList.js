import { RECEIVE_TODO_LISTS, FETCH_TODO_LISTS } from '../constants';
import { createReducer } from '../utils/misc';

const initialState = {
    data: [],
    isFetching: false,
    loaded: false,
};

export default createReducer(initialState, {
    [RECEIVE_TODO_LISTS]: (state, payload) =>
        Object.assign({}, state, {
            data: payload.data,
            isFetching: false,
            loaded: true,
        }),
    [FETCH_TODO_LISTS]: (state) =>
        Object.assign({}, state, {
            isFetching: true,
        }),
});
