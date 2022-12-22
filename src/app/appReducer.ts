import {authApi, LoginParamsType} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {ThunkDispatchType} from './store';
import {handleServerAppError, handleServerNetworkError} from '../utils/errorUtils';
import {setIsLoggedInAC} from '../features/Login/authReducer';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    initialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {

    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
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

}







export type AppActionsType = SetErrorActionsType | SetStatusActionsType

export type SetErrorActionsType =ReturnType<typeof setAppErrorAC>
export type SetStatusActionsType =ReturnType<typeof setAppStatusAC>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    initialized: boolean
}


