import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistRequestStatusAC,
    changeTodolistTitleAC, FilterValueType,
    removeTodolistAC, setTodolistAC, TodolistDomainType,
    todolistsReducer
} from './todolistsReducer'
import {v1} from 'uuid'
import {TodolistType} from '../../api/todolists-api';
import {RequestStatusType} from '../../app/appReducer';



let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType> =[]

beforeEach(() => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'what to learn', filter: 'all', addedDate: '', order: 0,requestStatus: 'idle'},
        {id: todolistId2, title: 'what to buy', filter: 'all', addedDate: '', order: 0,requestStatus: 'idle'}
    ]
})


test('correct todolist should be removed', () => {


    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be added', () => {


    let todolist: TodolistType ={
        title:'New Todolist',
        id: 'any id',
        addedDate: '',
        order: 0
    }


    const endState = todolistsReducer(startState, addTodolistAC(todolist))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(todolist.title)
    expect(endState[0].filter).toBe('all')
})
test('correct todolist should change its name', () => {


    let newTodolistTitle = 'New Todolist'



    const endState = todolistsReducer(startState, changeTodolistTitleAC(newTodolistTitle, todolistId2))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be changed', () => {


    let newFilter: FilterValueType = 'completed'



    const endState = todolistsReducer(startState, changeTodolistFilterAC(newFilter, todolistId2))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
test('todolists should be set to the state', () => {

    const action = setTodolistAC(startState)
    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)


})
test('correct request status of todolist should be changed', () => {

    let newStatus: RequestStatusType = 'loading'


    const endState = todolistsReducer(startState, changeTodolistRequestStatusAC(todolistId2,newStatus))

    expect(endState[0].requestStatus).toBe('idle')
    expect(endState[1].requestStatus).toBe(newStatus)
})
