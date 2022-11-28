import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './common/AddItemForm';
import {AppBar, Button, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TasksType = {
    [key: string]: TaskType[]
}
type FilterValueType = 'active' | 'all' | 'completed'

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
    const addTask = (title: string, tlId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [tlId]: tasks[tlId] = [...tasks[tlId], task]})
    }
    const changeStatus = (id: string, isDone: boolean, tlId: string) => {
        setTasks({...tasks, [tlId]: tasks[tlId].map(t => t.id === id ? {...t, isDone: isDone} : t)})
    }
    const changeTaskTitle = (id: string, title: string, tlId: string) => {
        setTasks({...tasks, [tlId]: tasks[tlId].map(t => t.id === id ? {...t, title: title} : t)})
    }


    const changeFilter = (filter: FilterValueType, tlId: string) => {
        setTodolist(todolists.map(tl => tl.id === tlId ? {...tl, filter: filter} : tl))

    }

    const removeTodolist = (tlId: string) => {
        setTodolist(todolists.filter(tl => tl.id != tlId))
        delete tasks[tlId]
        setTasks({...tasks})
    }
    const addTodo = (title: string) => {
        let todo: TodolistType = {id: v1(), title: title, filter: 'all'}
        setTodolist([...todolists, todo])
        setTasks({...tasks, [todo.id]: []})
    }

    const changeTodoTitle = (title: string, tlId: string) => {
        setTodolist(todolists.map(tl => tl.id === tlId ? {...tl, title: title} : tl))
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <div className="container">
                <Paper elevation={3} className={'addItem'}><AddItemForm addItem={addTodo}/></Paper>

                {
                    todolists.map(tl => {
                        let filteredTasks = tasks[tl.id];
                        if (tl.filter === 'completed') {
                            filteredTasks = filteredTasks.filter(t => t.isDone);
                        }
                        if (tl.filter === 'active') {
                            filteredTasks = filteredTasks.filter(t => !t.isDone);
                        }
                        return <Paper elevation={3} className={'todo'}>
                            <Todolist
                                addTask={addTask}
                                removeTask={removeTask}
                                changeStatus={changeStatus}
                                changeTaskTitle={changeTaskTitle}
                                title={tl.title}
                                filter={tl.filter}
                                key={tl.id}
                                tlId={tl.id}
                                tasks={filteredTasks}
                                changeFilter={changeFilter}
                                removeTodolist={removeTodolist}
                                changeTodoTitle={changeTodoTitle}
                            />
                        </Paper>
                    })
                }
            </div>
        </div>
    );
}

export default App;



