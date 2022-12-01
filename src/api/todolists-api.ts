import axios from 'axios';


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'b9a47b16-0cbb-4fe2-8152-303706b5e3c1'
    }
}

export type TodolistType = {
    'id': string
    'title': string
    'addedDate': string
    'order': number
}

type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
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

const instance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        ...settings
    }
)


export const todolistsApi = {
    getTodolist() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<TodolistType>>('todo-lists', {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${id}`, settings)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${id}`, {title})
    },
    getTasks(tlId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${tlId}/tasks`, settings)
    }
}