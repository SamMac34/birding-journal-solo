import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Add Bird to 'My Collection'
function AddBirdForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user);
    const bird = useSelector(store => store.birdToAdd);

    const [birdName, setBirdName] = useState('');
    const [observationLocation, setObservationLocation] = useState('');
    const [observationDate, setObservationDate] = useState('');
    const [observationTime, setObservationTime] = useState('');
    const [observationNotes, setObservationNotes] = useState('');
    const [birdImage, setBirdImage] = useState('');


    // console.log('in AddBirdForm, bird is:', bird)
    // console.log('history is:', history.location)



    // Dispatch ADD_BIRD action
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Image is:', birdImage)
        // if (observationDate === '') {
        //     console.log('in IF statement')
        //     // If no date entered, set observationDate to current date.
        //     const date = new Date();
        //     const year = date.getFullYear();
        //     const month = String(date.getMonth() + 1).padStart(2, '0');
        //     const day = String(date.getDate()).padStart(2, '0');
        //     // Format the date as "yyyy-MM-dd"
        //     const formattedDate = `${year}-${month}-${day}`;
        //     setObservationDate(formattedDate);
        // };
        // console.log('formattedDate is:', formattedDate);
        // console.log('observationDate is:', observationDate);
        dispatch({
            type: 'ADD_BIRD_COLLECTION',
            payload: {
                userId: user.id,
                bird_name: birdName,
                location: observationLocation,
                date: observationDate,
                time: observationTime,
                notes: observationNotes,
                image: birdImage
            }
        })
        // history.push('/profile');
    };

    // Return user to previous page if AddBird is cancelled
    const cancelAddBird = () => {
        history.push('/profile')
    };


    // TODO - make sure inputs have required/value/
    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">

            <h1>Add a bird to your Collection!</h1>

            <input value={bird.name} type="text" placeholder="Bird Name" onChange={e => { setBirdName(e.target.value) }} required />
            <input value={observationLocation} type="text" placeholder="Location" onChange={e => { setObservationLocation(e.target.value) }} />
            <input value={observationDate} type="date" placeholder="Date" onChange={e => { setObservationDate(e.target.value) }} />
            <input value={observationTime} type="time" placeholder="Time" onChange={e => { setObservationTime(e.target.value) }} />
            <input value={observationNotes} type="text" placeholder="Notes" onChange={e => { setObservationNotes(e.target.value) }} />
            <input  type="file" placeholder="Add Image" name="image" onChange={e => { setBirdImage(e.target.files[0]) }} />
            <button onClick={() => cancelAddBird()} type="button" >Cancel Add Bird</button>
            <button type="submit">Add Bird</button>

        </form>

    )

}

export default AddBirdForm;