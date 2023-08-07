const wishlist = (state = [], action) => {
    switch (action.type) {
      case 'SET_WISHLIST':
        console.log('In wishlist reducer, action.payload is:,', action.payload)
        return action.payload;
      default:
        return state;
    }
  };
  
  export default wishlist;