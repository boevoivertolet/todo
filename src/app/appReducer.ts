import {Dispatch} from 'redux';
import {RootAppActionsType, ThunkDispatchType} from './store';
import {authApi} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/Login/authReducer';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: RootAppActionsType): InitialStateType => {

    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}
//Action
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

// Thunk
export const InitializedAppTC = () => (dispatch: Dispatch<ThunkDispatchType>) => {
    authApi.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
        } else {

        }
        dispatch(setAppInitializedAC(true))
    })
}


export type AppActionsType =
    | SetErrorActionsType
    | SetStatusActionsType
    | setAppInitializedType

export type SetErrorActionsType = ReturnType<typeof setAppErrorAC>
export type SetStatusActionsType = ReturnType<typeof setAppStatusAC>
export type setAppInitializedType = | ReturnType<typeof setAppInitializedAC>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}


