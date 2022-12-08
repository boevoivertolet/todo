import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasksReducer'
import {addTodolistAC, removeTodolistAC, setTodolistAC} from '../todolistsReducer/todolistsReducer';
import {TasksStateType} from '../../AppWithRedux';
import {TaskPriorities, TaskStatuses} from '../../api/todolists-api';


test.skip('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            }
        ]
    }

    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New},
            {id: '2', title: 'JS', status: TaskStatuses.Completed},
            {id: '3', title: 'React', status: TaskStatuses.New}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New},
            {id: '3', title: 'tea', status: TaskStatuses.New}
        ]
    })
})
test.skip('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            }
        ]
    }

    const action = addTaskAC('juce', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})
test.skip('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            }
        ]
    }

    const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2')

    const endState: TasksStateType = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
    expect(endState['todolistId2'][2].status).toBe(TaskStatuses.New)
    expect(endState['todolistId2'][0].title).toBe('bread')
    expect(endState['todolistId2'][1].title).toBe('milk')
    expect(endState['todolistId2'][2].title).toBe('tea')
    expect(endState['todolistId1'][0].title).toBe('CSS')
    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId1'][2].title).toBe('React')
    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'].length).toBe(3)
})

test.skip('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            }
        ]
    }

    const action = changeTaskTitleAC('2', 'Coca-cola', 'todolistId2')

    const endState: TasksStateType = tasksReducer(startState, action)

    expect(endState['todolistId2'][0].title).toBe('bread')
    expect(endState['todolistId2'][1].title).toBe('Coca-cola')
    expect(endState['todolistId2'][2].title).toBe('tea')

    expect(endState['todolistId2'].length).toBe(3)
    expect(endState['todolistId1'].length).toBe(3)
})

test.skip('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            }
        ]
    }

    const action = addTodolistAC('new todolist')
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test.skip('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId1'
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'tlId2'
            }
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
test.skip('empty arrays should be added when we set todolists', () => {


    const action = setTodolistAC([
        {id: '1', title: 'title 1', order: 0, addedDate: ''},
        {id: '2', title: 'title 2', order: 0, addedDate: ''}
    ])



    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])

})


