import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSpot } from "../../../store/spot";


const ReuploadPicture = ({id, spotId, setShowDropdown, setStop, setShowModal, submitted, count, setCount, setSubmitted}) => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch()
    const spot = useSelector(state => state.spot.singleSpot)
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch(`/api/spots/${spotId}/spot_images/${id}`, {
            method: "POST",
            body: formData,
        });
        if (res.ok) {

            await res.json();
            setImageLoading(false);
            await dispatch(getSpot(spotId))
            setShowModal(false)
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
        }
    }
    
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }
    
    return (
        <div className='edit-spot-container'>
        <div className='top-container'>
            <button className='exit-button' type='button' onClick={()=> { setShowModal(false); setStop(false); setShowDropdown(false)}}>
                <i class="fa-solid fa-xmark"></i>
            </button>
        </div>
        <label className='edit-text'>Choose a image for your spot!</label>
        <form className='edit-spot-wrapper'>
            <div className='upload-wrapper'>
            <input
              className='img-upload'
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            {(imageLoading)&& <p>Loading...</p>}
            </div>
            <div className='Button-Container-Create-Spot'>
                <div className='empty-space'></div>
                <button className='NextButton' type='button' onClick={handleSubmit}>Submit</button>
            </div>
        </form>

        </div>
    )
}

export default ReuploadPicture;
