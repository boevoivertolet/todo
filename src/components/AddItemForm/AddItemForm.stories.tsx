import React from 'react';
import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions';


export default {
    title: 'AddItemForm Component',
    component: AddItemForm,
}
const callback = action('Button was pressed inside the form')

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={callback}/>
}
export const AddItemFormDisabledExample = (props: any) => {
    return <AddItemForm addItem={callback} disabled = {true}/>
}