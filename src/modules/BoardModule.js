import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_BOARD = 'board/GET_BOARD';
export const GET_BOARDS = 'board/GET_BOARDS';
export const POST_BOARDS_MANAGEMENT = 'board/POST_BOARDS_MANAGEMENT';
export const PUT_BOARDS_MANAGEMENT = 'board/PUT_BOARDS_MANAGEMENT';
export const DELETE_BOARDS_MANAGEMENT = 'board/DELETE_BOARDS_MANAGEMENT';
// eslint-disable-next-line
const actions = createActions({
    [GET_BOARD]: () => {},
    [GET_BOARDS]: () => {},
    [POST_BOARDS_MANAGEMENT]: () => {},
    [PUT_BOARDS_MANAGEMENT]: () => {},
    [DELETE_BOARDS_MANAGEMENT]: () => {}
});

/* 리듀서 */
const boardReducer = handleActions(
    {
        [GET_BOARD]: (state, { payload }) => {
            
            return payload;
        },
        [GET_BOARDS]: (state, { payload }) => {
            
            return payload;
        },
        [POST_BOARDS_MANAGEMENT]: (state, { payload }) => {

            return payload;
        },
        [PUT_BOARDS_MANAGEMENT]: (state, { payload }) => {

            return payload;
        },
        [DELETE_BOARDS_MANAGEMENT]: (state, { payload }) => {

            return payload;
        }        
    },
    initialState
);

export default boardReducer;