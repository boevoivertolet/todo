import {TasksActionType, tasksReducer} from './tasksReducer/tasksReducer';
import {TodolistsActionType, todolistsReducer} from './todolistsReducer/todolistsReducer';
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));


export type AppRootStateType = ReturnType<typeof rootReducer>

export type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () => useDispatch<ThunkAppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector


/*export type AppDispatch = typeof store.dispatch*/
/* export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>*/

/*export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>*/
/*export type AppThunk<ReturnType = void> = any*/
/*export type AppThunk = AnyAction*/

export type AppActionsType = TodolistsActionType | TasksActionType


// @ts-ignore
window.store = store;