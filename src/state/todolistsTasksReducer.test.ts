import {tasksReducer} from './tasksReducer/tasksReducer';
import {addTodolistAC, todolistsReducer} from './todolistsReducer/todolistsReducer';
import {TasksType, TodolistType} from '../AppWithRedux';



test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.tlId)
    expect(idFromTodolists).toBe(action.tlId)
    expect(idFromTasks === idFromTodolists ).toBe(true)
})