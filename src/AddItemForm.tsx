import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormComponentPropsType = {
    addItem: (title: string) => void

}
export const AddItemForm = (props: AddItemFormComponentPropsType) => {
    const [error, setError] = useState<string>('')

    const [title, setTitle] = useState<string>('')
    const setTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if (title.trim() === '') {
            setError('Field is required')
            return;
        }

        props.addItem(title)
        setTitle('')
    }
    const addTaskForEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Alt' ||  e.key === 'Backspace') {
            return
        }
        if (title.trim() === '') {
            setError('Field is required')
            return;
        }

        if (e.key === 'Enter') {
            props.addItem(title)
            setTitle('')
        }
    }

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={title}
                onChange={setTitleValue}
                onKeyDown={addTaskForEnter}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}