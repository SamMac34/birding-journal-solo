const birdToAdd = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ADD_BIRD':
          console.log('action.payload is:', action.payload)
          return action.payload;
        // case 'EDIT_ONCHANGE':
        //     return {
        //         ...state,
        //         [action.payload.property]: action.payload.value
        //     }
        default:
          return state;
      }
}

export default birdToAdd;