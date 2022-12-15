import {todolistsApi, TodolistType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {AppActionsType} from '../store';


const initialState: Array<TodolistDomainType> = []


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: AppActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLIST':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
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


//thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch<AppActionsType>) => {
    todolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistAC(res.data))

        })

}
export const removeTodolistsTC = (todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsApi.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
        })
}
export const addTodolistsTC = (title: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsApi.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}
export const changeTodolistsTitleTC = (id: string, title: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsApi.updateTodolist(id, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(id, title))
        })
}

//types
export type FilterValueType = 'active' | 'all' | 'completed'
export type TodolistDomainType = TodolistType & { filter: FilterValueType }
export type TodolistsActionType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistAC>
