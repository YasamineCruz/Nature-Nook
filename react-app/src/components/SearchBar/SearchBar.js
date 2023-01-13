import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { resetPrice } from "../Spots/CreateSpotModal/CreateSpotForm"
import './SearchBar.css'

export default function SearchBar() {
    const [searchWord, setSearchWord] = useState('')
    const [field, setField] = useState("")
    const history = useHistory()
    const [errors, setErrors] = useState([])

    useEffect(()=>{
        if(field) setErrors([])

    },[field])

    const onSubmit = (e) => {
        e.preventDefault()
        if(field === 'price') {
            let price = resetPrice(`${searchWord}`)
            history.push(`/search?f=${field}=q=${price}`)
        }
        if(field !== 'price') history.push(`/search?f=${field}=q=${searchWord}`)
    }

    const priceOnChange = (e) => {
            if(!field) {
                setErrors(['You must enter a field first.'])
                return
            }
            setSearchWord("")
            let regex = /^[.0-9\b]+$/
            let pArr = e.target.value.split("")
            if(pArr.find(e => e === '$')){
                let i = pArr.findIndex(e => e === '$')
                pArr.splice(i,1)
            }
            let p = pArr.join("")
            let testString = p.split('.')
            let pass = true
            if(testString.length >= 3) pass = false
            if(testString[0].length >= 10) pass = false
            if(testString.length === 2){
                if(testString[1].length >= 3) pass = false
            }
            if(p === '') setSearchWord(`${p}`)
            if(regex.test(p) && pass) setSearchWord(`$${p}`)
        }

    const onChange = (e) => {
        if(!field) {
            setErrors(['You must enter a field first.'])
            
        }
        if(field) setSearchWord(e.target.value)
    }

    return (
        <div className='search-bar-container'>
            <form className='search-bar-form' onSubmit={onSubmit}>
            { errors?.length >= 1 && (
                    <div className='create-event-errors'>
                        {errors.map((error, idx) => (
                            <div key={idx}>{error}</div>
                         ))}
                    </div>
                )}
                 <div className='search-by-field'>
                    <div className='search-bar-text'>Choose a category to search by</div>
                    <select onChange={(e) => { setField(e.target.value); setSearchWord('')}} id="field" name="field" required>
                        <option value="">Please Select</option>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                        <option value="type">Type</option>
                        <option value="activity">Activity</option>
                        <option value="amenity">Amenity</option>
                        <option value="city">City</option>
                        <option value="state">State</option>
                    </select>
                </div>
                {(field === 'city' || field === 'state' || field === 'name' || field === 'price') && (
                    <input
                    type='text'
                    onChange={field === 'price' ? priceOnChange : onChange}
                    value={searchWord}
                    placeholder='search here'
                    required
                    maxLength={15}
                    />
                )}
                {field === 'amenity' && (
                    <select onChange={(e) => setSearchWord(e.target.value)} id="amenity" name="amenity" required>
                        <option value="">Please Select</option>
                        <option value="Picnic-table">Picnic Table</option>
                        <option value="Trash-cans">Trash cans</option>
                        <option value="Showers">Showers</option>
                        <option value="Wifi">Wifi</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Drinking-water">Drinking Water</option>
                        <option value="Laundry">Laundry</option>
                        <option value='Toilet'>Toilet</option>
                        <option value='Hot-tub'>Hot tub</option>
                        <option value='Campfires-allowed'>Campfires Allowed</option>
                        <option value='Pets allowed'>Pets allowed</option>
                    </select>
                )}
                {field === 'activity' && (
                     <select onChange={(e) => setSearchWord(e.target.value)} id="amenity" name="amenity" required>
                     <option value="">Please Select</option>
                     <option value="Boating">Boating</option>
                     <option value="Fishing">Fishing</option>
                     <option value="Hiking">Hiking</option>
                     <option value="Climbing">Climbing</option>
                     <option value="Surfing">Surfing</option>
                     <option value="Swimming">Swimming</option>
                     <option value="Horseback">Horseback ridding</option>
                     <option value='Snow'>Snow</option>
                     <option value='Whitewater-rafting'>Whitewater rafting</option>
                     <option value='Paddling'>Paddling</option>
                     <option value='Wind-sports'>Wind sports</option>
                     <option value='Wildlife-watching'>Wildlife watching</option>
                 </select>
                )}
                {field === 'type' && (
                        <select onChange={(e) => setSearchWord(e.target.value)} id="amenity" name="amenity" required>
                            <option value="">Please Select</option>
                            <option value='lodging'>Lodging</option>
                            <option value='campsite'>Campsite</option>
                        </select>               
                )}

                <button className='sign-up-button' type='submit'>Submit</button>
            </form>
        </div>
    )
}