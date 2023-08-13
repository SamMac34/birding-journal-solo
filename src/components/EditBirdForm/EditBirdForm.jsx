import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import './EditBirdForm.css';


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
        console.log('submit edit bird is:', birdToEdit )
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
        <form className="edit-form-panel" onSubmit={handleSubmit}>

        <h1 className="edit-form-header">Edit bird in your Collection!</h1>

        <input className="bird-name-input" value={birdToEdit.common_name ?? ''} type="text" placeholder="Bird Name" onChange={event => handleChange(event, 'common_name')} />
        <input className="bird-location-input" value={birdToEdit.location ?? ''} type="text" placeholder=" Your Location" onChange={event => handleChange(event, 'location')} />
        <input className="bird-date-input" value={birdToEdit.date ?? ''} type="date" placeholder="Date" onChange={event => handleChange(event, 'date')} />
        <input className="bird-time-input" value={birdToEdit.time ?? ''} type="time" placeholder="Time" onChange={event => handleChange(event, 'time')} />
        <textarea className="bird-notes-input" value={birdToEdit.notes ?? ''} type="text" placeholder="Notes" onChange={event => handleChange(event, 'notes')} />
        {/* <input className="bird-image-input" value={birdToEdit.bird_image ?? ''} type="file" placeholder="Add Image" onChange={event => handleChange(event, 'bird_image')} /> */}
        <input className="bird-image-input" type="file"  onChange={event => handleChange(event, 'bird_image')} />
        <button className="cancel-edit-btn" onClick={cancelEditBird} type="button" >Cancel Edit Bird</button>
        <button className="edit-bird-btn" type="submit">Edit Bird</button>

        </form>
    )
};

export default EditBirdForm;