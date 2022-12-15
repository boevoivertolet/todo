import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {AddItemForm} from './common/AddItemForm';
import {AppBar, Button, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistsTC,
    changeTodolistFilterAC,
    changeTodolistsTitleTC,
    fetchTodolistsTC,
    FilterValueType,
    removeTodolistsTC,
    TodolistDomainType,
} from './state/todolistsReducer/todolistsReducer';
import {addTaskTC, removeTaskTC, updateTaskStatusTC, updateTaskTitleTC,} from './state/tasksReducer/tasksReducer';

import {useAppDispatch, useAppSelector} from './state/store';
import {TaskStatuses, TaskType} from './api/todolists-api';


export type TasksStateType = {
    [key: string]: TaskType[]
}


export const AppWithRedux = () => {
    console.log('App is called')


    const dispatch = useAppDispatch()
    const todolists = useAppSelector<Array<TodolistDomainType>>((state) => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)


    useEffect(() => {
        dispatch(fetchTodolistsTC());
    }, [])


    const removeTask = useCallback((id: string, tlId: string) => {
        dispatch(removeTaskTC(tlId, id))
    }, [dispatch])
    const addTask = useCallback((title: string, tlId: string) => {
        dispatch(addTaskTC(tlId, title))
    }, [dispatch])
    const changeStatus = useCallback((id: string, status: TaskStatuses, tlId: string) => {
        dispatch(updateTaskStatusTC(id, status, tlId))
    }, [dispatch])
    const changeTaskTitle = useCallback((id: string, title: string, tlId: string) => {
        dispatch(updateTaskTitleTC(id, title, tlId))
    }, [dispatch])

    const changeTodoTitle = useCallback((title: string, tlId: string) => {
        dispatch(changeTodolistsTitleTC(tlId, title))
    }, [dispatch])
    const addTodo = useCallback((title: string) => {
        const action = addTodolistsTC(title)
        dispatch(action)
    }, [dispatch])
    const removeTodolist = useCallback((tlId: string) => {
        const action = removeTodolistsTC(tlId)
        dispatch(action)
    }, [dispatch])






    const changeFilter = useCallback((filter: FilterValueType, tlId: string) => {
        dispatch(changeTodolistFilterAC(filter, tlId))
    }, [dispatch])




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
                        let tasksForTodolist = tasks[tl.id];

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
                                tasks={tasksForTodolist}
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





