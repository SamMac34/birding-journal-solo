import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Edit bird in 'My Collection'
function EditBirdForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user)

    const [birdName, setBirdName] = useState('');
    const [observationLocation, setObservationLocation] = useState('');
    const [observationDate, setObservationDate] = useState('');
    const [observationTime, setObservationTime] = useState('');
    const [observationNotes, setObservationNotes] = useState('');
    const [birdImage, setBirdImage] = useState('');

    
    // Dispatch EDIT_BIRD action
    const handleEditBird = () => {
        dispatch({
            type: 'EDIT_BIRD',
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

    // Return user to MyCollection page if EditBird is cancelled
    const cancelEditBird = () => {
        history.push('/mycollection')
    };

    // TODO - make sure inputs have required/value/
    return (
        <form onSubmit={handleEditBird}>

        <h1>Edit bird in your Collection!</h1>

        <input type="text" placeholder="Bird Name" onChange={e => {setBirdName(e.target.value)}} required />
        <input type="text" placeholder="Location" onChange={e => {setObservationLocation(e.target.value)}} />
        <input type="date" placeholder="Date" onChange={e => {setObservationDate(e.target.value)}} />
        <input type="time" placeholder="Time" onChange={e => {setObservationTime(e.target.value)}} />
        <input type="text" placeholder="Notes" onChange={e => {setObservationNotes(e.target.value)}} />
        <input type="text" placeholder="Add Image" onChange={e => {setBirdImage(e.target.value)}} />

        <button onClick={cancelEditBird} type="button" >Cancel Add Bird</button>
        <button type="submit">Add Bird</button>

        </form>

    )

}

export default EditBirdForm;