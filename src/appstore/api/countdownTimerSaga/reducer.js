/* eslint-disable */
export default function countdownTimerSaga (state = false, action) {
  switch (action.type) {
    case 'COUNTDOWN_TIMER_STATUS':
      return !state;
    default:
      return state;
  }
}
