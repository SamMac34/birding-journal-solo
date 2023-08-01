import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './SearchPage.css';


function SearchPage() {
    const [birdName, setBirdName] = useState('')
    const birds = useSelector((store) => store.birds);
    const dispatch = useDispatch();


    const searchBirds = () => {
        console.log('In searchBirds(SearchPage) bird is:', birdName)
        dispatch({
            type: 'GET_BIRDS',
            payload: birdName
        });
    }

    // birds={}, birds.entities=[{}]
    // console.log('in SearchPage, birds.entities is:', birds.entities)

    return (
        <section>
            {/* TODO - add label, required */}
            <form onSubmit={searchBirds}>
                <input
                    type="bird"
                    name="bird"
                    placeholder="Search birds"
                    value={birdName}
                    onChange={event => setBirdName(event.target.value)}
                />
                <button type='submit'>Search</button>
            </form>

            <h1>Results:</h1>

        
            {birds?.entities?.map((bird) => {
                return (
                    bird.images[0] ?
                        <div key={bird.name}className="bird-card">
                            <img src={bird.images[0]} />
                            <div className="bird-title">{bird.name}</div>
                        </div>
                        :
                        <div key={bird.name}className="bird-card">
                        <div className="bird-title-no-image">{bird.name}</div>   
                    </div>        
                    
                )
            })}
        </section>
    )
}


export default SearchPage;