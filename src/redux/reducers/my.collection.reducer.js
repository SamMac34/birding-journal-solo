const myCollection = (state = {}, action) => {
    switch (action.type) {
      case 'SET_MY_COLLECTION':
        console.log('action.payload is:', action.payload)
        return action.payload;
      default:
        return state;
    }
  };
  
  export default myCollection;