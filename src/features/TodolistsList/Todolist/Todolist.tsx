import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Tasks} from './Tasks/Tasks';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {FilterValueType} from '../todolistsReducer';
import {useAppDispatch} from '../../../app/store';
import {fetchTasksTC} from '../tasksReducer';


type TodolistComponentPropsType = {
    demo?: boolean
    title: string
    filter: FilterValueType
    changeFilter: (filter: FilterValueType, tlId: string) => void
    addTask: (title: string, tlId: string) => void
    removeTask: (id: string, tlId: string) => void
    tasks: Array<TaskType>
    changeStatus: (id: string, status: TaskStatuses, tlId: string) => void
    changeTaskTitle: (id: string, title: string, tlId: string) => void
    tlId: string
    removeTodolist: (tlId: string) => void
    changeTodoTitle: (title: string, tlId: string) => void
}

export const Todolist = React.memo(({demo = false , ...props}: TodolistComponentPropsType) => {
    console.log('Todolist is called')
    // if (typeof props.demo === 'undefined') props.demo = false


    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log('render todolist')
        dispatch(fetchTasksTC(props.tlId));
    }, [])


    const changeFilterAll = useCallback(() => {
        props.changeFilter('all', props.tlId)
    }, [props.changeFilter, props.tlId])
    const changeFilterCompleted = useCallback(() => {
        props.changeFilter('completed', props.tlId)
    }, [props.changeFilter, props.tlId])
    const changeFilterActive = useCallback(() => {
        props.changeFilter('active', props.tlId)
    }, [props.changeFilter, props.tlId])
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.tlId)
    }, [props.removeTodolist, props.tlId])
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.tlId)
    }, [props.addTask, props.tlId])
    const onChangeTodoTitleHandler = useCallback((title: string) => {
        props.changeTodoTitle(title, props.tlId)
    }, [props.changeTodoTitle, props.tlId])

    let filteredTasks = props.tasks

    if (props.filter === 'completed') {
        filteredTasks = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    if (props.filter === 'active') {
        filteredTasks = props.tasks.filter(t => t.status === TaskStatuses.New);
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeTodoTitleHandler}/>
                <IconButton onClick={removeTodolist}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div className={'tasks'}>
                {filteredTasks.map(t => <Tasks
                    key={t.id}
                    task={t}
                    removeTask={props.removeTask}
                    tlId={props.tlId}
                    changeTaskTitle={props.changeTaskTitle}
                    changeStatus={props.changeStatus}
                />)}

            </div>
            <div className={'buttonsBlock'}>
                <Button variant="contained" color={props.filter === 'all' ? 'primary' : 'default'}
                        onClick={changeFilterAll}>All</Button>
                <Button variant="contained" color={props.filter === 'active' ? 'primary' : 'default'}
                        onClick={changeFilterActive}>Active
                </Button>
                <Button variant="contained" color={props.filter === 'completed' ? 'primary' : 'default'}
                        onClick={changeFilterCompleted}>Completed
                </Button>
            </div>
        </div>
    )
})


