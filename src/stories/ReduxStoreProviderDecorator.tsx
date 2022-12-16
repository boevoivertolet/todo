import {tasksReducer} from '../features/TodolistsList/tasksReducer';
import React from 'react'
import { Provider } from 'react-redux'
import {combineReducers,  legacy_createStore} from 'redux'
import { v1 } from 'uuid'
import {todolistsReducer} from '../features/TodolistsList/todolistsReducer';
import {AppRootStateType} from '../app/store';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';


/*
import {Provider} from 'react-redux';
import {store} from '../state/store';



export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={store}>{storyFn()}</Provider>
}*/

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'tlId1', title: 'what to learn', filter: 'all', addedDate: '', order: 0},
        {id: 'tlId2', title: 'what to buy', filter: 'all', addedDate: '', order: 0}
    ],
    tasks: {
        ['tlId1']: [
            {
                id: v1(),
                title: 'CSS',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            },
            {
                id: v1(),
                title: 'React',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            }
        ],
        ['tlId2']: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            },
            {
                id: v1(),
                title: 'Bread',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            },
            {
                id: v1(),
                title: 'Potato',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            }
        ]
    },
    app: {
        status: 'idle' ,
        error: null
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>{storyFn()}</Provider>)