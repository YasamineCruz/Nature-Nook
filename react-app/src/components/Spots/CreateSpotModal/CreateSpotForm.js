// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { createSpot } from '../../../store/spot'
import { useHistory } from "react-router-dom";
import { useSpotContext } from "../../../context/SpotContext";
import CreateNameComponent from "./CreateName";
import CreateDescriptionComponent from "./CreateDescription";
import CreatePriceComponent from "./CreatePrice";
import CreateLocationComponent from './CreateLocation'

function CreateSpotForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [submitted, setSubmitted] = useState(false);
  const {count, setCount, errors, setErrors, name, setName, description, setDescription, price, setPrice, city, setCity, state, setState, country, setCountry, amenities, setAmenities, type, setType, activities, setActivities} = useSpotContext()


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
            setCountry("")
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
        {count === 0 && (
          <CreateNameComponent/>
        )}
        {count === 1 && (
          <CreateDescriptionComponent/>
        )}
        {count === 2 && (
          <CreatePriceComponent/>
        )}
        {count === 3 && (
          <CreateLocationComponent/>
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

export default CreateSpotForm;