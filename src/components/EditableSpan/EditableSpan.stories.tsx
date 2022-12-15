import React from 'react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from './EditableSpan';




export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}
const onChange = action('title changed to:')

export const EditableSpanBaseExample = () => {
    return <div>
        <EditableSpan title={'start title'} onChange={onChange}/>
    </div>
}