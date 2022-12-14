import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/store';
import {
    addTodolistsTC,
    changeTodolistFilterAC,
    changeTodolistsTitleTC,
    fetchTodolistsTC,
    FilterValueType,
    removeTodolistsTC,
    TodolistDomainType
} from './todolistsReducer';
import {addTaskTC, removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from './tasksReducer';
import {TaskStatuses} from '../../api/todolists-api';
import {Paper} from '@material-ui/core';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';
import {TasksStateType} from '../../app/App';
import {Navigate} from 'react-router-dom';

type TodolistsListPropsType = {
    demo?: boolean
}
export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo = false}) => {

    const dispatch = useAppDispatch()
    const todolists = useAppSelector<Array<TodolistDomainType>>((state) => state.todolists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)


    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
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

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
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
                        todolist={tl}
                        tasks={tasksForTodolist}
                        changeFilter={changeFilter}
                        removeTodolist={removeTodolist}
                        changeTodoTitle={changeTodoTitle}
                        demo={demo}
                    />
                </Paper>
            })
        }
    </>
}