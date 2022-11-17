import React, {ChangeEvent, MouseEvent} from 'react';
import {FilterValueType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';


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
    /* const [error, setError] = useState<string>('')
     const [title, setTitle] = useState<string>('')
     const setTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
         setError('')
         setTitle(e.currentTarget.value)
     }*/
    /* const addTask = () => {
            if (title.trim() === '') {
                setError('Field is required')
                return;
            }

            props.addTask(title, props.tlId)
            setTitle('')
        }
        const addTaskForEnter = (e: KeyboardEvent<HTMLInputElement>) => {
            if (title.trim() === '') {
                setError('Field is required')
                return;
            }

            if (e.key === 'Enter') {
                props.addTask(title, props.tlId)
                setTitle('')
            }
        }*/

    const tasks = props.tasks.map(t => {
        const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.tlId)
        }
        const onChangeTitleHandler = (title: string) => {
            props.changeTaskTitle(t.id, title, props.tlId)
        }
        const onRemoveHandler = () => props.removeTask(t.id, props.tlId)
        return <li className={t.isDone ? 'is-done' : ''} key={t.id}><input onChange={inputOnChangeHandler}
                                                                           type="checkbox" checked={t.isDone}/>
            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
            <button onClick={onRemoveHandler}>x</button>

        </li>
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
                <button onClick={removeTodolist}>x</button>
            </h3>
            {/* <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={setTitleValue}
                    onKeyDown={addTaskForEnter}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>*/}
            <AddItemForm addItem={addTask}/>
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

