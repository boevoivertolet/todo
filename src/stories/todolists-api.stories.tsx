import React, {useEffect, useState} from 'react'
import {todolistsApi, UpdateTaskType} from '../api/todolists-api';

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
            .then((response) => {
                setState(response.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodolist('new todo')
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '0b773190-e99d-477b-a3e2-de779a994838'
        todolistsApi.deleteTodolist(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '6e62b74f-9918-4749-a450-856bfda5c09d'
        todolistsApi.updateTodolist(todolistId, 'new title')
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '5f1b215d-c13d-43f1-8762-49519aff9624'
        todolistsApi.getTasks(todolistId)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let tlId = '5f1b215d-c13d-43f1-8762-49519aff9624'
        let tId = '60ff7f7b-7677-4577-9786-734e8a0312eb'
        todolistsApi.deleteTasks(tlId, tId)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let tlId = '5f1b215d-c13d-43f1-8762-49519aff9624'
        let title = 'new title'
        todolistsApi.createTask(tlId, title)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
/*export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let tlId = '5f1b215d-c13d-43f1-8762-49519aff9624'
        let tId = '068f22f6-8ca3-4e39-914f-b3a5c918485f'
        let title = 'new title11111111111111111111111111111'
        todolistsApi.updateTask(tlId, tId, title)
            .then((response) => {
                setState(response.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}*/
