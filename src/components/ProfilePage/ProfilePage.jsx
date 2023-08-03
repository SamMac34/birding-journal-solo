import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ProfilePage.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function ProfilePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const birdCollection = useSelector(store => store.myCollection);
    const user = useSelector(store => store.user);

    // console.log('user is:', user)

    // Load bird collection on page load
    useEffect(() => {
        fetchCollection();
    }, []);

    // Dispatch action to fetch bird collection
    const fetchCollection = () => {
        dispatch({
            type: 'FETCH_BIRD_COLLECTION',
            payload: user.id
        });
    }

    const handleEditBirdClick = () => {
        dispatch({
            type: 'EDIT_BIRD',
            payload: birdCollection
        })
        history.push('/editbird');
    };

    console.log('In Profile, birdCollection is:', birdCollection)
    // console.log('In Profile, user is:', user)


    return (
        <>
            <div id="user-profile" >
                <img src="./images/image-not-available.png"/>
                <h2>{user.username}</h2>

            </div>
            <h1>My Collection</h1>
            {birdCollection?.map((bird) => {
                return (
                    <div key={bird.id} className="bird-card">
                        <img
                            src={bird.bird_image ? bird.bird_image
                                :
                                "./images/image-not-available.png"}
                        />
                        <div className="bird-name">{bird.bird_name}</div>
                        <div >Observation Location: {bird.location}</div>
                        <div >Notes: {bird.notes}</div>
                        <div >Time seen: {bird.time}</div>
                        <div >Date seen: {bird.date}</div>
                        <button onClick={handleEditBirdClick}>Edit</button>
                        <button>Remove</button>

                    </div>
                )
            })}
        </>
    )
};

export default ProfilePage;