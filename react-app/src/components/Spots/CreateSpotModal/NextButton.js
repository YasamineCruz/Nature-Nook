

export default function NextButton({count, setCount, errors, setSubmitted}) {

    return (
        <>
        <button type='button' onClick={()=> {
            if(errors.length <= 0){
             setCount(count + 1)
             setSubmitted(false)   
            }
            else setSubmitted(true)
            
        }} className='NextButton'>Next</button>
        </>
    )
}