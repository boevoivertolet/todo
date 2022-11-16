import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from './App';


type TodolistComponentPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
}

export const Todolist = (props: TodolistComponentPropsType) => {
    const [title, setTitle] = useState<string>('')
    const setTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    const tasks = props.tasks.map(t => {
        const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked)
        }

        const onRemoveHandler = () => props.removeTask(t.id)
        return <li key={t.id}><input onChange={inputOnChangeHandler} type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={onRemoveHandler}>x</button>
        </li>
    })
    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const addTaskForEnter = (e: KeyboardEvent<HTMLInputElement>) => {
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
                    value={title}
                    onChange={setTitleValue}
                    onKeyDown={addTaskForEnter}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button onClick={changeFilterAll}>All</button>
                <button onClick={changeFilterActive}>Active</button>
                <button onClick={changeFilterCompleted}>Completed</button>
            </div>
        </div>
    )
}