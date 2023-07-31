import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function SearchPage() {
    const [bird, setBird] = useState('')
    const birds = useSelector((store) => store.birds);
    const dispatch = useDispatch();


    const searchBirds = () => {
        console.log('In SearchPage, birds is:', birds);
        dispatch({
            type: 'GET_BIRDS'
        });
        console.log('In searchBirds(SearchPage), birds is:', birds);
    }

    return (
        <>
            {/* Add label, value, required, onChange */}
            <form onSubmit={searchBirds}>
                <input
                    type="bird"
                    name="bird"
                    placeholder="Search birds"
                    // value={bird}
                    onChange={event => setBird(event.target.value)}
                />
                <button type='submit'>Search</button>
            </form>
            <p>hello!</p>
            <p>birds are:</p>
            <div>{birds.name}</div>
            <img src={birds.image} />

        </>
    )
}

export default SearchPage;