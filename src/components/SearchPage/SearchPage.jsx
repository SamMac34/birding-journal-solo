import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './SearchPage.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SearchPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [birdName, setBirdName] = useState('')
    const birds = useSelector((store) => store.searchBirds);
    const user = useSelector(store => store.user);


    console.log('in SearchPage, searchBirds is:', birds)

    const searchBirds = (event) => {
        event.preventDefault();
        console.log('In searchBirds(SearchPage) bird is:', birdName)
        dispatch({
            type: 'SEARCH_BIRDS',
            payload: birdName
        });
    };

    const addBirdToCollection = (bird) => {
        console.log('in SearchPage, bird is:', bird);
        // dispatch({
        //     type: 'SET_ADD_BIRD',
        //     payload: bird
        // })
        // history.push('/addbird');
        dispatch({
            type: 'ADD_BIRD',
            payload: {
                userId: user.id,
                bird_name: bird.name,
                // location: observationLocation,
                // date: observationDate,
                // time: observationTime,
                // notes: observationNotes,
                image: bird.images[0]
            }        
        })
        
    };

    const addBirdToWishlist = () => {

    };



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
                <button className="search-btn" type='submit'>Search</button>
            </form>

            <h1>Results</h1>

            {birds?.entities?.map((bird) => {
                return (
                        <div key={bird.id} className="bird-card">
                            <img
                            src={bird.images[0] ? bird.images[0]
                            :
                            "./images/image-not-available.png"}
                            />
                            <div className="bird-name">{bird.name}</div>
                            <div className="bird-sci-name">{'('+ bird.sciName + ')'}</div>
                            <div className="bird-regions">{bird.region[1] ? bird.region[0]+','+bird.region[1] : bird.region[0] }</div>
                            <div className="bird-status">{bird.status}</div>
                            <button className="add-to-collection-btn" type="button" onClick={() => addBirdToCollection(bird)} >Add to Collection</button>
                            <button className="add-to-wishlist-btn" type="button" onClick={() => addBirdToWishlist(bird)} >Add to Wishlist</button>
                        </div>

                )
            })}
        </section>
    )
}

export default SearchPage;