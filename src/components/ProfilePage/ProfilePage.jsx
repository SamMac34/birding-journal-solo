import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ProfilePage.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BirdDetail from "../BirdDetail/BirdDetail";


function ProfilePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const birdCollection = useSelector(store => store.myCollection);
    const user = useSelector(store => store.user);


    // Load bird collection on page load
    useEffect(() => {
        fetchCollection();
    }, []);

    // Dispatch action to fetch bird collection by user id
    const fetchCollection = () => {
        dispatch({
            type: 'FETCH_BIRD_COLLECTION',
            payload: user.id
        });
    }

    // console.log('In Profile, birdCollection is:', birdCollection)
    // console.log('In Profile, user is:', user)


    return (
        <>
            {/* Add # of birds in collection/wishlist, date joined, last bird added */}
            <div id="user-profile">
                <img src="./images/image-not-available.png"/>
                <h2>{user.username}</h2>
            
            </div>

            <div>
            <button className="collection-button" type="button">My Collection</button>
            <button className="wishlist-button" type="button">Wishlist</button>
            </div>
            {birdCollection?.map((bird) => {
                return (
                    <BirdDetail key={bird.id} bird={bird}/>
                )
            })}
        </>
    )
};

export default ProfilePage;