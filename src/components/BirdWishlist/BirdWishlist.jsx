import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Component to handle individual bird data from Profile
function BirdWishlist(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user);
    const bird = useSelector(store => store.wishlist);

    console.log('bird is:', bird)
    console.log('props.bird is:', props.bird)


    const addBirdToCollection = () => {
        console.log('In addBirdToCollection');
        dispatch({
            type: 'SET_ADD_BIRD',
            payload: {
                userId: user.id,
                common_name: props.bird.name,
                image: props.bird.bird_image
            }
        });
        history.push('/addbird');
    };

    const deleteBirdFromWishlist = (bird) => {
        console.log('In deleteBirdFromWishlist, props.bird is:', bird.id)
        dispatch({
            type: 'DELETE_BIRD_WISHLIST',
            payload: props.bird.id,
            user: user.id
        })
    };


    return (
        <div className="bird-card-wishlist">
            <div className="bird-image-container">
                <img className="bird-img"
                    src={props.bird.bird_image ? props.bird.bird_image
                        :
                        "./images/image-not-available.png"}
                />
            </div>

            <div className="bird-info-div">
                <h3 className="bird-name">{props.bird.common_name}</h3>
                <div className="bird-sci-name">{'(' + props.bird.sci_name + ')'}</div>
                <div className="bird-regions">Regions: {props.bird.region}</div>
                <div className="bird-status"> Status: {props.bird.status}</div>
            </div>

            <div className="btn-div">
                <button className="add-to-collection-btn" type="button" onClick={() => addBirdToCollection(props.bird)} >Add to Collection</button>
                <button className="remove-from-wishlist-btn" type="button" onClick={() => deleteBirdFromWishlist(props.bird)} >Remove</button>
            </div>
        </div>
    )
};

export default BirdWishlist;