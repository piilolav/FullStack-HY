import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

    const handleFilterChange = (event) => {
        props.filterChange(event.target.value)
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

export default connect(null, { filterChange })(Filter)