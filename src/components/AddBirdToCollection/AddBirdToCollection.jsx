import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Add Bird to 'My Collection'
function AddBirdToCollection() {
    const [birdInfo, setBirdInfo] = useState('');
    const dispatch = useDispatch();


    // dispatch ADD_BIRD POST route
    const handleBirdInfo = () => {
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
        <input type="image" placeholder="Add Image" />

        <button>Cancel Add Bird</button>
        <button type="submit">Add Bird</button>

        </form>

    )

}

export default AddBirdToCollection;