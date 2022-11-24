
export default function BackButton({count, setCount}) {
    
    return (
        <>
        <button type='button' onClick={()=> setCount(count - 1)} className='BackButton'>Back</button>
        </>
    )
}