import './Footer.css'
import logo from '../../assets/logo/naturenook-favicon.png'

export default function Footer() {
    let date = new Date()
    let year = date.getFullYear()
    return (
        <footer>
            <div className='link' onClick={()=> window.open('https://github.com/YasamineCruz', '_blank')}><i className="fa-brands fa-github-alt"></i></div>
            <div className='bottom-not-link'> 
            <img className='img-small' src={logo} alt=''/> / © {year}
            </div>
            <div className='link' onClick={()=> window.open('https://www.linkedin.com/in/yasamine-cruz-7b6867256/', '_blank')}><i className="fa-brands fa-linkedin"></i></div>
        </footer>
    )
}