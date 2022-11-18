import React, {ChangeEvent, MouseEvent} from 'react';
import {FilterValueType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';


type TodolistComponentPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, tlId: string) => void
    changeFilter: (filter: FilterValueType, tlId: string) => void
    addTask: (title: string, tlId: string) => void
    changeStatus: (id: string, isDone: boolean, tlId: string) => void
    filter: FilterValueType
    tlId: string
    removeTodolist: (tlId: string) => void
    changeTaskTitle: (id: string, title: string, tlId: string) => void
    changeTodoTitle: (title: string, tlId: string) => void
}

export const Todolist = (props: TodolistComponentPropsType) => {


    const tasks = props.tasks.map(t => {
        const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.tlId)
        }
        const onChangeTitleHandler = (title: string) => {
            props.changeTaskTitle(t.id, title, props.tlId)
        }
        const onRemoveHandler = () => props.removeTask(t.id, props.tlId)
        return <div className={t.isDone ? 'is-done' : ''} >
            <div className={'task'}  key={t.id}><Checkbox onChange={inputOnChangeHandler}
                                                                           inputProps={{'aria-label': 'primary checkbox'}}
                                                                           color="default"
                                                                           checked={t.isDone}/>
                <EditableSpan  title={t.title} onChange={onChangeTitleHandler}/>
                <IconButton  onClick={onRemoveHandler}><Delete/></IconButton>

            </div>
        </div>
    })

    const changeFilterAll = () => {
        props.changeFilter('all', props.tlId)
    }
    const changeFilterCompleted = () => {
        props.changeFilter('completed', props.tlId)
    }
    const changeFilterActive = () => {
        props.changeFilter('active', props.tlId)
    }
    const removeTodolist = (e: MouseEvent<HTMLButtonElement>) => {
        props.removeTodolist(props.tlId)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.tlId)
    }
    const onChangeTodoTitleHandler = (title: string) => {
        props.changeTodoTitle(title, props.tlId)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeTodoTitleHandler}/>
                <IconButton onClick={removeTodolist}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div className={'tasks'}>
                {tasks}
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
}

