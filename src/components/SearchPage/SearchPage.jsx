import React from "react";
import { useDispatch, useSelector } from "react-redux";


function SearchPage() {
    const dispatch = useDispatch();
    const birds = useSelector((store) => store.birds);

    const getBirds = () => {
        console.log('In SearchPage, birds is:', birds);
        dispatch({
            type: 'GET_BIRDS'
        });
        console.log('In getBird(SearchPage), birds is:', birds);
    }

    return (
        <>
        <p>hello!</p>
        <p>birds are:</p>
        <div>{birds.name}</div>
        <img src={birds.image}/>
        <button type='button' onClick={getBirds}>GET BIRDS!</button>
        </>
    )
}

export default SearchPage;