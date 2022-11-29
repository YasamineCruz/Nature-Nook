import './SplashPage.css'

export default function SplashPage() {
    return (
        <div className='splash-page-container'>
            <div className='splash-page-upper-container'>
                <h1 className='splash-h1'>Find yourself outside.</h1>
                <h3 className='splash-h3'>Discover and book tent camping, RV parks, cabins, treehouses, and glamping.</h3>
            </div>
            <div className='splash-page-img-container'>
                <img className='splash-page-img' src='https://thegeekycamper.com/wp-content/uploads/2020/11/Olympic-National-Park-Campgrounds-Guide-scaled.jpg' alt=''></img>
            </div>
        </div>
    )
}