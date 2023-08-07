import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ProfilePage.css'
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BirdCollection from "../BirdCollection/BirdCollection";
import BirdWishlist from "../BirdWishlist/BirdWishlist";


function ProfilePage() {
    const dispatch = useDispatch();
    // const history = useHistory();
    const birdCollection = useSelector(store => store.collection);
    const birdWishlist = useSelector(store => store.wishlist);
    const user = useSelector(store => store.user);

    // Variable used to determine if Collection or Wishlist is shown
    const [toggleListDisplay, setToggleListDisplay] = useState(true);


    // Load bird collection on page load
    useEffect(() => {
        fetchCollection();
        // fetchUserProfile();
    }, []);

    // Dispatch action to fetch bird collection by user id
    const fetchCollection = () => {
        dispatch({
            type: 'FETCH_BIRD_COLLECTION',
            payload: user.id
        });
    };

    // const fetchUserProfile = () => {
    //     dispatch({
    //         type: 'FETCH_USER_PROFILE',
    //         payload: user.id
    //     });
    // };


    // console.log('In Profile, birdCollection is:', birdCollection)
    // console.log('In Profile, birdWishlist is:', birdWishlist)
    // console.log('In Profile, user is:', user)


    return (
        <>
            {/* Add # of birds in collection/wishlist, date joined, last bird added */}
            <div id="user-profile">
                <img src="./images/image-not-available.png" />
                <h2>{user.username}</h2>
                <p>Birds in My Collection:{birdCollection.length}</p>
                <p>Last bird added to Collection:{birdCollection[0]?.bird_name}</p>
            </div>

            <div>
                <button className="collection-button" type="button" onClick={() => setToggleListDisplay(true)} >My Collection</button>
                <button className="wishlist-button" type="button" onClick={() => setToggleListDisplay(false)} > My Wishlist</button>
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
        </>
    )
};

export default ProfilePage;