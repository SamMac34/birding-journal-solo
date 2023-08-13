import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Component to handle individual bird data from ProfilePage
function BirdCollection(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user);


    // Dispatch action to edit selected bird
    const handleEditBirdClick = () => {
        console.log('in handleEditBird, bird is:', props.bird)
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
            <div className="bird-image-container">
                <img className="bird-img"
                    src={props.bird.bird_image ? props.bird.bird_image
                        :
                        "./images/image-not-available.png"}
                />
            </div>

            <div className="bird-info-div">
            <h3 className="bird-name">{props.bird.common_name}</h3>
            <div className="observation-location">Location: {props.bird.location}</div>
            <div className="observation-time">Time: {props.bird.time}</div>
            <div className="observation-date">Date: {props.bird.date}</div>
            <div className="observation-notes"><span>Notes:</span>{props.bird.notes}</div>
            </div>
            <div className="btn-div">
            <button className="collection-btn edit-btn" onClick={handleEditBirdClick}>Edit</button>
            <button className="collection-btn remove-btn" onClick={handleDeleteBirdClick}>Remove</button>
            </div>
        </div>
    )
};

export default BirdCollection;