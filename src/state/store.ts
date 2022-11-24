import {tasksReducer} from './tasksReducer/tasksReducer';
import {todolistsReducer} from './todolistsReducer/todolistsReducer';
import {combineReducers, legacy_createStore} from 'redux';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;