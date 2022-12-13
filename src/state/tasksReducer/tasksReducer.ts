
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistActionType
} from '../todolistsReducer/todolistsReducer';
import {TaskStatuses, TaskType, todolistsApi} from '../../api/todolists-api';
import {TasksStateType} from '../../AppWithRedux';
import {AppActionsType} from '../store';
import {Dispatch} from 'redux';


export type TasksActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTasksActionType


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: AppActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.tlId]: state[action.tlId].filter(t => t.id !== action.tId)}
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]:[action.task, ...state[action.task.todoListId]]

                /* ...state,
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

                 }, ...state[action.tlId]]*/
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
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = [];
            })
            return stateCopy
        }
        case 'SET-TASKS': {
            return {
                ...state,
                [action.tlId]: action.tasks
            }
        }
        default:
            return state
    }
}

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type SetTasksActionType = ReturnType<typeof setTasksAC>


export const removeTaskAC = (tId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK', tId: tId, tlId: todolistId
    } as const
}
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK', task
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
export const setTasksAC = (tasks: Array<TaskType>, tlId: string) => {
    return {
        type: 'SET-TASKS', tasks, tlId
    } as const
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistsApi.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch<AppActionsType>) => {
        todolistsApi.deleteTasks(todolistId, taskId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(taskId, todolistId))
                }
            }).catch((e) => {
            console.log(e.message)
        })
    }
}
export const addTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsApi.createTask(todolistId, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}


