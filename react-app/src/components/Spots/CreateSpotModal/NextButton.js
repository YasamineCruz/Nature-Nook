export default function NextButton(count, setCount) {
    return (
        <>
        <button onClick={()=> setCount(count + 1)} className='NextButton'>Next</button>
        </>
    )
}