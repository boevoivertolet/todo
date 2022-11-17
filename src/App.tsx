import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';

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


    let [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: tlId1, title: 'what to learn', filter: 'all'}

    ])

    const [tasks, setTasks] = useState<TasksType>({
        [tlId1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ]

    });


    const removeTask = (id: string, tlId: string) => {
        setTasks({...tasks, [tlId]: tasks[tlId].filter(t => t.id != id)})

    }
    const changeFilter = (filter: FilterValueType, tlId: string) => {
        setTodolist(todolists.map(tl => tl.id === tlId ? {...tl, filter: filter} : tl))

    }
    const addTask = (title: string, tlId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [tlId]: tasks[tlId] = [...tasks[tlId], task]})
    }
    const changeStatus = (id: string, isDone: boolean, tlId: string) => {
        setTasks({...tasks, [tlId]: tasks[tlId].map(t => t.id === id ? {...t, isDone: isDone} : t)})
    }
    const removeTodolist = (tlId: string) => {
        setTodolist(todolists.filter(tl => tl.id != tlId))
        delete tasks[tlId]
        setTasks({...tasks})
    }
    const addTodo = (title: string) => {
        let todo: TodolistType = {id: v1(), title: title, filter: 'all'}
        setTodolist([todo, ...todolists])
        setTasks({...tasks, [todo.id]: []})
    }
    const changeTaskTitle = (id: string, title: string, tlId: string) => {
        setTasks({...tasks, [tlId]: tasks[tlId].map(t => t.id === id ? {...t, title: title} : t)})
    }
    const changeTodoTitle = (title: string, tlId: string) => {
        setTodolist(todolists.map(tl => tl.id === tlId ? {...tl, title: title} : tl))
    }


    return (
        <div className="App">
            <div className="container">
                <div className={'addItem'}><AddItemForm addItem={addTodo}/></div>

                {
                    todolists.map(tl => {
                        let filteredTasks = tasks[tl.id];
                        if (tl.filter === 'completed') {
                            filteredTasks = filteredTasks.filter(t => t.isDone);
                        }
                        if (tl.filter === 'active') {
                            filteredTasks = filteredTasks.filter(t => !t.isDone);
                        }


                        return <div className={'todo'}>
                            <Todolist
                                addTask={addTask}
                                title={tl.title}
                                tasks={filteredTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                changeStatus={changeStatus}
                                filter={tl.filter}
                                key={tl.id}
                                tlId={tl.id}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodoTitle={changeTodoTitle}
                            />
                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default App;



