/* eslint-disable */
import React, { Component, PropTypes } from 'react'

const Counter = ({ value, onIncrement, onDecrement }) =>
      <div>
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
