import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TasksType, TaskType} from './App';


type TodolistComponentPropsType = {
    title: string
    tasks: TasksType
    removeTask: (id: string, tlId: string) => void
    changeFilter: (filter: FilterValueType, tlId: string) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
    tlId: string
}

export const Todolist = (props: TodolistComponentPropsType) => {
    const [error, setError] = useState<string>('')

    const [title, setTitle] = useState<string>('')
    const setTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitle(e.currentTarget.value)
    }


    const tasks = props.tasks[props.tlId].map(t => {
        const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked)
        }
        const onRemoveHandler = () => props.removeTask(t.id, props.tlId)
        return <li className={t.isDone ? 'is-done' : ''} key={t.id}><input onChange={inputOnChangeHandler}
                                                                           type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={onRemoveHandler}>x</button>

        </li>
    })
    const addTask = () => {
        if (title.trim() === '') {
            setError('Field is required')
            return;
        }

        props.addTask(title)
        setTitle('')
    }
    const addTaskForEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (title.trim() === '') {
            setError('Field is required')
            return;
        }

        if (e.key === 'Enter') {
            props.addTask(title)
            setTitle('')
        }
    }
    const changeFilterAll = () => {
        props.changeFilter('all', props.tlId)
    }
    const changeFilterCompleted = () => {
        props.changeFilter('completed', props.tlId)
    }
    const changeFilterActive = () => {
        props.changeFilter('active', props.tlId)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={setTitleValue}
                    onKeyDown={addTaskForEnter}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={changeFilterAll}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={changeFilterActive}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={changeFilterCompleted}>Completed
                </button>
            </div>
        </div>
    )
}