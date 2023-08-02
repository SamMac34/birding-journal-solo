import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Add Bird to 'My Collection'
function AddBirdForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [birdName, setBirdName] = useState('');
    const [observationLocation, setObservationLocation] = useState('');
    const [observationDate, setObservationDate] = useState('');
    const [observationTime, setObservationTime] = useState('');
    const [observationNotes, setObservationNotes] = useState('');
    const [birdImage, setBirdImage] = useState('');


    // Dispatch ADD_BIRD action
    const handleBirdInfo = () => {
        dispatch({
            type: 'ADD_BIRD',
            payload: {
                birdName: birdName,
                observationLocation: observationLocation,
                observationDate: observationDate,
                observationTime: observationTime,
                observationNotes: observationNotes,
                birdImage: birdImage
            }
        })
    };

    const cancelAddBird = () => {
        // TODO Add path 
        history.push('/')
    };

    // TODO - make sure inputs have required/value/
    return (
        <form onSubmit={handleBirdInfo}>
        <h1>Add a bird to your Collection!</h1>

        <input type="text" placeholder="Bird Name" onChange={e => {setBirdName(e.target.value)}} required />
        <input type="text" placeholder="Location" onChange={e => {setObservationLocation(e.target.value)}} />
        <input type="date" placeholder="Date" onChange={e => {setObservationDate(e.target.value)}}/>
        <input type="time" placeholder="Time" onChange={e => {setObservationTime(e.target.value)}}/>
        <input type="text" placeholder="Notes" onChange={e => {setObservationNotes(e.target.value)}}/>

        <input className="add-bird-image-input" type="text" placeholder="Add Image" />

        <button onClick={cancelAddBird} type="button" >Cancel Add Bird</button>
        <button type="submit">Add Bird</button>

        </form>

    )

}

export default AddBirdForm;