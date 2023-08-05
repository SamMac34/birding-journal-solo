import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import searchBirds from './birds.reducer';
import collection from './collection.reducer';
import birdToEdit from './birdToEdit.reducer';
import userProfileReducer from './userProfile.reducer';
import wishlist from './wishlist.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // Holds registrationMessage and loginMessage
  user, // Holds user id and username if someone is logged in
  searchBirds, // Holds birds returned from API search
  collection, // Holds birds returned from myCollection table
  birdToEdit, // Holds bird info to edit from myCollection state
  userProfileReducer, // Holds user profile info
  wishlist, // Holds birds returned from myWishlist table
});

export default rootReducer;
