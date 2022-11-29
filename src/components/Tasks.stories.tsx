import React from 'react';
import {action} from '@storybook/addon-actions';
import {Tasks} from './Tasks';


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
            task={{id: '1', isDone: true, title: 'CSS'}}
            removeTask={removeTask}
            tlId={'tlId1'}
            changeTaskTitle={changeTaskTitle}
            changeStatus={changeStatus}
        />
        <Tasks
            task={{id: '2', isDone: false, title: 'JS'}}
            removeTask={removeTask}
            tlId={'tlId2'}
            changeTaskTitle={changeTaskTitle}
            changeStatus={changeStatus}
        />
    </div>
}