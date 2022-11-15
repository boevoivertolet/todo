import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValueType = 'active' | 'all' | 'completed'

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'React', isDone: false}
    ]);

    const [filter, setFilter] = useState<FilterValueType>('all');
    let filteredTasks = tasks;
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone);
    }
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone);
    }


    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id != id))
    }
    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;



