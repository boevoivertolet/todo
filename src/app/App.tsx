import React from 'react';
import './App.css';
import {AppBar, Button, CircularProgress, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskType} from '../api/todolists-api';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppSelector} from './store';
import {RequestStatusType} from './appReducer';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {Simulate} from 'react-dom/test-utils';
import progress = Simulate.progress;




export type TasksStateType = {
    [key: string]: TaskType[]
}

type AppPropsType ={
    demo?: boolean
}

export const App: React.FC<AppPropsType> = ({demo = false}) => {


    // const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const status = useAppSelector(state => state.app.status)
    const initialized = useAppSelector(state => state.app.initialized)

    if(!initialized){
        return <div style={{position:'fixed', textAlign:'center',top: '30%', width: '100%'}}><CircularProgress/></div>
    }


    console.log('App is called')

    return (
        <BrowserRouter>
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
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <div className="container">
                    <Routes>
                        <Route  path='/' element={<TodolistsList demo={demo}/>}/>
                        <Route  path='/login' element={<Login/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>

    );
}





