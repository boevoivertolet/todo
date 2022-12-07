import {v1} from 'uuid';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistActionType
} from '../todolistsReducer/todolistsReducer';
import {TaskPriorities, TaskStatuses} from '../../api/todolists-api';
import {TasksStateType} from '../../AppWithRedux';


type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.tlId]: state[action.tlId].filter(t => t.id !== action.tId)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.tlId]: state[action.tlId] = [{
                    id: v1(),
                    title: action.title,
                    status: TaskStatuses.New,
                    todoListId: action.tlId,
                    addedDate: '',
                    order: 0,
                    deadline: '',
                    description: '',
                    priority: TaskPriorities.Low,
                    startDate: ''

                }, ...state[action.tlId]]
            }
        case 'CHANGE-STATUS':
            return {
                ...state,
                [action.tlId]: state[action.tlId].map(t => t.id === action.tId ? {...t, status: action.status} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.tlId]: state[action.tlId].map(t => t.id === action.tId ? {...t, title: action.title} : t)
            }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.tlId] = [];
            return stateCopy
        }
        case 'REMOVE-TODOLIST': {
            let stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLIST': {
            let stateCopy = {...state};
            action.todolists.forEach(tl=>{
                stateCopy[tl.id]=[];
            })
            return stateCopy
        }
        default:
            return state
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
export const changeTaskStatusAC = (tId: string, status: TaskStatuses, tlId: string) => {
    return {
        type: 'CHANGE-STATUS', tId, status, tlId
    } as const
}
export const changeTaskTitleAC = (tId: string, title: string, tlId: string) => {
    return {
        type: 'CHANGE-TASK-TITLE', tId, title, tlId
    } as const
}
