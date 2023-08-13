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
        <div className="collection-body">
            {/* Add # of birds in collection/wishlist, date joined, last bird added */}
            <div className="user-profile-container">
                <div className="avatar-container">
                    <img id="avatar-img" src="https://images.unsplash.com/photo-1660765181897-a992a8204b5a" alt="avatar" />
                </div>
                <div className="user-name-container">
                    <h2 className="user-name-profile">{user.username}</h2>
                </div>
                <div className="profile-stats-container">
                    <h4 className="profile-stats">Birds in My Collection: {birdCollection.length}</h4>
                    <h4 className="profile-stats">Birds in My Wishlist: {birdWishlist.length}</h4>
                    <h4 className="profile-stats">Last bird added to Collection: {birdCollection[0]?.common_name}</h4>
                </div>
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