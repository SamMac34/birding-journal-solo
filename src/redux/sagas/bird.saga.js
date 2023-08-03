import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Search API for bird by name
function* searchBirds(action) {
    // console.log('In searchBirds saga, action.payload is:', action.payload)

    try {
        const response = yield axios.get(`/api/birds/${action.payload}`)
        console.log('response/data is:', response.data.entities)
        yield put({
            type: 'SET_BIRDS',
            payload: response.data 
    })
    } catch (err) {
        console.log('Error in searchBirds saga:', err)
    }
};

// Add bird to collection
function* addBirdToCollection(action) {
    // console.log('In bird saga(addBirdToCollection), action.payload is:', action.payload);
    try {
        yield axios.post(`/api/birds`, action.payload);
        yield put({ type: 'FETCH_BIRD_COLLECTION' })
    } catch (error) {
        console.log('Error Adding bird to Collection', error);
    }
};

// Fetch bird collection by user ID
function* fetchBirdCollection(action) {
    // console.log('In fetchBirdCollection saga, action.payload is:', action.payload)
    try {
        const response = yield axios.get(`/birds/${action.payload}`)
        console.log('response.data is:', response.data)
        yield put({
            type: 'SET_COLLECTION',
            payload: response.data
    });
    } catch (err) {
        console.log('Error in fetchBirdCollection saga:', err)
    }
};

// Watcher saga
function* birdSaga() {
    yield takeLatest('SEARCH_BIRDS', searchBirds);
    yield takeLatest('ADD_BIRD', addBirdToCollection);
    yield takeLatest('FETCH_BIRD_COLLECTION', fetchBirdCollection);

};

export default birdSaga;