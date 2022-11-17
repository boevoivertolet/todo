import React, {useState} from 'react';

type EditableSpanComponentPropsType = {
    title: string

}
export const EditableSpan = (props: EditableSpanComponentPropsType) => {
    const [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
      setEditMode(false)
    }

    return editMode
        ? <input onBlur={activateViewMode} autoFocus value={props.title}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>

}