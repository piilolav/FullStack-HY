import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleFilterChange = (event) => {
        dispatch(filterChange(event.target.value))
    }

    const style = {
        marginBottom: 5
    }

    return (
        <div style ={style} >
            filter <input onChange={handleFilterChange} />
        </div>
    )
}

export default Filter