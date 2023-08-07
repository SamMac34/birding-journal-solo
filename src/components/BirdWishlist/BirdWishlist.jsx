import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Component to handle individual bird data from Profile
function BirdWishlistDetail(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user);

    // Dispatch action to edit selected bird
    // const handleEditBirdClick = () => {
    //     dispatch({
    //         type: 'SET_EDIT_BIRD',
    //         payload: props.bird
    //     })
    //     history.push('/editbird');
    // };

    // const handleDeleteBirdClick = () => {
    //     console.log('In BirdDetail(handleDelete) props.bird is:', props.bird)
    //     dispatch({
    //         type: 'DELETE_BIRD',
    //         payload: props.bird,
    //         user: user.id
    //     })
    // }


    return (
        <div className="bird-card-wishlist">
            {/* <img
                src={props.bird_image ? props.bird_image
                    :
                    "./images/image-not-available.png"}
            />
            <div className="bird-name">{props.bird.bird_name}</div>
            <div>Bird ID is: {props.bird.id}</div>
            <div >Observation Location: {props.bird.location}</div>
            <div >Notes: {props.bird.notes}</div>
            <div >Time seen: {props.bird.time}</div>
            <div >Date seen: {props.bird.date}</div>
            <button onClick={handleEditBirdClick}>Edit</button>
            <button onClick={handleDeleteBirdClick}>Remove</button> */}
        </div>
    )
};

export default BirdWishlistDetail;