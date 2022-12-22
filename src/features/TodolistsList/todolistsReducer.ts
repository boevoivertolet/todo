import {todolistsApi, TodolistType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {RootAppActionsType, ThunkDispatchType} from '../../app/store';
import {RequestStatusType, setAppStatusAC} from '../../app/appReducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/errorUtils';


const initialState: Array<TodolistDomainType> = []


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: RootAppActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', requestStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-REQUEST-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, requestStatus: action.status} : tl)
        case 'SET-TODOLIST':
            return action.todolists.map(tl => ({...tl, filter: 'all', requestStatus: 'idle'}))
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodolistFilterAC = (filter: FilterValueType, id: string) =>
    ({type: 'CHANGE-TODOLIST-FILTER', filter, id} as const)
export const setTodolistAC = (todolists: Array<TodolistType>) =>
    ({type: 'SET-TODOLIST', todolists} as const)
export const changeTodolistRequestStatusAC = (id: string, status: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-REQUEST-STATUS', id, status} as const)


//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<ThunkDispatchType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistAC(res.data))
            dispatch(setAppStatusAC('succeeded'))

        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })

}
export const removeTodolistsTC = (todolistId: string) => (dispatch: Dispatch<ThunkDispatchType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistRequestStatusAC(todolistId, 'loading'))
    todolistsApi.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTodolistRequestStatusAC(todolistId, 'failed'))
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTodolistRequestStatusAC(todolistId, 'failed'))
            dispatch(setAppStatusAC('failed'))
        })
}
export const addTodolistsTC = (title: string) => (dispatch: Dispatch<ThunkDispatchType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}
export const changeTodolistsTitleTC = (id: string, title: string) => (dispatch: Dispatch<ThunkDispatchType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsApi.updateTodolist(id, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

//types
export type FilterValueType = 'active' | 'all' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValueType
    requestStatus: RequestStatusType
}
export type TodolistsActionType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistAC>
    | ReturnType<typeof changeTodolistRequestStatusAC>

