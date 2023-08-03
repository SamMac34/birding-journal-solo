import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Add Bird to 'My Collection'
function AddBirdForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user)

    const [birdName, setBirdName] = useState('');
    const [observationLocation, setObservationLocation] = useState('');
    const [observationDate, setObservationDate] = useState('');
    const [observationTime, setObservationTime] = useState('');
    const [observationNotes, setObservationNotes] = useState('');
    const [birdImage, setBirdImage] = useState('');


    // console.log("user id:", user.id);
    
    // Dispatch ADD_BIRD action
    const handleBirdInfo = () => {
        dispatch({
            type: 'ADD_BIRD',
            payload: {
                userId: user.id,
                name: birdName,
                location: observationLocation,
                date: observationDate,
                time: observationTime,
                notes: observationNotes,
                image: birdImage
            }
        })
    };

    // Return user to previous page if AddBird is cancelled
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
        <input type="date" placeholder="Date" onChange={e => {setObservationDate(e.target.value)}} />
        <input type="time" placeholder="Time" onChange={e => {setObservationTime(e.target.value)}} />
        <input type="text" placeholder="Notes" onChange={e => {setObservationNotes(e.target.value)}} />
        <input type="text" placeholder="Add Image" onChange={e => {setBirdImage(e.target.value)}} />

        <button onClick={cancelAddBird} type="button" >Cancel Add Bird</button>
        <button type="submit">Add Bird</button>

        </form>

    )

}

export default AddBirdForm;