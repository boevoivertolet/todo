import React, {useReducer} from 'react';
import '../app/App.css';
import {Todolist} from '../features/TodolistsList/Todolist/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {AppBar, Button, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from '../features/TodolistsList/todolistsReducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from '../features/TodolistsList/tasksReducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/todolists-api';


type TasksStateType = {
    [key: string]: TaskType[]
}
type FilterValueType = 'active' | 'all' | 'completed'

const AppWithReducers = () => {

    let tlId1 = v1()
    let tlId2 = v1()

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: tlId1, title: 'what to learn', filter: 'all', addedDate: '', order: 0},
        {id: tlId2, title: 'what to buy', filter: 'all', addedDate: '', order: 0},

    ])

    const [tasks, dispatchTasks] = useReducer(tasksReducer, {
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
            },
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
        dispatchTasks(removeTaskAC(id, tlId))


    }

    const addTask = (title: string, tlId: string) => {
        // @ts-ignore
        dispatchTasks(addTaskAC(title, tlId))

    }
    const changeStatus = (id: string, status: TaskStatuses, tlId: string) => {
        dispatchTasks(changeTaskStatusAC(id, status, tlId))

    }
    const changeTaskTitle = (id: string, title: string, tlId: string) => {
        dispatchTasks(changeTaskTitleAC(id, title, tlId))

    }


    const changeFilter = (filter: FilterValueType, tlId: string) => {
        dispatchTodolists(changeTodolistFilterAC(filter, tlId))
    }
    const removeTodolist = (tlId: string) => {
        const action = removeTodolistAC(tlId)
        dispatchTasks(action)
        dispatchTodolists(action)
    }
    const changeTodoTitle = (title: string, tlId: string) => {
        dispatchTodolists(changeTodolistTitleAC(title, tlId))
    }


    const addTodo = (title: string) => {
        // @ts-ignore
        const action = addTodolistAC(title)
        dispatchTasks(action)
        dispatchTodolists(action)

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
                        return <Paper key={tl.id} elevation={3} className={'todo'}>
                            <Todolist
                                key={tl.id}
                                addTask={addTask}
                                removeTask={removeTask}
                                changeStatus={changeStatus}
                                changeTaskTitle={changeTaskTitle}
                                title={tl.title}
                                filter={tl.filter}
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





