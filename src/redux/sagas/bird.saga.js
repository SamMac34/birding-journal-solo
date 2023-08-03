import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import AddBirdToCollection from '../../components/AddBirdForm/AddBirdForm';

// GET birds searched from API
function* getBirds(action) {
    console.log('In bird saga(getBirds), action.payload is:', action.payload)

    try {
        const response = yield axios.get(`/api/birds/${action.payload}`)
        console.log('response/data is:', response.data.entities)
        yield put({
            type: 'SET_BIRDS',
            payload: response.data 
    })
    } catch (error) {
        console.log('Error in getBird saga:', error)
    }
}

function* addBirdToCollection(action) {
    console.log('In bird saga(add-BirdToCollection), action.payload is:', action.payload);

    try {
        yield axios.post(`/api/birds`, action.payload);
        yield put({ type: 'FETCH_COLLECTION' })

    } catch (error) {
        console.log('Error Adding bird to Collection', error);
    }
}


function* birdSaga() {
    yield takeLatest('GET_BIRDS', getBirds);
    yield takeLatest('ADD_BIRD', addBirdToCollection)

}

export default birdSaga;