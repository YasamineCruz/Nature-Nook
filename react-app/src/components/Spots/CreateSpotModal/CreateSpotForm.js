// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { createSpot } from '../../../store/spot'
import { useHistory } from "react-router-dom";
import CreateNameComponent from "./CreateName";
import CreateDescriptionComponent from "./CreateDescription";
import CreatePriceComponent from "./CreatePrice";

function CreateSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setcountry] = useState("")
  const [amenities, setAmenities] = useState("")
  const [type, setType] = useState("")
  const [count, setCount] = useState(0)
  const [activities, setActivities] = useState("")
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);

    
  useEffect(()=> {
    let validationErrors = []
    if(!city) validationErrors.push('You must enter a city.')
    if(!state) validationErrors.push('You must enter a state.')
    if(!country) validationErrors.push('You must enter a country.')
    if(!amenities) validationErrors.push('You must select amenities or choose none option.')
    if(!type) validationErrors.push('You must select Lodging or Campsite.')
    if(!activities) validationErrors.push('You must select activities or choose none option.')
    setErrors(validationErrors)
  }, [errors, name, description, price, city, state, country, amenities, tpye, amenities])


  const handleSubmit = async(e) => {
    e.preventDefault();
    let validationErrors = []
    setSubmitted(true)
    
    let spotInfo = {
        name,
        description,
        price,
        city,
        state,
        country,
        amenities,
        type,
        activities
    }

    if(errors.length <= 0){
        let newSpot = await dispatch(createSpot(spotInfo))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) validationErrors.push(data.errors);
            setErrors(validationErrors)
          });
        if(validationErrors.length <= 0){
            setName("")
            setDescription("")
            setPrice("")
            setCity("")
            setState("")
            setcountry("")
            setAmenities("")
            setType("")
            setActivities("")
            history.push(`/spots/${newSpot.id}`)
        }
    }
    
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CreateNameComponent 
            name={name} 
            setName={setName} 
            errors={errors} 
            setErrors={setErrors} 
            count={count}
            setCount={setCount}/>
        <CreateDescriptionComponent
            description={description} 
            setDescription={setDescription} 
            errors={errors} 
            setErrors={setErrors} 
            count={count} 
            setCount={setCount}/>
        <CreatePriceComponent
            price={price}
            setPrice={setPrice}
            errors={errors}
            setErrors={setErrors}
            count={count}
            setCount={setCount}/>

        { validationErrors && submitted && (
            <ul className='create-event-errors'>
                {validationErrors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
        )}
      </form>  
    </div>
    
  );
}

export default CreateSpotForm;