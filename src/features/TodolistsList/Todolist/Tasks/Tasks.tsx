import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from '../../../../api/todolists-api';

type TasksPropsType = {
    removeTask: (id: string, tlId: string) => void
    task: TaskType
    changeStatus: (id: string, status: TaskStatuses, tlId: string) => void
    changeTaskTitle: (id: string, title: string, tlId: string) => void
    tlId: string
}

export const Tasks = React.memo((props: TasksPropsType) => {
    const inputOnChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {

        props.changeStatus(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.tlId)
    }, [props.changeStatus, props.task.id, props.tlId])

    const onChangeTitleHandler = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title, props.tlId)
    }, [props.changeTaskTitle, props.task.id, props.tlId])

    const onRemoveHandler = useCallback(() => props.removeTask(props.task.id, props.tlId), [props.removeTask, props.task.id, props.tlId])


    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <div className={'task'}><Checkbox onChange={inputOnChangeHandler}
                                          inputProps={{'aria-label': 'primary checkbox'}}
                                          color="default"
                                          checked={props.task.status === TaskStatuses.Completed}/>
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveHandler}><Delete/></IconButton>
        </div>
    </div>

})