import React from 'react';
import {action} from '@storybook/addon-actions';
import {Tasks} from './Tasks';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';


export default {
    title: 'Tasks Component',
    component: Tasks
}
const removeTask = action('Task was removed ')
const changeTaskTitle = action('Task title was changed ')
const changeStatus = action('Task status was changed ')

export const TasksBaseExample = () => {
    return <div>
        <Tasks
            task={{id: '1', title: 'CSS',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'}}
            removeTask={removeTask}
            tlId={'tlId1'}
            changeTaskTitle={changeTaskTitle}
            changeStatus={changeStatus}
        />
        <Tasks
            task={{id: '2', title: 'Milk',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'}}
            removeTask={removeTask}
            tlId={'tlId2'}
            changeTaskTitle={changeTaskTitle}
            changeStatus={changeStatus}
        />
    </div>
}