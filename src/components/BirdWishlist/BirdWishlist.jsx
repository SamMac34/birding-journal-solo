import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Component to handle individual bird data from Profile
function BirdWishlist(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user);
    const wishlist = useSelector(store => store.wishlist)
    // console.log('props is:', props.bird)



    const deleteBirdFromWishlist = (props) => {
        console.log('In deleteBirdFromWishlist, props.bird is:', props.id)
        dispatch({
            type: 'DELETE_BIRD_WISHLIST',
            payload: props.id,
            user: user.id
        })
        // fetchWishlist;
    }

    // const fetchWishlist = () => {
    //     dispatch({
    //         type: 'FETCH_WISHLIST',
    //         payload: user.id
    //     });
    // };


    return (
        <div className="bird-card-wishlist">
            <img
                src={props.bird.images ? props.bird.images
                    :
                    "./images/image-not-available.png"}
            />
            <div className="bird-name">{props.bird.common_name}</div>
            <div className="bird-sci-name">{'(' + props.bird.sci_name + ')'}</div>
            <div className="bird-regions">{props.bird.region}</div>
            <div className="bird-status">{props.bird.status}</div>
            {/* <button className="add-to-collection-btn" type="button" onClick={() => addBirdToCollection(props.bird)} >Add to Collection</button> */}
            <button className="remove-from-wishlist-btn" type="button" onClick={() => deleteBirdFromWishlist(props.bird)} >Remove from Wishlist</button>

        </div>
    )
};

export default BirdWishlist;