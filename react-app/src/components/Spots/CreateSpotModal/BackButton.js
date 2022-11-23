import { useSpotContext } from "../../../context/SpotContext"

export default function BackButton() {
    const {count, setCount} = useSpotContext()
    return (
        <>
        <button onClick={()=> setCount(count - 1)} className='BackButton'>Back</button>
        </>
    )
}