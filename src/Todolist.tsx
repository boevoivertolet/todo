import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from './App';


type TodolistComponentPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
}

export const Todolist = (props: TodolistComponentPropsType) => {
    const [error, setError] = useState<string>('')

    const [title, setTitle] = useState<string>('')
    const setTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitle(e.currentTarget.value)
    }


    const tasks = props.tasks.map(t => {
        const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked)
        }
        const onRemoveHandler = () => props.removeTask(t.id)
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
        props.changeFilter('all')
    }
    const changeFilterCompleted = () => {
        props.changeFilter('completed')
    }
    const changeFilterActive = () => {
        props.changeFilter('active')
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