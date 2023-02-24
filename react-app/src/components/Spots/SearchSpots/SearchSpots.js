import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { addZero } from "../../../component-resources";
import { percentage } from "../GetASpot/GetASpot";
import loadingImg from '../../../assets/logo/loading.gif'

export default function SearchSpots(){
    const [search, setSearch] = useState('')
    const [field, setField] = useState('')
    const [spots, setSpots] = useState([])
    const location = useLocation()
    const [loading, setLoading] = useState(false)
    spots.sort((a, b) => b.id - a.id)


    useEffect( () => {
        let timer1 = setTimeout(() => setLoading(true), 1000);
        return () => clearTimeout(timer1);
      },[]);


    useEffect(()=>{
        if(location.search) {
            setSearch(location.search.split('=')[3])
            setField(location.search.split('=')[1])
        }
    },[location])

    useEffect(()=>{
        if(search && field) {
            (async () => {
                const response = await fetch(`/api/spots/search`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({search, field}),
                  });
                const spots = await response.json();
                if(Object.values(spots).length >= 1) setSpots(Object.values(spots.Spots));
              })();
        }
    },[search, field])


    return (
        <div>
        {!loading && (
                <div className='bg-brown'>
                    <img className='loading2' src={loadingImg} alt=''/>
                </div>
        )}
        {loading && (
        <div className='all-spots-container'>
            {spots?.length <= 0 && (
                <div>No Spots matched your search.</div>
            )}
            {spots?.length >= 1 && (
                spots.map(spot => {
                
                    return (
                    <Link className='spot-wrapper pointer' to={`/spots/${spot.id}`}>
                        <div className='spot-img-container pointer'>
                            <img className='small-spot-img pointer' src={Object.values(spot.Photos)[0]?.url ? Object.values(spot.Photos)[0]?.url : 'https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns='} alt=''/>
                        </div>

                        <div className='spot-info-container pointer'>
                            <div className='name-container pointer'>
                                <div className='name-wrapper pointer'>
                                   <h1 className='spot-name pointer'>{spot.name}</h1>
                                    <i class="fa-solid fa-circle-check ind pointer"></i> 
                                </div>
                                <div className='type-container pointer'>
                                <i class={spot.type === 'lodging' ? "fa-solid fa-house type pointer" : "fa-sharp fa-solid fa-campground type pointer"}></i>
                                </div>
                            </div>
                            <div className='spot-text pointer'>{spot.city} {spot.state} {spot.country}</div>
                            <div className='price-container pointer'>
                                <div className='reviews-info-container pointer'>
                                    <i class="fa-solid fa-thumbs-up green pointer"></i>
                                    {percentage(Object.values(spot?.Reviews))}%
                                </div>
                                <div className='ind-price pointer'>${addZero(spot.price)}/night</div>
                            </div>
                        </div> 
                    </Link>
                 )
                })
            )}
        </div>
        )}
        </div>
    )
}