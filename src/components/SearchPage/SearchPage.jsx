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
            <h3>Search the Nuthatch database of 1000+ birds!</h3>
            <form className="search-form" onSubmit={searchBirdApi}>
                <input className="search-input"
                    type="text"
                    name="bird"
                    placeholder="Search birds"
                    value={birdName}
                    onChange={event => setBirdName(event.target.value)}
                />
                <button className="search-btn" type='submit'>Search</button>
            </form>

            <div className="search-header">
                <h3>Results</h3>
            </div>

            {birds?.entities?.map((bird) => {
                return (
                    <div key={bird.id} className="bird-card">
                        <div className="bird-image-container">
                            <img className="bird-img"
                                src={bird.images[0] ? bird.images[0]
                                    :
                                    "./images/image-not-available.png"}
                            />
                        </div>

                        <div className="bird-info-div">
                            <div className="bird-name">{bird.name}</div>
                            <div className="bird-sci-name">{'(' + bird.sciName + ')'}</div>
                            <div className="bird-regions">Regions: {bird.region[0]}</div>
                            <div className="bird-status">Status: {bird.status}</div>
                        </div>

                        <div className="btn-div">
                            <button className="add-to-collection-btn" type="button" onClick={() => addBirdToCollection(bird)} >Add to Collection</button>
                            <button className="add-to-wishlist-btn" type="button" onClick={() => addBirdToWishlist(bird)} >Add to Wishlist</button>
                        </div>

                    </div>

                )
            })}
        </section>
    )
}

export default SearchPage;