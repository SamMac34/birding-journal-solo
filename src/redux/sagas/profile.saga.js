import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// Worker saga: will be fired on "FETCH_USER_PROFILE" actions
function* fetchUserProfile(action) {
    try {
      yield axios.get('/api/user/profile', action.payload)
      console.log('In profile.saga, response.data is:', response.data)
      yield put({ type: 'SET_USER_PROFILE', payload: response.data })
    } catch (err) {
      console.log('Error fetching user profile info:', err);
    }
};

// Watch function listens for dispatches
function* profileSaga() {
    yield takeLatest('FETCH_USER_PROFILE', fetchUserProfile)
};

export default profileSaga;