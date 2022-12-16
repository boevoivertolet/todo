import React from 'react';
import './App.css';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskType} from '../api/todolists-api';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';


export type TasksStateType = {
    [key: string]: TaskType[]
}


export const App = () => {
    console.log('App is called')

    return (
        <div className="App">
            <AppBar position="static">
                <ErrorSnackbar/>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                <LinearProgress/>
            </AppBar>
            <div className="container">
                <TodolistsList/>
            </div>
        </div>
    );
}





