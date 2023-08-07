const collection = (state = [], action) => {
    switch (action.type) {
      case 'SET_COLLECTION':
        // console.log('action.payload is:', action.payload)
        return action.payload;
        // case 'ADD_TO_WISHLIST':
        //   return [...state, action.payload];
      default:
        return state;
    }
  };
  
  export default collection;