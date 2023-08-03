import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Component to handle individual bird data from Profile
function BirdDetail(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const birdCollection = useSelector(store => store.myCollection);
    const user = useSelector(store => store.user);

    // Dispatch action to edit selected bird
    const handleEditBirdClick = () => {
        dispatch({
            type: 'EDIT_BIRD',
            payload: props.bird
        })
        history.push('/editbird');
    };

    return (
        <div className="bird-card">
            <img
                src={props.bird_image ? props.bird_image
                    :
                    "./images/image-not-available.png"}
            />
            <div className="bird-name">{props.bird.bird_name}</div>
            <div >Observation Location: {props.bird.location}</div>
            <div >Notes: {props.bird.notes}</div>
            <div >Time seen: {props.bird.time}</div>
            <div >Date seen: {props.bird.date}</div>
            <button onClick={handleEditBirdClick}>Edit</button>
            <button>Remove</button>
        </div>
    )
};

export default BirdDetail;