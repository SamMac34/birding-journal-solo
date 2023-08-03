import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Edit bird in 'My Collection'
function EditBirdForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user)
    const birdToEdit = useSelector(store => store.birdToEdit)

    console.log('birdToEdit is:', birdToEdit);
    
    // Dispatch action to update birdToEdit reducer with edited data
    const handleChange = (event, propertyToChange) => {
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: {
                property: propertyToChange,
                value: event.target.value
            }
        })
    };

    // Dispatch edit action and send edited data to editBird saga,
    // then take user back to Profile page
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'SUBMIT_EDIT_BIRD',
            payload: birdToEdit,
            userId: user.id
        })
        history.push('/profile')
    };

    // Return user to Profile page if edit bird is cancelled
    const cancelEditBird = () => {
        history.push('/profile')
    };

    // TODO - make sure inputs have required/value/
    return (
        <form onSubmit={handleSubmit}>

        <h1>Edit bird in your Collection!</h1>

        <input value={birdToEdit.bird_name} type="text" placeholder="Bird Name" onChange={event => handleChange(event, 'bird_name')} />
        <input value={birdToEdit.location} type="text" placeholder="Location" onChange={event => handleChange(event, 'location')} />
        <input value={birdToEdit.date} type="date" placeholder="Date" onChange={event => handleChange(event, 'date')} />
        <input value={birdToEdit.time} type="time" placeholder="Time" onChange={event => handleChange(event, 'time')} />
        <input value={birdToEdit.notes} type="text" placeholder="Notes" onChange={event => handleChange(event, 'notes')} />
        <input value={birdToEdit.image} type="text" placeholder="Add Image" onChange={event => handleChange(event, 'image')} />

        <button onClick={cancelEditBird} type="button" >Cancel Edit Bird</button>
        <button type="submit">Edit Bird</button>

        </form>
    )
};

export default EditBirdForm;