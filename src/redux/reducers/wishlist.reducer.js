const wishlist = (state = [], action) => {
    switch (action.type) {
      case 'SET_WISHLIST':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default wishlist;