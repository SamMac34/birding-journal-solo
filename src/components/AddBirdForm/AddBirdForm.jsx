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
    const [birdImage, setBirdImage] = useState({});


    // Dispatch ADD_BIRD action
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Image is:', birdImage)

        let currentDate = observationDate
        let currentTime = observationTime

        // If no date entered, set observationDate to current date.
        if (observationDate === '') {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            // Format the date as "YYYY-MM-DD"
            const formattedDate = `${year}-${month}-${day}`;
            currentDate = formattedDate;
        };

        // If no time is entered, set observationTime to current time.
        if (observationTime === '') {
            // console.log('in IF statement');
            const time = new Date();
            const hours = String(time.getHours()).padStart(2, '0');
            const minutes = String(time.getMinutes()).padStart(2, '0');
            const seconds = String(time.getSeconds()).padStart(2, '0');

            // Format time as HH:MM:SS
            const formattedTime = `${hours}:${minutes}:${seconds}`;
            currentTime = formattedTime;
            // console.log()
        };
        // console.log('formattedDate is:', formattedDate);
        // console.log('observationDate is:', observationDate);

        let formData = new FormData();
        formData.append('common_name', birdName)
        formData.append('date', currentDate)
        formData.append('time', currentTime)
        formData.append('userId', user.id)
        formData.append('location', observationLocation)
        formData.append('notes', observationNotes)
        formData.append('image', birdImage)

        dispatch({
            type: 'ADD_BIRD_COLLECTION',
            payload: formData
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
            <input type="file" placeholder="Add Image" name="image" onChange={e => { setBirdImage(e.target.files[0]) }} />
            <button onClick={() => cancelAddBird()} type="button" >Cancel Add Bird</button>
            <button type="submit">Add Bird</button>

        </form>

    )

}

export default AddBirdForm;