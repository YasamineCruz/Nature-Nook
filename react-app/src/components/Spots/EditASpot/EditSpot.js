import { useState } from "react";
import CreateNameComponent from "../CreateSpotModal/CreateName";
import CreateDescriptionComponent from "../CreateSpotModal/CreateDescription";
import CreateActivitiesComponent from "../CreateSpotModal/CreateActivities";
import CreateAmenitiesComponent from "../CreateSpotModal/CreateAmenities";
import CreateImageComponent from "../CreateSpotModal/CreateImage";
import CreateLocationComponent from "../CreateSpotModal/CreateLocation";
import CreatePriceComponent from "../CreateSpotModal/CreatePrice";
import CreateTypeComponent from "../CreateSpotModal/CreateType";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateSpot } from "../../../store/spot";
import { getImg } from "../../../component-resources";
import BackButton from "../CreateSpotModal/BackButton";
import '../../../context/Modal.css'
import '../../../context/EditModal.css'
import { resetPrice } from "../CreateSpotModal/CreateSpotForm";
import ReuploadPicture from "./EditImage";
import { getImgId } from "../../../component-resources";

export default function EditSpot({setShowModal, spot, spotId}) {
    const dispatch = useDispatch();
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(`$${spot.price}`)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [amenities, setAmenities] = useState(spot.amenities.split(' '))
    const [type, setType] = useState(spot.type)
    const [count, setCount] = useState(0)
    const [activities, setActivities] = useState(spot.activities.split(' '))
    const [errors, setErrors] = useState([]);
    const [stop, setStop] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    let id = getImgId(spot.Photos)

    const handleSubmit = async(e) => {
        e.preventDefault();
        let validationErrors = []
        // setSubmitted(true)
        // setShowModal(false)
        setCount(8)
        
        let spotInfo = {
            name,
            description,
            price: resetPrice(price),
            city,
            state,
            country,
            amenities: amenities.join(" "),
            type,
            activities: activities.join(" "),
        }
        console.log('-----------spotInfo----------------', spotInfo)
    
        if(errors.length <= 0){
            await dispatch(updateSpot(spotInfo, spotId))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                  validationErrors.push(data.errors)
                  console.log(data)
                };
                setErrors(validationErrors)
              });
            if(validationErrors.length <= 0){
                setName("")
                setDescription("")
                setPrice("")
                setCity("")
                setState("")
                setCountry("")
                setAmenities("")
                setType("")
                setActivities("")
            }
        }
    }
    
    return (
        <div className='create-modal-container'>
          <form onSubmit={handleSubmit}>
          {count === 0 && (
          <CreateNameComponent setShowDropdown={setShowDropdown} setStop={setStop} setShowModal={setShowModal} submitted={submitted} name={name} setName={setName} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 1 && (
          <CreateDescriptionComponent setShowDropdown={setShowDropdown} setStop={setStop} setShowModal={setShowModal} submitted={submitted} description={description} setDescription={setDescription} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 2 && (
          <CreatePriceComponent setShowDropdown={setShowDropdown} setStop={setStop} setShowModal={setShowModal} submitted={submitted} price={price} setPrice={setPrice} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 3 && (
          <CreateLocationComponent setShowDropdown={setShowDropdown} setStop={setStop} setShowModal={setShowModal} submitted={submitted} city={city} setCity={setCity} state={state} setState={setState} country={country} setCountry={setCountry} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 4 && (
          <CreateTypeComponent setShowDropdown={setShowDropdown} setStop={setStop} setShowModal={setShowModal} submitted={submitted} type={type} setType={setType} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 5 && (
          <CreateAmenitiesComponent setShowDropdown={setShowDropdown} setStop={setStop} setShowModal={setShowModal} submitted={submitted} amenities={amenities} setAmenities={setAmenities} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 6 && (
          <CreateActivitiesComponent setShowDropdown={setShowDropdown} setStop={setStop} setShowModal={setShowModal} submitted={submitted} activities={activities} setActivities={setActivities} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 8 && (
          <ReuploadPicture spotId={spotId} id={id} setShowDropdown={setShowDropdown} setStop={setStop} setShowModal={setShowModal} submitted={submitted} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
            {count === 7 && (
             <div>
              <div className='top-container'>
                <button className='exit-button' type='button' onClick={()=> setShowModal(false)}>
                  <i class="fa-solid fa-xmark"></i>
                </button>
                <div className='create-modal-progress-bar-done'>
                  <i class="fa-solid fa-circle-check done"></i>
                </div>
            </div>
             <div className='create-modal-form'>
               <h3 className='create-modal-text'>By clicking the update spot Button you will edit the spot for all to view.</h3>
             </div>
               <div className='Button-Container-Create-Spot'>
                 <BackButton count={count} setCount={setCount}/>
                 <button type='submit' className='NextButton'>Update Spot</button>
               </div>
               </div>
            )}
    
          </form>  
        </div>
        
      );
}