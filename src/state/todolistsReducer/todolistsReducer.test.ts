import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValueType,
    removeTodolistAC, setTodolistAC, TodolistDomainType,
    todolistsReducer
} from './todolistsReducer'
import {v1} from 'uuid'



/*let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> =[]*/

/*
beforeEach(() => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'what to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'what to buy', filter: 'all', addedDate: '', order: 0}
    ]
})
*/


test.skip('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: 'what to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'what to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test.skip('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: 'what to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'what to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].id).toBeDefined()
})
test.skip('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]


    const endState = todolistsReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistId2))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})
test.skip('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValueType = 'completed'

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: 'what to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'what to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC(newFilter, todolistId2))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
test.skip('todolists should be set to the state', () => {


    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistDomainType> = [
        {id: todolistId1, title: 'what to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'what to buy', filter: 'all', addedDate: '', order: 0}
    ]

    const action = setTodolistAC(startState)
    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)


})

