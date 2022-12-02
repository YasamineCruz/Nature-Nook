export default function AmenityCard({amenitiesList, spot, laundry, picnic, toilet, fire}){
    return (
        <div className='amenities-card-wrapper'>
        <div className='big-Amenities'>Amenities</div>
        {amenitiesList.map(amenity => {
            let og = amenity
            let amenities;
            if(spot.amenities) amenities = spot.amenities.toLowerCase()
            amenity = amenity.split("-").join(" ")
            if(amenity === 'I have none of these') return null
            if(amenity === 'Drinking water') {
                return (
                    <div className='lil-amenity-wrapper'>
                       <i className={amenities?.includes(og.toLowerCase()) ? "fa-sharp fa-solid fa-faucet icon" : "fa-regular fa-circle-xmark icon"}></i>
                        <div className='lil-amenity'> {amenities?.includes(og.toLowerCase()) ? `Portable water available` : `No Portable water`} </div>
                    </div>
                )
            }
            if(amenity === 'Trash cans') {
                return (
                    <div className='lil-amenity-wrapper'>
                        <i className={amenities?.includes(og.toLowerCase()) ? "fa-solid fa-trash-can icon" : "fa-regular fa-circle-xmark icon"}></i>
                        <div className='lil-amenity'> {amenities?.includes(og.toLowerCase()) ? `${amenity} available` : `No ${amenity}`} </div>
                    </div>
                )
            }
            if(amenity === 'Kitchen') {
                return (
                    <div className='lil-amenity-wrapper'>
                        <i className={amenities?.includes(og.toLowerCase()) ? "fa-solid fa-utensils icon" : "fa-regular fa-circle-xmark icon"}></i>
                        <div className='lil-amenity'> {amenities?.includes(og.toLowerCase()) ? `${amenity} available` : `No ${amenity}`} </div>
                    </div>
                )
            }
            if(amenity === 'Showers'){
                return (
                    <div className='lil-amenity-wrapper'>
                        <i className={amenities?.includes(og.toLowerCase()) ? "fa-solid fa-bath icon" : "fa-regular fa-circle-xmark icon"}></i>
                        <div className='lil-amenity'> {amenities?.includes(og.toLowerCase()) ? `${amenity} available` : `No ${amenity}`} </div>
                    </div>
                )
            }
            if(amenity === 'Picnic table'){
                return (
                    <div className='lil-amenity-wrapper'>
                    {amenities?.includes(og.toLowerCase()) && (
                        <div className='lil-amenity-wrapper no-padding'>
                            <img className='icon' src={picnic} alt=''/>
                            <div className='lil-amenity'>{amenity}</div> 
                        </div>
                    )}
                    {!amenities?.includes(og.toLowerCase()) && (
                        <div className='lil-amenity-wrapper no-padding'>
                            <i className='fa-regular fa-circle-xmark icon'></i>
                            <div className='lil-amenity'>No {amenity}</div>
                        </div>
                    )}
                    </div>
                )
            }
            if(amenity === 'Wifi'){
                return (
                    <div className='lil-amenity-wrapper'>
                     <i className={amenities?.includes(og.toLowerCase()) ? "fa-solid fa-wifi icon": "fa-regular fa-circle-xmark icon"}></i>
                     <div className='lil-amenity'> {amenities?.includes(og.toLowerCase()) ? `${amenity} available` : `No ${amenity}`} </div>
                    </div>
                )
            }
            if(amenity === 'Laundry'){
                return (
                    <div className='lil-amenity-wrapper'>
                    {amenities?.includes(og.toLowerCase()) && (
                        <div className='lil-amenity-wrapper no-padding'>
                            <img className='icon' src={laundry} alt=''/>
                            <div className='lil-amenity'>{amenity}</div> 
                        </div>
                    )}
                    {!amenities?.includes(og.toLowerCase()) && (
                        <div className='lil-amenity-wrapper no-padding'>
                            <i className='fa-regular fa-circle-xmark icon'></i>
                            <div className='lil-amenity'>No {amenity}</div>
                        </div>
                    )}
                    </div>
                )
            }
            if(amenity === 'Toilet'){
                return (
                    <div className='lil-amenity-wrapper'>
                    {amenities?.includes(og.toLowerCase()) && (
                        <div className='lil-amenity-wrapper no-padding'>
                            <img className='icon' src={toilet} alt=''/>
                            <div className='lil-amenity'>{amenity}</div> 
                        </div>
                    )}
                    {!amenities?.includes(og.toLowerCase()) && (
                        <div className='lil-amenity-wrapper no-padding'>
                            <i className='fa-regular fa-circle-xmark icon'></i>
                            <div className='lil-amenity'>No {amenity}</div>
                        </div>
                    )}
                    </div>
                )
            }
            if(amenity === 'Hot Tub'){
                return (
                    <div className='lil-amenity-wrapper'>
                        <i className={amenities?.includes(og.toLowerCase()) ? "fa-solid fa-hot-tub-person icon": "fa-regular fa-circle-xmark icon"}></i>
                        <div className='lil-amenity'> {amenities?.includes(og.toLowerCase()) ? `${amenity} available` : `No ${amenity}`} </div>
                    </div>
                )
            }
            if(amenity === 'Campfires allowed'){
                return (
                    <div className='lil-amenity-wrapper'>
                    {amenities?.includes(og.toLowerCase()) && (
                        <div className='lil-amenity-wrapper no-padding'>
                            <img className='icon' src={fire} alt=''/>
                            <div className='lil-amenity'>{amenity}</div> 
                        </div>
                    )}
                    {!amenities?.includes(og.toLowerCase()) && (
                        <div className='lil-amenity-wrapper no-padding'>
                            <i className='fa-regular fa-circle-xmark icon'></i>
                            <div className='lil-amenity'>No {amenity}</div>
                        </div>
                    )}
                    </div>
                )
            }
            if(amenity === 'Pets allowed'){
                return (
                    <div className='lil-amenity-wrapper'>
                        <i class={amenities?.includes(og.toLowerCase()) ? "fa-solid fa-paw": "fa-regular fa-circle-xmark icon"}></i>
                        <div className='lil-amenity'> {amenities?.includes(og.toLowerCase()) ? `${amenity} available` : `No ${amenity}`} </div>
                    </div>
                )
            }
        })}
    </div>
    )
}