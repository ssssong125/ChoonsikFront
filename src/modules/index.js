import { combineReducers } from 'redux';
import boardReducer from './BoardModule';
import memberReducer from './MemberModule';

const rootReducer = combineReducers({
    memberReducer,
    boardReducer
});

export default rootReducer;
