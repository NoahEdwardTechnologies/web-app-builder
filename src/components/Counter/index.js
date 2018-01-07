/* eslint-disable */
import React from 'react'

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) =>
      <div>
        <button onClick={onIncrementAsync}>
          Increment after 1 seconds
        </button>
        {' '}
        <button onClick={onIncrement}>
          Increments
        </button>
        {' '}
        <button onClick={onDecrement}>
          Decrement
        </button>
        <hr />
        <div>
          Clicked: {value} times
        </div>
      </div>

export default Counter
