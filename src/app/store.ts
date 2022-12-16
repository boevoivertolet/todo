import {TasksActionType, tasksReducer} from '../features/TodolistsList/tasksReducer';
import {TodolistsActionType, todolistsReducer} from '../features/TodolistsList/todolistsReducer';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appReducer} from './appReducer';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));


export type AppRootStateType = ReturnType<typeof rootReducer>

export type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppActionsType = TodolistsActionType | TasksActionType


// @ts-ignore
window.store = store;