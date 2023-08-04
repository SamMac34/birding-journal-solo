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

// Fetch bird collection by user ID
function* fetchBirdCollection(action) {
    console.log('In fetchBirdCollection saga, action.payload is:', action.payload)
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

// Add bird to collection
function* addBirdToCollection(action) {
    console.log('In bird saga(addBirdToCollection), action.payload is:', action.payload);
    try {
        yield axios.post(`/birds`, action.payload);
        yield put({ type: 'FETCH_BIRD_COLLECTION', payload: action.payload.userId })
    } catch (error) {
        console.log('Error Adding bird to Collection', error);
    }
};

// Edit bird in collection
function* editBirdCollection(action) {

    try {
        console.log('In editBirdCollection, action.payload is:', action.payload)
        yield axios.put(`/birds/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_BIRD_COLLECTION', payload: action.userId })

    } catch (err) {
        console.log('Error sending edit bird info to server:', err);
    }
};

// Delete bird from collection
function* deleteBirdCollection(action) {
    console.log('in deleteBirdCollection, action.payload is:', action.payload)
    try {
        yield axios.delete(`/birds/${action.payload.id}`)
        yield put({ type: 'FETCH_BIRD_COLLECTION', payload: action.user })
    } catch (err) {
        console.log('Error deleting bird in deleteBirdCollection saga:', err);
    }
}

// Watcher saga
function* birdSaga() {
    yield takeLatest('SEARCH_BIRDS', searchBirds);
    yield takeLatest('ADD_BIRD', addBirdToCollection);
    yield takeLatest('FETCH_BIRD_COLLECTION', fetchBirdCollection);
    yield takeLatest('SUBMIT_EDIT_BIRD', editBirdCollection);
    yield takeLatest('DELETE_BIRD', deleteBirdCollection);
};

export default birdSaga;