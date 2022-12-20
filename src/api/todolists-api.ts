import axios from 'axios';

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'b9a47b16-0cbb-4fe2-8152-303706b5e3c1'
    }
}
const instance = axios.create({baseURL: 'https://social-network.samuraijs.com/api/1.1/', ...settings})

//api
export const todolistsApi = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`, settings)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, {title})
    },
    getTasks(tlId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${tlId}/tasks`, settings)
    },
    deleteTasks(tlId: string, tId: string) {
        return instance.delete<ResponseType>(`todo-lists/${tlId}/tasks/${tId}`, settings)
    },
    createTask(tlId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${tlId}/tasks`, {title})
    },
    updateTask(tlId: string, tId: string, model: UpdateTaskType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${tlId}/tasks/${tId}`, model)
    }
}

//types

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export enum TaskStatuses {
    New = 0,
    inProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}