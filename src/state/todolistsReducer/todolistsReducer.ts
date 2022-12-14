import {v1} from 'uuid';
import {todolistsApi, TodolistType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {AppActionsType} from '../store';


export type TodolistsActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}
export type SetTodolistActionType = {
    type: 'SET-TODOLIST'
    todolists: Array<TodolistType>
}

const initialState: Array<TodolistDomainType> = []

export type FilterValueType = 'active' | 'all' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterValueType }


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: AppActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            /* return [{id: action.tlId, title: action.title, filter: 'all', addedDate: '', order: 0}, ...state]*/
            const newTodolist: TodolistDomainType = {...action.todolist, filter: 'all'}
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLIST':
            return action.todolists.map(tl => {
                return {...tl, filter: 'all'}
            })
        default:
            return state
    }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST', id: todolistId
    } as const
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST', todolist
    } as const
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE', id: id, title: title
    } as const
}
export const changeTodolistFilterAC = (filter: FilterValueType, id: string): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER', filter, id
    } as const
}
export const setTodolistAC = (todolists: Array<TodolistType>): SetTodolistActionType => {
    return {
        type: 'SET-TODOLIST', todolists
    } as const
}


export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistsApi.getTodolists()
            .then(res => {
                dispatch(setTodolistAC(res.data))

            })
    }
}
export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistsApi.deleteTodolist(todolistId)
            .then(res => {
                dispatch(removeTodolistAC(todolistId))

            })
    }
}
export const addTodolistsTC = (title: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistsApi.createTodolist(title)
            .then(res => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}
export const changeTodolistsTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistsApi.updateTodolist(id, title)
            .then(res => {
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}




