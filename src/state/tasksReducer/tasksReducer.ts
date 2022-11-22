import {TasksType} from '../../App';
import {v1} from 'uuid';

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType


export const tasksReducer = (state: TasksType, action: ActionType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.tlId]: state[action.tlId].filter(t => t.id != action.tId)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.tlId]: state[action.tlId] = [{
                    id: v1(),
                    title: action.title,
                    isDone: false
                }, ...state[action.tlId]]
            }
        case 'CHANGE-STATUS':
            return {
                ...state,
                [action.tlId]: state[action.tlId].map(t => t.id === action.tId ? {...t, isDone: action.isDone} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.tlId]: state[action.tlId].map(t => t.id === action.tId ? {...t, title: action.title} : t)
            }
        default:
            throw new Error('I don\'t understand this type')
    }
}

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>


export const removeTaskAC = (tId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK', tId: tId, tlId: todolistId
    } as const
}
export const addTaskAC = (title: string, tlId: string) => {
    return {
        type: 'ADD-TASK', title: title, tlId: tlId
    } as const
}
export const changeTaskStatusAC = (tId: string, isDone: boolean, tlId: string) => {
    return {
        type: 'CHANGE-STATUS', tId, isDone, tlId
    } as const
}
export const changeTaskTitleAC = (tId: string, title: string, tlId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE', tId, title, tlId
    } as const
}
