const birdReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_BIRDS':
        console.log('action.payload is:', action.payload)
        return action.payload;
      default:
        return state;
    }
  };
  
  export default birdReducer;