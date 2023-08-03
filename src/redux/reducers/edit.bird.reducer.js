const birdToEdit = (state=[], action) => {
    switch (action.type) {
        case 'SET_EDIT_BIRD':
          console.log('action.payload is:', action.payload)
          return action.payload;
        case 'EDIT_ONCHANGE':
            return {
                ...state,
                [action.payload.property]: action.payload.value
            }
        default:
          return state;
      }
    return state;
}

export default birdToEdit;