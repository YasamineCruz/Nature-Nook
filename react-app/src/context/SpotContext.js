import { createContext, useContext, useState } from 'react';

export const SpotContext = createContext();

export const useSpotContext = () => useContext(SpotContext);

export const SpotProvider = ({children}) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [amenities, setAmenities] = useState("")
    const [type, setType] = useState("")
    const [count, setCount] = useState(0)
    const [activities, setActivities] = useState("")
    const [errors, setErrors] = useState([]);

    return (
        <SpotContext.Provider
        value={{price,
                setPrice,
                name,
                setName,
                description,
                setDescription,
                state,
                setState,
                country,
                setCountry,
                amenities,
                setAmenities,
                count, 
                setCount,
                activities,
                setActivities,
                errors,
                setErrors,
                city,
                setCity,
                type,
                setType
                }}>
            {children}
        </SpotContext.Provider>
    );
};