import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function UserModalPut({id, setShowModal, setUpdate}) {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch(`/api/user_photos/`, {
            method: "PUT",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            setShowModal(false);
            setUpdate(true)
            history.push(`/user/${id}`);
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
        </div>
        <label className='edit-text'>Choose a Profile Picture!</label>
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