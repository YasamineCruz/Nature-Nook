import { Link } from "react-router-dom";
import './NotFound.css'

export default function NotFound() {
return (
<div className='page-not-found'>
    <h2 className='red'>404</h2>
    <h1>Adventuring to the wrong places I see.</h1>
    <p>Why don't we get you going in the right direction. Click the link below:</p>
    <Link className='home-link' to='/'>Home</Link>
</div>
)
}