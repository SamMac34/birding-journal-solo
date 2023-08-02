import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import AddBirdToCollection from '../../components/AddBirdForm/AddBirdForm';

function* getBirds(action) {
    console.log('In bird saga, action.payload is:', action.payload)

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



function* birdSaga() {
    yield takeLatest('GET_BIRDS', getBirds);
    yield takeLatest('ADD_BIRD', AddBirdToCollection)

}

export default birdSaga;