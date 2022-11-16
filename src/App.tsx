import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = 'active' | 'all' | 'completed'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'React', isDone: false}
    ]);


    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id != id))
    }
    const changeFilter = (filter: FilterValueType, tlId: string) => {
        setTodolist(todolists.map(tl => tl.id === tlId ? {...tl, filter: filter} : tl))

    }
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([...tasks, newTask])
    }
    const changeStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: isDone} : t))
    }


    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: v1(), title: 'what to learn', filter: 'active'},
        {id: v1(), title: 'what to buy', filter: 'completed'}
    ])


    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let filteredTasks = tasks;
                    if (tl.filter === 'completed') {
                        filteredTasks = tasks.filter(t => t.isDone);
                    }
                    if (tl.filter === 'active') {
                        filteredTasks = tasks.filter(t => !t.isDone);
                    }


                    return <Todolist

                        title={tl.title}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        key={tl.id}
                        tlId={tl.id}
                    />
                })
            }

        </div>
    );
}

export default App;



