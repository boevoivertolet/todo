import {tasksReducer} from './tasksReducer';
import {addTodolistAC, TodolistDomainType, todolistsReducer} from './todolistsReducer';
import {TasksStateType} from '../../app/App';



/*
test.skip('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.tlId)
    expect(idFromTodolists).toBe(action.tlId)
    expect(idFromTasks === idFromTodolists ).toBe(true)
})*/
