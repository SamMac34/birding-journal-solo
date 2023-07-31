import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getBirds() {
    console.log('In bird saga')

    try {
        const response = yield axios.get('/api/birds')
        console.log('response/data is:', response.data.entities)
        yield put({
            type: 'SET_BIRDS',
            payload: {
                name: response.data.entities[0].name,
                image: response.data.entities[0].images[0]
            }
    })
    } catch (error) {
        console.log('Error in getBird saga:', error)
    }
}

function* birdSaga() {
    yield takeLatest('GET_BIRDS', getBirds)
}

export default birdSaga;