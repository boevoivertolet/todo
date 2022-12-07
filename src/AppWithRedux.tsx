import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {AddItemForm} from './common/AddItemForm';
import {AppBar, Button, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValueType,
    removeTodolistAC, setTodolistAC, TodolistDomainType,
} from './state/todolistsReducer/todolistsReducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from './state/tasksReducer/tasksReducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskStatuses, TaskType, todolistsApi} from './api/todolists-api';


export type TasksStateType = {
    [key: string]: TaskType[]
}


export const AppWithRedux = () => {
    console.log('App is called')

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>((state) => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    useEffect(() => {
        todolistsApi.getTodolist()
            .then(res => {
                dispatch(setTodolistAC(res.data))
            })
    }, [])


    const removeTask = useCallback((id: string, tlId: string) => {
        dispatch(removeTaskAC(id, tlId))
    }, [dispatch])
    const addTask = useCallback((title: string, tlId: string) => {
        dispatch(addTaskAC(title, tlId))
    }, [dispatch])
    const changeStatus = useCallback((id: string, status: TaskStatuses, tlId: string) => {
        dispatch(changeTaskStatusAC(id, status, tlId))
    }, [dispatch])
    const changeTaskTitle = useCallback((id: string, title: string, tlId: string) => {
        dispatch(changeTaskTitleAC(id, title, tlId))
    }, [dispatch])
    const changeFilter = useCallback((filter: FilterValueType, tlId: string) => {
        dispatch(changeTodolistFilterAC(filter, tlId))
    }, [dispatch])
    const removeTodolist = useCallback((tlId: string) => {
        const action = removeTodolistAC(tlId)
        dispatch(action)
    }, [dispatch])
    const changeTodoTitle = useCallback((title: string, tlId: string) => {
        dispatch(changeTodolistTitleAC(title, tlId))
    }, [dispatch])
    const addTodo = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
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





