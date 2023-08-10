const birdToAdd = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ADD_BIRD':
          console.log('action.payload is:', action.payload)
          return action.payload;
        case 'CLEAR_ADD_BIRD':
            return state = {};
        default:
          return state;
      }
}

export default birdToAdd;