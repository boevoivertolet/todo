import React, {ChangeEvent, MouseEvent} from 'react';
import {FilterValueType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox} from '@material-ui/core';


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
        return <div className={'task'}> <li className={t.isDone ? 'is-done' : ''} key={t.id}><Checkbox onChange={inputOnChangeHandler} inputProps={{ 'aria-label': 'primary checkbox' }} color="default"
                                                                                 checked={t.isDone}/>
            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
            <Button variant="contained" onClick={onRemoveHandler}>x</Button>

        </li></div>
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
                <Button variant="contained" onClick={removeTodolist}>x</Button>
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul className={'tasks'}>
                {tasks}
            </ul>
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

