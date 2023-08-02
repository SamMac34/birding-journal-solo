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
                    type="text"
                    name="bird"
                    placeholder="Search birds"
                    value={birdName}
                    onChange={event => setBirdName(event.target.value)}
                />
                <button type='submit'>Search</button>
            </form>

            <h1>Results</h1>

            {birds?.entities?.map((bird) => {
                return (
                    // bird.images[0] ?
                        <div key={bird.name} className="bird-card">
                            <img
                            src={bird.images[0] ? bird.images[0]
                            :
                            "./images/image-not-available.png"}
                            />
                            <div className="bird-name">{bird.name}</div>
                            <div className="bird-sci-name">{'('+ bird.sciName + ')'}</div>
                            <div className="bird-regions">{bird.region[1] ? bird.region[0]+','+bird.region[1] : bird.region[0] }</div>
                            <div className="bird-status">{bird.status}</div>
                        </div>
                        // :
                        // <div key={bird.name} className="bird-card">
                        //     <img src="./images/image-not-available.png" alt="no image available" />
                        //     <div className="bird-name">{bird.name}</div>
                        //     <div className="bird-sci-name">{bird.sciName}</div>
                        //     <div className="bird-regions"></div>
                        //     <div className="bird-status">{bird.region[1] ? bird.region[0]+','+bird.region[1] : bird.region[0] }</div>
                        // </div>

                )
            })}
        </section>
    )
}

export default SearchPage;