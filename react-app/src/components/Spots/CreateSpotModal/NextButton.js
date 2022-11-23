import { useSpotContext } from "../../../context/SpotContext"

export default function NextButton() {
    const {count, setCount} = useSpotContext()

    return (
        <>
        <button onClick={()=> setCount(count + 1)} className='NextButton'>Next</button>
        </>
    )
}