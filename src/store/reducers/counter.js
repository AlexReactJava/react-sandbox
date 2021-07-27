export default (state = {}, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return {
          ...state,
          counter: {
            ...state.counter,
            value: state.counter.value + 1
          }
        }
        case 'RANDOM':
        return {
          ...state,
          counter: {
            ...state.counter,
            value: Math.round(Math.random()*100)
          }
        }
      case 'DECREMENT':
        return {
          ...state,
          counter: {
            ...state.counter,
            value: state.counter.value - 1
          }
        }
      case 'NOTE_ADD':
        return {
          ...state,
          notes: [
            ...state.notes,
            {
              id: state.notes.length + 1,
              text: action.text,
              completed: false
            }
          ]
        }
      default:
        return state
    }
  }