// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { createSpot } from '../../../store/spot'
import { useHistory } from "react-router-dom";
import CreateNameComponent from "./CreateName";
import CreateDescriptionComponent from "./CreateDescription";
import CreatePriceComponent from "./CreatePrice";
import CreateLocationComponent from './CreateLocation'
import CreateAmenitiesComponent from "./CreateAmenities";
import CreateTypeComponent from "./CreateType";
import CreateActivitiesComponent from "./CreateActivities";
import CreateImageComponent from "./CreateImage";
import '../../../context/Modal.css'

function CreateSpotForm({setShowModal}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [amenities, setAmenities] = useState([])
  const [type, setType] = useState("")
  const [count, setCount] = useState(0)
  const [activities, setActivities] = useState([])
  const [errors, setErrors] = useState([]);
  const [url, setUrl] = useState('')



  const handleSubmit = async(e) => {
    e.preventDefault();
    let validationErrors = []
    setSubmitted(true)
    setShowModal(false)
    setCount(0)

    let pArr = url.split("")
    if(pArr.find(e => e === '$')){
      let i = pArr.findIndex(e => e === '$')
      pArr.splice(i,1)
      }
    let p = pArr.join("")
    setUrl(p)
    
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
        let spot = await dispatch(createSpot(spotInfo))
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
            history.push(`/spots/${spot.id}`)
        }
    }
    
  };
  

  return (
    <div className='create-modal-container'>
      <form onSubmit={handleSubmit}>
        {count === 0 && (
          <CreateNameComponent submitted={submitted} name={name} setName={setName} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 1 && (
          <CreateDescriptionComponent submitted={submitted} description={description} setDescription={setDescription} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 2 && (
          <CreatePriceComponent submitted={submitted} price={price} setPrice={setPrice} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 3 && (
          <CreateLocationComponent submitted={submitted} city={city} setCity={setCity} state={state} setState={setState} country={country} setCountry={setCountry} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 4 && (
          <CreateTypeComponent submitted={submitted} type={type} setType={setType} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 5 && (
          <CreateAmenitiesComponent submitted={submitted} amenities={amenities} setAmenities={setAmenities} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 6 && (
          <CreateActivitiesComponent submitted={submitted} activities={activities} setActivities={setActivities} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 7 && (
          <CreateImageComponent submitted={submitted} url={url} setUrl={setUrl} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 8 && (
          <div className='spot-modal-container'>
            <h3>By clicking the create spot button this spot will be added for others to view</h3>
            <button type='submit' className='submit-button'>Create Spot</button>
          </div>
        )}
      </form>  
    </div>
    
  );
}

export default CreateSpotForm;