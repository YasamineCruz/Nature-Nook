import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { resetPrice } from "../Spots/CreateSpotModal/CreateSpotForm"
import './SearchBar.css'

export default function SearchBar() {
    const [searchWord, setSearchWord] = useState('')
    const [field, setField] = useState("state")
    const history = useHistory()
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (field) setErrors([])

    }, [field])

    const onSubmit = (e) => {
        e.preventDefault()
        if (field === 'price') {
            let price = resetPrice(`${searchWord}`)
            history.push(`/search?f=${field}=q=${price}`)
        }
        if (field !== 'price') history.push(`/search?f=${field}=q=${searchWord}`)
    }

    const priceOnChange = (e) => {
        if (!field) {
            setErrors(['You must enter a field first.'])
            return
        }
        setSearchWord("")
        let regex = /^[.0-9\b]+$/
        let pArr = e.target.value.split("")
        if (pArr.find(e => e === '$')) {
            let i = pArr.findIndex(e => e === '$')
            pArr.splice(i, 1)
        }
        let p = pArr.join("")
        let testString = p.split('.')
        let pass = true
        if (testString.length >= 3) pass = false
        if (testString[0].length >= 10) pass = false
        if (testString.length === 2) {
            if (testString[1].length >= 3) pass = false
        }
        if (p === '') setSearchWord(`${p}`)
        if (regex.test(p) && pass) setSearchWord(`$${p}`)
    }

    const onChange = (e) => {
        if (!field) {
            setErrors(['You must enter a field first.'])

        }
        if (field) setSearchWord(e.target.value)
    }

    return (
        <div className='search-bar-container'>
            <form className='search-bar-form' onSubmit={onSubmit}>
                {errors?.length >= 1 && (
                    <div className='create-event-errors'>
                        {errors.map((error, idx) => (
                            <div key={idx}>{error}</div>
                        ))}
                    </div>
                )}
                <div className='input-holder'>
                <i className="fa-solid fa-location-dot tag-me-in"></i>
                    <input
                        className='input-field'
                        type='text'
                        onChange={field === 'price' ? priceOnChange : onChange}
                        value={searchWord}
                        placeholder='Enter a State'
                        required
                        maxLength={15}
                    />
                </div>
                <button className='search-button' type='submit'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <div>Search</div>
                </button>
            </form>
        </div>
    )
}