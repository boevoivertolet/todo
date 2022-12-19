import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@material-ui/core';


type AddItemFormComponentPropsType = {
    addItem: (title: string) => void
    disabled?: boolean

}
export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormComponentPropsType) => {

    console.log('AddItemForm is called')
    const [error, setError] = useState<string | null>('')

    const [title, setTitle] = useState<string>('')
    const setTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if (title.trim() === '') {
            setError('Field is required')
            return;
        }

        addItem(title)
        setTitle('')
    }
    const addTaskForEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Alt' || e.key === 'Backspace') {
            return
        }
        if (title.trim() === '') {
            setError('Field is required')
            return;
        }

        if (e.key === 'Enter') {
            addItem(title)
            setTitle('')

        }
    }

    return (
        <div className={'texField'}>
            <div className={'textField-button'}>
                <TextField
                    disabled={disabled}
                    id="standard-basic" label="add todo"
                    className={error ? 'error' : ''}
                    value={title}
                    onChange={setTitleValue}
                    onKeyDown={addTaskForEnter}
                />
                <Button disabled={disabled} variant="contained" color="primary" onClick={addTask}>+</Button>
            </div>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
})