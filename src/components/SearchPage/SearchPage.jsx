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



    const searchBirdApi = (event) => {
        event.preventDefault();
        console.log('In searchBirds(SearchPage) bird is:', birdName)
        dispatch({
            type: 'SEARCH_BIRDS',
            payload: birdName
        });
    };

    const addBirdToCollection = (bird) => {
        console.log('In SearchPage, bird is:', bird);
    
        dispatch({
            type: 'SET_ADD_BIRD',
            payload: {
                userId: user.id,
                common_name: bird.name,
                // location: observationLocation,
                // date: observationDate,
                // time: observationTime,
                // notes: observationNotes,
                image: bird.images[0] 
            }        
        });
        history.push('/addbird');
        // alert('Added to Collection!')

    };

    const addBirdToWishlist = (bird) => {
        console.log('In addBirdToWishlist, bird is:', bird);
        dispatch({
            type: 'ADD_BIRD_WISHLIST',
            payload: {
                userId: user.id,
                common_name: bird.name,
                family: bird.family,
                region: bird.region[0],
                order: bird.order,
                sci_name: bird.sciName,
                image: bird.images[0],
                status: bird.status,
            }
        })
        alert('Added to Wishlist!')
    };

    return (
        <section>
            {/* TODO - add label, required */}
            <form onSubmit={searchBirdApi}>
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
                            {/* Possibly change to bird.region, depending on BirdWishlist view */}
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