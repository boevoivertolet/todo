import {v1} from 'uuid';
import {TodolistType} from '../../api/todolists-api';

type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    tlId: string
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

export type FilterValueType = 'active' | 'all' | 'completed'

const initialState: Array<TodolistDomainType> = []

export type TodolistDomainType = TodolistType & { filter: FilterValueType }


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.tlId, title: action.title, filter: 'all', addedDate: '', order: 0}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return state
    }
}


export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST', id: todolistId
    } as const
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST', title: title, tlId: v1()
    } as const
}
export const changeTodolistTitleAC = (title: string, id: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE', id: id, title: title
    } as const
}
export const changeTodolistFilterAC = (filter: FilterValueType, id: string): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER', filter, id
    } as const
}
