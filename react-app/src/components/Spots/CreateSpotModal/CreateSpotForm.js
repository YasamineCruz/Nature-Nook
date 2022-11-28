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
import BackButton from "./BackButton";


export function resetPrice(price){
  let priceCheck = price
  let pArr = priceCheck.split("")
  if(pArr.find(e => e === '$')){
    let i = pArr.findIndex(e => e === '$')
    pArr.splice(i,1)
    }
  let p = pArr.join("")
  p = Number(p)
  return p
}

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
          console.log(spot)
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
            history.push(`/spots`)
        }
    }
    
  };
  

  return (
    <div className='create-modal-container'>
      <form onSubmit={handleSubmit}>
        {count === 0 && (
          <CreateNameComponent setShowModal={setShowModal} submitted={submitted} name={name} setName={setName} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 1 && (
          <CreateDescriptionComponent setShowModal={setShowModal} submitted={submitted} description={description} setDescription={setDescription} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 2 && (
          <CreatePriceComponent setShowModal={setShowModal} submitted={submitted} price={price} setPrice={setPrice} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 3 && (
          <CreateLocationComponent setShowModal={setShowModal} submitted={submitted} city={city} setCity={setCity} state={state} setState={setState} country={country} setCountry={setCountry} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 4 && (
          <CreateTypeComponent setShowModal={setShowModal} submitted={submitted} type={type} setType={setType} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 5 && (
          <CreateAmenitiesComponent setShowModal={setShowModal} submitted={submitted} amenities={amenities} setAmenities={setAmenities} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 6 && (
          <CreateActivitiesComponent setShowModal={setShowModal} submitted={submitted} activities={activities} setActivities={setActivities} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 7 && (
          <CreateImageComponent setShowModal={setShowModal} submitted={submitted} url={url} setUrl={setUrl} setErrors={setErrors} count={count} setCount={setCount} setSubmitted={setSubmitted} errors={errors}/>
        )}
        {count === 8 && (
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
            <h3 className='create-modal-text'>By clicking the create spot button this listing will be available for others to view</h3>
          </div>
            <div className='Button-Container-Create-Spot'>
              <BackButton count={count} setCount={setCount}/>
              <button type='submit' className='NextButton'>Create Spot</button>
            </div>
            </div>
        )}
      </form>  
    </div>
    
  );
}

export default CreateSpotForm;