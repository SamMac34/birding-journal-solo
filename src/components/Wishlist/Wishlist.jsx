import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ProfilePage.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BirdDetail from "../BirdCollectionDetail/BirdCollectionDetail";


function Wishlist() {
    const dispatch = useDispatch();
    const history = useHistory();
    const wishlist = useSelector(store => store.wishlist);
    const user = useSelector(store => store.user);


    // Load bird collection on page load
    // useEffect(() => {
    //     fetchWishlist();
    // }, []);

    // Dispatch action to fetch bird Wishlist by user id
    const fetchWishlist = () => {
        dispatch({
            type: 'FETCH_BIRD_WISHLIST',
            payload: user.id
        });
    };


    // console.log('In Wishlist, wishlist is:', bird)
    // console.log('In Wishlist, user is:', user)


    return (
        <>
            {/* Add # of birds in collection/wishlist, date joined, last bird added */}
            <div id="user-profile">
                <img src="./images/image-not-available.png"/>
                <h2>{user.username}</h2>
                <p>Birds in My Collection:{myCollection.length}</p>
                <p>Last bird added:{myCollection[0].bird_name}</p>
            
            </div>

            <div>
            <button className="collection-button" type="button">My Collection</button>
            <button className="wishlist-button" type="button">Wishlist</button>
            </div>
            {wishlist?.map((bird) => {
                return (
                    <BirdWishlistDetail key={bird.id} bird={bird}/>
                )
            })}
        </>
    )
};

export default Wishlist;