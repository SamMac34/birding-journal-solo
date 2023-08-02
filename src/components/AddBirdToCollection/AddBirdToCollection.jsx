import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Add Bird to 'My Collection'
function AddBirdToCollection() {
    const [birdName, setBirdName] = useState('');
    const [observationLocation, setObservationLocation] = useState('');
    const [observationDate, setobservationDate] = useState('');
    const [observationTime, setobservationTime] = useState('');
    const [observation, setobservation] = useState('');
    const [birdImage, setBirdImage] = useState('');





    const dispatch = useDispatch();


    // dispatch ADD_BIRD POST route
    const handleBirdInfo = () => {
        setBirdInfo
        dispatch({
            type: 'ADD_BIRD',
            payload: birdInfo
        })
    }

    // TODO - make sure inputs have required/value/
    return (
        <form onSubmit={handleBirdInfo}>
        <h1>Add a bird to your Collection!</h1>

        <input type="text" placeholder="Bird Name" required />
        <input type="text" placeholder="Location" />
        <input type="date" placeholder="Date" />
        <input type="time" placeholder="Time" />
        <input className="add-bird-image-input" type="text" placeholder="Add Image" />

        <button>Cancel Add Bird</button>
        <button type="submit">Add Bird</button>

        </form>

    )

}

export default AddBirdToCollection;