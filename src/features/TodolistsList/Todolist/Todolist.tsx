import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Tasks} from './Tasks/Tasks';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {FilterValueType, TodolistDomainType} from '../todolistsReducer';
import {useAppDispatch} from '../../../app/store';
import {fetchTasksTC} from '../tasksReducer';


type TodolistComponentPropsType = {
    todolist: TodolistDomainType
    demo?: boolean
    changeFilter: (filter: FilterValueType, tlId: string) => void
    addTask: (title: string, tlId: string) => void
    removeTask: (id: string, tlId: string) => void
    tasks: Array<TaskType>
    changeStatus: (id: string, status: TaskStatuses, tlId: string) => void
    changeTaskTitle: (id: string, title: string, tlId: string) => void
    removeTodolist: (tlId: string) => void
    changeTodoTitle: (title: string, tlId: string) => void
}

export const Todolist = React.memo(({demo = false , ...props}: TodolistComponentPropsType) => {
    console.log('Todolist is called')
    // if (typeof props.demo === 'undefined') props.demo = false


    const dispatch = useAppDispatch()

    useEffect(() => {
        if(demo){
            return
        }
        console.log('render todolist')
        dispatch(fetchTasksTC(props.todolist.id));
    }, [])


    const changeFilterAll = useCallback(() => {
        props.changeFilter('all', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const changeFilterCompleted = useCallback(() => {
        props.changeFilter('completed', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const changeFilterActive = useCallback(() => {
        props.changeFilter('active', props.todolist.id)
    }, [props.changeFilter, props.todolist.id])
    const removeTodolist = useCallback(() => {
        props.removeTodolist(props.todolist.id)
    }, [props.removeTodolist, props.todolist.id])
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])
    const onChangeTodoTitleHandler = useCallback((title: string) => {
        props.changeTodoTitle(title, props.todolist.id)
    }, [props.changeTodoTitle, props.todolist.id])

    let filteredTasks = props.tasks

    if (props.todolist.filter === 'completed') {
        filteredTasks = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    if (props.todolist.filter === 'active') {
        filteredTasks = props.tasks.filter(t => t.status === TaskStatuses.New);
    }

    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} onChange={onChangeTodoTitleHandler}/>
                <IconButton onClick={removeTodolist} disabled={props.todolist.requestStatus === 'loading'}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.requestStatus === 'loading'}/>
            <div className={'tasks'}>
                {filteredTasks.map(t => <Tasks
                    key={t.id}
                    task={t}
                    removeTask={props.removeTask}
                    tlId={props.todolist.id}
                    changeTaskTitle={props.changeTaskTitle}
                    changeStatus={props.changeStatus}
                />)}

            </div>
            <div className={'buttonsBlock'}>
                <Button variant="contained" color={props.todolist.filter === 'all' ? 'primary' : 'default'}
                        onClick={changeFilterAll}>All</Button>
                <Button variant="contained" color={props.todolist.filter === 'active' ? 'primary' : 'default'}
                        onClick={changeFilterActive}>Active
                </Button>
                <Button variant="contained" color={props.todolist.filter === 'completed' ? 'primary' : 'default'}
                        onClick={changeFilterCompleted}>Completed
                </Button>
            </div>
        </div>
    )
})


