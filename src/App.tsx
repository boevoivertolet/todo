import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';


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

    const [filter, setFilter] = useState<FilterValueType>('all');
    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone);
    }
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone);
    }


    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id != id))
    }
    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([...tasks, newTask])


    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;



