import { Select } from "../components/Select"

export default {
    title: 'Select component',
    component: Select
}

const elements = ['first', 'second', 'third'];

export const Wrapped = () => {
    return <Select elements={elements}/>
}

export const UnWrapped = () => {
    return <Select elements={elements}/>
}
