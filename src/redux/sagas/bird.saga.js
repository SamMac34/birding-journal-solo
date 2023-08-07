import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Search API by bird name
function* searchBirds(action) {

    try {
        const response = yield axios.get(`/api/birds/${action.payload}`)
        // console.log('response/data is:', response.data.entities)
        yield put({
            type: 'SET_BIRDS',
            payload: response.data 
    })
    } catch (error) {
        console.log('Error in searchBirds saga:', error)
    }
};

// Fetch birds in My Collection by user ID
function* fetchCollection(action) {
    console.log('In fetchBirdCollection saga, action.payload is:', action.payload)
    try {
        const response = yield axios.get(`/birds/${action.payload}`)
        console.log('response.data is:', response.data)
        yield put({
            type: 'SET_COLLECTION',
            payload: response.data
    });
    } catch (error) {
        console.log('Error in fetchBirdCollection saga:', error)
    }
};

// Add bird to My Collection by user ID
function* addBirdToCollection(action) {
    console.log('In bird saga(addBirdToCollection), action.payload is:', action.payload);
    try {
        yield axios.post(`/birds`, action.payload);
        yield put({ type: 'FETCH_COLLECTION', payload: action.payload.userId })
    } catch (error) {
        console.log('Error Adding bird to Collection', error);
    }
};

// Edit bird in My Collection by user ID
function* editBirdCollection(action) {

    try {
        console.log('In editBirdCollection, action.payload is:', action.payload)
        yield axios.put(`/birds/${action.payload.id}`, action.payload);
        yield put({ type: 'FETCH_COLLECTION', payload: action.userId })

    } catch (error) {
        console.log('Error sending edit bird info to server:', error);
    }
};

// Delete bird from Collection by user ID
function* deleteBirdCollection(action) {
    console.log('in deleteBirdCollection, action.payload is:', action.payload)
    try {
        yield axios.delete(`/birds/${action.payload.id}`)
        yield put({ type: 'FETCH_COLLECTION', payload: action.user })
    } catch (error) {
        console.log('Error deleting bird in deleteBirdCollection saga:', error);
    }
};

// Fetch Wishlist by user ID
function* fetchWishlist(action) {
    console.log('In fetchWishlist saga, action.payload is:', action.payload)
    try {
        const response = yield axios.get(`/birds/wishlist/${action.payload}`)
        console.log('response.data is:', response.data)
        yield put({
            type: 'SET_WISHLIST',
            payload: response.data
    });
    } catch (error) {
        console.log('Error in fetchBirdCollection saga:', error)
    }
};

// Add a bird to Wishlist
function* addBirdToWishlist(action) {
    console.log('In addBirdToWishlist, action.payload is:', action.payload);
    try {
        yield axios.post(`/birds/wishlist`, action.payload);
        yield put({ type: 'FETCH_WISHLIST', payload: action.payload.userId })
    } catch (error) {
        console.log('Error Adding bird to Collection', error);
    }

};

// Delete bird from Wishlist by user ID
function* deleteBirdWishlist(action) {
    console.log('in deleteBirdWishlist, action.payload is:', action.payload)
    try {
        yield axios.delete(`/birds/wishlist/${action.payload}`)
        yield put({ type: 'FETCH_WISHLIST', payload: action.user })
    } catch (error) {
        console.log('Error deleting bird in deleteBirdWishlist saga:', error);
    }
};

// Watcher saga
function* birdSaga() {
    yield takeLatest('SEARCH_BIRDS', searchBirds);
    yield takeLatest('ADD_BIRD_COLLECTION', addBirdToCollection);
    yield takeLatest('FETCH_COLLECTION', fetchCollection);
    yield takeLatest('SUBMIT_EDIT_BIRD', editBirdCollection);
    yield takeLatest('DELETE_BIRD_COLLECTION', deleteBirdCollection);
    yield takeLatest('ADD_BIRD_WISHLIST', addBirdToWishlist );
    yield takeLatest('FETCH_WISHLIST', fetchWishlist);
    yield takeLatest('DELETE_BIRD_WISHLIST', deleteBirdWishlist)
};

export default birdSaga;