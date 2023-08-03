import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ProfilePage.css'


function ProfilePage() {
    // const [birdName, setBirdName] = useState('')
    const birdCollection = useSelector(store => store.myCollection);
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();

    // Load bird collection on page load
    useEffect(() => {
        fetchCollection();
    }, []);

    // Dispatch action to fetch bird collection
    const fetchCollection = () => {
        console.log('In Profile, Collection birds are:', birdCollection)
        dispatch({
            type: 'GET_BIRD_COLLECTION',
            payload: user.id
        });
    }

    // birds={}, birds.entities=[{}]
    // console.log('in SearchPage, birds.entities is:', birds.entities)

    return (
        <>
        <div id="user-profile" >User Profile</div>
        <h1>My Collection</h1>

        </>
    //     <section>
    //         {/* TODO - add label, required */}
    //         <form onSubmit={searchBirds}>
    //             <input
    //                 type="text"
    //                 name="bird"
    //                 placeholder="Search birds"
    //                 value={birdName}
    //                 onChange={event => setBirdName(event.target.value)}
    //             />
    //             <button type='submit'>Search</button>
    //         </form>

    //         <h1>Results</h1>

    //         {birds?.entities?.map((bird) => {
    //             return (
    //                     <div key={bird.name} className="bird-card">
    //                         <img
    //                         src={bird.images[0] ? bird.images[0]
    //                         :
    //                         "./images/image-not-available.png"}
    //                         />
    //                         <div className="bird-name">{bird.name}</div>
    //                         <div className="bird-sci-name">{'('+ bird.sciName + ')'}</div>
    //                         <div className="bird-regions">{bird.region[1] ? bird.region[0]+','+bird.region[1] : bird.region[0] }</div>
    //                         <div className="bird-status">{bird.status}</div>
    //                     </div>
    //             )
    //         })};
    //     </section>
    )
};

export default ProfilePage;