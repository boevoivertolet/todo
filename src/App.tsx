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
export type TasksType = {
    [key: string]: TaskType[]
}
export type FilterValueType = 'active' | 'all' | 'completed'

function App() {

    let tlId1 = v1()
    let tlId2 = v1()

    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: tlId1, title: 'what to learn', filter: 'active'},
        {id: tlId2, title: 'what to buy', filter: 'completed'}
    ])


    const [tasks, setTasks] = useState<TasksType>({
        [tlId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        [tlId2]: [
            {id: v1(), title: 'book', isDone: true},
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'apple', isDone: false}
        ]
    });


    const removeTask = (id: string, tlId: string) => {
        /*let arrTasks = tasks[tlId];
        tasks[tlId] = arrTasks.filter(t => t.id !== id);
        setTasks({...tasks});*/
        setTasks({...tasks, [tlId]: tasks[tlId].filter(t => t.id != id)})

    }
    const changeFilter = (filter: FilterValueType, tlId: string) => {
        setTodolist(todolists.map(tl => tl.id === tlId ? {...tl, filter: filter} : tl))

    }
    const addTask = (title: string, tlId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let arrTasks = tasks[tlId];
        let newTask = [task, ...arrTasks]
        tasks[tlId] = newTask
        setTasks({...tasks})
    }
    const changeStatus = (id: string, isDone: boolean, tlId: string) => {
        setTasks({...tasks, [tlId]: tasks[tlId].map(t => t.id === id ? {...t, isDone: isDone} : t)})
    }
    const removeTodolist = (tlId: string) => {
        setTodolist(todolists.filter(tl => tl.id != tlId))
        delete tasks[tlId]
        setTasks({...tasks})
    }


    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let filteredTasks = tasks[tl.id];
                    if (tl.filter === 'completed') {
                        filteredTasks = filteredTasks.filter(t => t.isDone);
                    }
                    if (tl.filter === 'active') {
                        filteredTasks = filteredTasks.filter(t => !t.isDone);
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
                        removeTodolist={removeTodolist}
                    />
                })
            }

        </div>
    );
}

export default App;



