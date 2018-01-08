/* eslint-disable */
import React from 'react'

const Counter = ({ value, sagaAction }) =>
      <div>
        <button onClick={() => sagaAction('INCREMENT_ASYNC')}>
          Increment after 1 seconds
        </button>
        {' '}
        <button onClick={() => sagaAction('INCREMENT')}>
          Increments
        </button>
        {' '}
        <button onClick={() => sagaAction('DECREMENT')}>
          Decrement
        </button>
        <div>
          Clicked: {value} times
        </div>
      </div>

export default Counter
