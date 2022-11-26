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

export default function EditSpot({setShowModal, spot, spotId}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState(spot.name);
    const [description, setDescription] = useState(spot.description);
    const [price, setPrice] = useState(spot.price)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [amenities, setAmenities] = useState(spot.amenities.split(' '))
    const [type, setType] = useState(spot.type)
    const [count, setCount] = useState(0)
    const [activities, setActivities] = useState(spot.activities.split(' '))
    const [errors, setErrors] = useState([]);
    const [url, setUrl] = useState(getImg(spot.Photos))

    
    const handleSubmit = async(e) => {
        e.preventDefault();
        let validationErrors = []
        setSubmitted(true)
        setShowModal(false)
        setCount(0)
        
        let spotInfo = {
            name,
            description,
            price: Number(price),
            city,
            state,
            country,
            amenities: amenities.join(" "),
            type,
            activities: activities.join(" "),
            url
        }

  

    
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
                history.push(`/spots/${spotId}`)
            }
        }
    }
    
    return (
        <div>
          <form onSubmit={handleSubmit}>
            {count === 0 && (
              <CreateNameComponent name={name} setName={setName} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            )}
            {count === 1 && (
              <CreateDescriptionComponent description={description} setDescription={setDescription} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            )}
            {count === 2 && (
              <CreatePriceComponent price={price} setPrice={setPrice} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            )}
            {count === 3 && (
              <CreateLocationComponent city={city} setCity={setCity} state={state} setState={setState} country={country} setCountry={setCountry} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            )}
            {count === 4 && (
              <CreateTypeComponent type={type} setType={setType} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            )}
            {count === 5 && (
              <CreateAmenitiesComponent amenities={amenities} setAmenities={setAmenities} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            )}
            {count === 6 && (
              <CreateActivitiesComponent activities={activities} setActivities={setActivities} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            )}
            {count === 7 && (
              <CreateImageComponent url={url} setUrl={setUrl} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
            )}
            {count === 8 && (
              <div className='spot-modal-container'>
                <h3>By clicking the edit spot button this spot will be updated for others to view</h3>
                <button type='submit' className='submit-button'>Edit Spot</button>
              </div>
            )}
    
            { errors?.length >= 1 && submitted && (
                <ul className='create-event-errors'>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
            )}
          </form>  
        </div>
        
      );
}