import React from 'react';
import './App.css';
import {Todolist} from './Todolist';

import {AddItemForm} from './AddItemForm';
import {AppBar, Button, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from './state/todolistsReducer/todolistsReducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from './state/tasksReducer/tasksReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type TodolistType = {
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

export const AppWithRedux = () => {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>((state) => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksType>((state) => state.tasks)


    const removeTask = (id: string, tlId: string) => {
        dispatch(removeTaskAC(id, tlId))


    }
    const addTask = (title: string, tlId: string) => {
        dispatch(addTaskAC(title, tlId))

    }
    const changeStatus = (id: string, isDone: boolean, tlId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, tlId))

    }
    const changeTaskTitle = (id: string, title: string, tlId: string) => {
        dispatch(changeTaskTitleAC(id, title, tlId))

    }


    const changeFilter = (filter: FilterValueType, tlId: string) => {
        dispatch(changeTodolistFilterAC(filter, tlId))
    }
    const removeTodolist = (tlId: string) => {
        const action = removeTodolistAC(tlId)
        dispatch(action)

    }
    const changeTodoTitle = (title: string, tlId: string) => {
        dispatch(changeTodolistTitleAC(title, tlId))
    }


    const addTodo = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
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





