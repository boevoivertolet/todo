import React, {useState} from 'react';
import '../app/App.css';
import {Todolist} from '../features/TodolistsList/Todolist/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {AppBar, Button, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/todolists-api';
import {FilterValueType, TodolistDomainType} from '../features/TodolistsList/todolistsReducer';


type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    let tlId1 = v1()
    let tlId2 = v1()


    let [todolists, setTodolist] = useState<Array<TodolistDomainType>>([
        {id: tlId1, title: 'what to learn', filter: 'all', addedDate: '', order: 0},
        {id: tlId2, title: 'what to buy', filter: 'all', addedDate: '', order: 0},

    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [tlId1]: [
            {
                id: v1(),
                title: 'CSS',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: tlId1
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: tlId1
            },
            {
                id: v1(),
                title: 'React',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: tlId1
            }
        ],
        [tlId2]: [
            {
                id: v1(),
                title: 'Milk',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: tlId2
            },
            {
                id: v1(),
                title: 'Bread',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: tlId2
            },
            {
                id: v1(),
                title: 'Potato',
                status: TaskStatuses.Completed,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: tlId2
            }
        ]

    });
    const removeTask = (id: string, tlId: string) => {
        setTasks({...tasks, [tlId]: tasks[tlId].filter(t => t.id != id)})

    }
    const addTask = (title: string, tlId: string) => {
        let task = {
            id: v1(), title: title, status: TaskStatuses.New,
            addedDate: '',
            order: 0,
            deadline: '',
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            todoListId: tlId
        }
        setTasks({...tasks, [tlId]: tasks[tlId] = [...tasks[tlId], task]})
    }
    const changeStatus = (id: string, status: TaskStatuses, tlId: string) => {
        setTasks({...tasks, [tlId]: tasks[tlId].map(t => t.id === id ? {...t, status: status} : t)})
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
        let todo: TodolistDomainType = {id: v1(), title: title, filter: 'all', addedDate: '', order: 0}
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
                            filteredTasks = filteredTasks.filter(t => t.status === TaskStatuses.Completed);
                        }
                        if (tl.filter === 'active') {
                            filteredTasks = filteredTasks.filter(t => t.status === TaskStatuses.New);
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



