import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import searchBirds from './birds.reducer';
import myCollection from './my.collection.reducer';
import birdToEdit from './edit.bird.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // Holds registrationMessage and loginMessage
  user, // Holds user id and username if someone is logged in
  searchBirds, // Holds birds returned from API search
  myCollection, // Holds birds returned from myCollection database
  birdToEdit, // Holds data from edit bird from myCollection
});

export default rootReducer;
