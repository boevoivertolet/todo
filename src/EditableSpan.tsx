import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanComponentPropsType = {
    title: string
    onChange: (title: string) => void

}
export const EditableSpan = (props: EditableSpanComponentPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onKeyDownActivateViewMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (title.trim() === '') {
            return
        }
        if (e.key === 'Enter') {
            setEditMode(false)
            props.onChange(title)
        }
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ?
        <input onKeyDown={onKeyDownActivateViewMode} onBlur={activateViewMode} onChange={onChangeTitleHandler} autoFocus
               value={title}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>

}