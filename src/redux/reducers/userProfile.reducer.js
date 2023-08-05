const userProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_USER_PROFILE':
        return action.payload;
      default:
        return state;
    }
  };
  
  // TODO - (user will be on the redux state at:
  // state.user)
  export default userProfileReducer;
  