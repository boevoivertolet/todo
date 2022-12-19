import {TaskStatuses, TaskType, todolistsApi, UpdateTaskType} from '../../api/todolists-api';
import {TasksStateType} from '../../app/App';
import {AppActionsType, AppRootStateType, ThunkDispatchType} from '../../app/store';
import {Dispatch} from 'redux';
import {setErrorAC,  setStatusAC, SetStatusActionsType} from '../../app/appReducer';


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: AppActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.tlId]: state[action.tlId].filter(t => t.id !== action.tId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
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
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []};
        case 'REMOVE-TODOLIST':
            let stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy
        case 'SET-TODOLIST': {
            let stateCopy = {...state};
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = [];
            })
            return stateCopy
        }
        case 'SET-TASKS':
            return {...state, [action.tlId]: action.tasks}
        default:
            return state
    }
}

//actions
export const removeTaskAC = (tId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', tId, tlId: todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const changeTaskStatusAC = (tId: string, status: TaskStatuses, tlId: string) =>
    ({type: 'CHANGE-STATUS', tId, status, tlId} as const)
export const changeTaskTitleAC = (tId: string, title: string, tlId: string) =>
    ({type: 'CHANGE-TASK-TITLE', tId, title, tlId} as const)
export const setTasksAC = (tasks: Array<TaskType>, tlId: string) =>
    ({type: 'SET-TASKS', tasks, tlId} as const)


//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<AppActionsType | SetStatusActionsType>) => {
    dispatch(setStatusAC('loading'))
    todolistsApi.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
            dispatch(setStatusAC('succeeded'))
        })

}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<ThunkDispatchType>) => {
    dispatch(setStatusAC('loading'))
    todolistsApi.deleteTasks(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(setStatusAC('succeeded'))
            }
        }).catch((e) => {
        console.log(e.message)
    })

}
export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ThunkDispatchType>) => {
    dispatch(setStatusAC('loading'))
    todolistsApi.createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setStatusAC('succeeded'))
            } else {
                if (res.data.messages.length) {
                    dispatch(setErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setErrorAC('some error'))
                }
                dispatch(setStatusAC('failed'))
            }
        })
}
export const updateTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string,) =>
    (dispatch: Dispatch<ThunkDispatchType>, getState: () => AppRootStateType) => {
    dispatch(setStatusAC('loading'))
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            const model: UpdateTaskType = {
                title: task.title,
                status: status,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate,
                description: task.description

            }
            todolistsApi.updateTask(todolistId, taskId, model)
                .then((res) => {
                    dispatch(changeTaskStatusAC(taskId, status, todolistId))
                    dispatch(setStatusAC('succeeded'))
                })

        }

    }
export const updateTaskTitleTC = (taskId: string, title: string, todolistId: string,) =>
    (dispatch: Dispatch<ThunkDispatchType>, getState: () => AppRootStateType) => {
        dispatch(setStatusAC('loading'))
        const task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            const model: UpdateTaskType = {
                title: title,
                status: task.status,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate,
                description: task.description
            }
            todolistsApi.updateTask(todolistId, taskId, model)
                .then((res) => {
                    dispatch(changeTaskTitleAC(taskId, title, todolistId))
                    dispatch(setStatusAC('succeeded'))
                })

        }

    }
//types
export type TasksActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTasksAC>



