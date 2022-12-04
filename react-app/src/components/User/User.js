import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { addZero } from '../../component-resources';
import NotFound from '../NotFound/NotFound';
import { percentage } from '../Spots/GetASpot/GetASpot';
import './User.css'
import loadingImg from '../../assets/logo/loading.gif'
import UserPhotoModal from './UserModal';

function User() {
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const currentUser = useSelector((state)=>state.session.user)
  const [loading, setLoading] = useState(false)
  const [update, setUpdate] = useState(false)


  useEffect( () => {
    let timer1 = setTimeout(() => setLoading(true), 2000);
    return () => clearTimeout(timer1);
  },[]);

 

  useEffect(() => {
    if (!userId) {
      return;
    }

    
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
    if(update) setUpdate(false)
  }, [userId, update]);

  const deletePhoto = async() => {
    await fetch(`/api/user_photos/`, 
                {
                method: "DELETE",
                })
    setUpdate(true)
    };

 
  if(Object.values(user).length <= 0 && loading) return (<NotFound />)


  return (
    <div>
        {!loading && (
                  <div className='bg-brown'>
                      <img className='loading2' src={loadingImg} alt=''/>
                  </div>
        )}
      <div className='a-user-container'>
        {loading && user && user.userPhotos && (
        <div className='user-page-container'>
          <div className='left-side'>
              <div className='user-page-left'>
                <div className='user-page-user-info'>
                  <div className='img-user-container'>
                    <img className='user-img' src={user?.userPhotos[0]?.url ? user?.userPhotos[0]?.url : 'https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns='} alt=''/>
                    {user?.id === currentUser?.id && (
                      <div className={user?.userPhotos?.length >= 1 ? 'user-delete-photo' : 'user-edit-photo'}>
                        {user?.userPhotos?.length >= 1 && (
                          <i className="fa-solid fa-trash-can pointer" onClick={deletePhoto}></i>
                        )}
                        <UserPhotoModal setUpdate={setUpdate} id={currentUser.id} type={user.userPhotos && user.userPhotos.length >= 1 ? 'put' : 'post'}/>
                      </div>
                    )}
                  </div>
                  <div className='user-name'>{user.firstName} {user.lastName[0]}.</div>
                </div>
                <div className='trusted-user'>
                  <i className="fa-solid fa-heart ind3"></i>
                  <div>NatureNooker since {user.joinDate.split('/')[2]}</div>
                </div>
              </div>
              <div className='left-bot'>
                  <div className='nooker'>Trusted NatureNooker</div>
                  <div className='nooker-2'>
                    <i class="fa-solid fa-circle-check ind4 pointer"></i>
                    Email Address
                  </div>
              </div>
            </div>
            <div className='user-page-right'>
              <div className='user-listings-container'>
                  {user.Spots.length <= 0 && (
                    <h2>{user.firstName} {user.lastName[0]}. has no listings available.</h2>
                  )}
                  {user.Spots && (
                    <div className='user-spots-container'>
                        {user.Spots.map(spot => {
                          return (
                            <Link className='user-spot-wrapper pointer' to={`/spots/${spot.id}`}>
                            <div className='spot-img-container pointer'>
                                <img className='user-small-spot-img pointer' src={Object.values(spot.Photos)[0]?.url ? Object.values(spot.Photos)[0]?.url : 'https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns='} alt=''/>
                            </div>
    
                            <div className='user-spot-info-container pointer'>
                                <div className='name-container pointer'>
                                    <div className='user2-name-wrapper pointer'>
                                       <h1 className='user-spot-name pointer'>{spot.name}</h1>
                                        <i class="fa-solid fa-circle-check ind2 pointer"></i> 
                                    </div>
                                    <div className='type-container pointer'>
                                    <i class={spot.type === 'lodging' ? "fa-solid fa-house type pointer" : "fa-sharp fa-solid fa-campground type pointer"}></i>
                                    </div>
                                </div>
                                <div className='spot-text pointer'>{spot.city} {spot.state} {spot.country}</div>
                                <div className='price-container pointer'>
                                    <div className='reviews-info-container pointer'>
                                        <i class="fa-solid fa-thumbs-up green pointer"></i>
                                        {percentage(Object.values(spot?.Reviews))}%
                                    </div>
                                    <div className='ind-price pointer'>${addZero(spot.price)}/night</div>
                                </div>
                            </div> 
                        </Link>
                          )
                        })}
                    </div>
                  )}
              </div>
            </div>
        </div>
        )}
      </div>
        

    </div>
  );
}
export default User;
