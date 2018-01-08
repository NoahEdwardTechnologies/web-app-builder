/* eslint-disable */
import React from 'react'

const CountdownTimer = ({ value, sagaAction }) =>
      <div>
        <div>Start Time <input type='time'/></div>
        <div>End Time <input type='time' /></div>
        <div>Time Remaining: {value}</div>

        <button onClick={() => sagaAction('START_COUNTDOWN')}>
          Start Countdown
        </button>
      </div>

export default CountdownTimer
