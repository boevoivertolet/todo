import {setAppErrorAC, setAppStatusAC, SetErrorActionsType, SetStatusActionsType} from '../app/appReducer';
import {ResponseType} from '../api/todolists-api';
import {Dispatch} from 'redux';


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetErrorActionsType | SetStatusActionsType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}
export const handleServerNetworkError = <D>(error: any, dispatch: Dispatch<SetErrorActionsType | SetStatusActionsType>) => {
    dispatch(setAppErrorAC(error.message? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}