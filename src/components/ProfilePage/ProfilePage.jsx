import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ProfilePage.css'
import BirdCollection from "../BirdCollection/BirdCollection";
import BirdWishlist from "../BirdWishlist/BirdWishlist";


function ProfilePage() {
    const dispatch = useDispatch();
    const birdCollection = useSelector(store => store.collection);
    const birdWishlist = useSelector(store => store.wishlist);
    const user = useSelector(store => store.user);

    // Variable used to determine if Collection or Wishlist is shown
    const [toggleListDisplay, setToggleListDisplay] = useState(true);


    // Load bird collection on page load
    useEffect(() => {
        fetchCollection();
        fetchWishlist();
    }, []);

    // Dispatch action to fetch bird collection by user id
    const fetchCollection = () => {
        dispatch({
            type: 'FETCH_COLLECTION',
            payload: user.id
        });
    };

    const fetchWishlist = () => {
        dispatch({
            type: 'FETCH_WISHLIST',
            payload: user.id
        });
    };

    return (
        <div className="collection-container">
            {/* Add # of birds in collection/wishlist, date joined, last bird added */}
            <div id="user-profile">
                {/* <img id="img-profile" src="./images/image-not-available.png" /> */}
                <img id="img-profile" src="https://images.unsplash.com/photo-1660765181897-a992a8204b5a" alt="avatar"/>

                <h2>{user.username}</h2>
                <p>Birds in My Collection:{birdCollection.length}</p>
                <p>Birds in My Wishlist:{birdWishlist.length}</p>
                <p>Last bird added to Collection:{birdCollection[0]?.common_name}</p>
            </div>

            <div>
                <button className="collection-header-btn" type="button" onClick={() => setToggleListDisplay(true)} >My Collection</button>
                <button className="wishlist-header-btn" type="button" onClick={() => setToggleListDisplay(false)} > My Wishlist</button>
            </div>

            {toggleListDisplay ?
                <div>
                    {birdCollection?.map((bird) => {
                        return (
                            <BirdCollection key={bird.id} bird={bird} />
                        )
                    })}
                </div>
                :
                <div>
                    {birdWishlist?.map((bird) => {
                        return (
                            <BirdWishlist key={bird.id} bird={bird} />
                        )
                    })}
                </div>
            }
        </div>
    )
};

export default ProfilePage;