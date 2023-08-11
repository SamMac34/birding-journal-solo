import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Component to handle individual bird data from ProfilePage
function BirdCollection(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user);

    // Dispatch action to edit selected bird
    const handleEditBirdClick = () => {
        dispatch({
            type: 'SET_EDIT_BIRD',
            payload: props.bird
        })
        history.push('/editbird');
    };

    const handleDeleteBirdClick = () => {
        console.log('In BirdDetail(handleDelete) props.bird is:', props.bird)
        dispatch({
            type: 'DELETE_BIRD_COLLECTION',
            payload: props.bird,
            user: user.id
        })
    }

    // console.log('props.bird_image is:', props.bird.bird_image);

    return (
        <div className="bird-card-collection">
            <img
                src={props.bird.bird_image ? props.bird.bird_image
                    :
                    "./images/image-not-available.png"}
            />
            <div className="bird-name">{props.bird.common_name}</div>
            <div>Bird ID is: {props.bird.id}</div>
            <div >Observation Location: {props.bird.location}</div>
            <div >Notes: {props.bird.notes}</div>
            <div >Time seen: {props.bird.time}</div>
            <div >Date seen: {props.bird.date}</div>
            <button onClick={handleEditBirdClick}>Edit</button>
            <button onClick={handleDeleteBirdClick}>Remove</button>
        </div>
    )
};

export default BirdCollection;