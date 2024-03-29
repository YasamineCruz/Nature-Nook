import { normalizeArray } from "../component-resources";
import { refreshUser } from "./session";

const CREATE_SPOT = "spots/CREATE_A_SPOT";
const GET_SPOTS = "spots/GET_ALL_SPOTS";
const GET_USER_SPOTS = "spots/GET_ALL_USER_SPOTS";
const GET_SPOT = "spots/GET_A_SPOT";
const EDIT_SPOT = 'spots/UPDATE_SPOT'
const DELETE_SPOT = 'spots/DELETE_A_SPOT'

const UPDATE_REVIEW = "spots/UPDATE_REVIEW";
const CREATE_REVIEW = "spots/CREATE_REVIEW";
const DELETE_REVIEW = "spots/DELETE_REVIEW";

const UPDATE_BOOKING = "spots/UPDATE_BOOKING";
const CREATE_BOOKING = "spots/CREATE_BOOKING";
const DELETE_BOOKING = "spots/DELETE_BOOKING"

/**** Actions for Spots****/

export const createASpot = (newSpot) => ({
  type: CREATE_SPOT,
  payload: newSpot,
});

export const getAllSpots = (allSpots) => ({
  type: GET_SPOTS,
  payload: allSpots,
});

export const getAUsersSpots = (userSpots) => ({
  type: GET_USER_SPOTS,
  payload: userSpots,
});

export const getASpot = (spot) => ({
  type: GET_SPOT,
  payload: spot,
});

export const updateASpot = (updatedSpot) => ({
  type: EDIT_SPOT,
  payload: updatedSpot,
});

export const deleteASpot = (spotId) => ({
  type: DELETE_SPOT,
  payload: spotId,
});

/**** Actions for Reviews*****/

export const updateAReview = (updatedReview) => ({
  type: UPDATE_REVIEW,
  payload: updatedReview
})

export const createAReview = (review) => ({
  type: CREATE_REVIEW,
  payload: review
})

export const deleteAReview = (reviewId, spotId) => ({
  type: DELETE_REVIEW,
  payload: { reviewId, spotId }
})


/**** Actions for Bookings ****/

export const updateABooking = (updatedBooking) => ({
  type: UPDATE_BOOKING,
  payload: updatedBooking
})

export const createABooking = (booking) => ({
  type: CREATE_BOOKING,
  payload: booking
})

export const deleteABooking = (bookingId, spotId) => ({
  type: DELETE_BOOKING,
  payload: { bookingId, spotId }
})

/**** Thunks for Spots ****/


export const createSpot = (spotInfo) => async (dispatch) => {

  const response = await fetch(`/api/spots/`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spotInfo),
  })

  if (response.ok) {
    const newSpot = await response.json();
    dispatch(createASpot(newSpot));
    return newSpot;
  }
}


export const getSpots = () => async (dispatch) => {
  const response = await fetch(`/api/spots/`);
  if (response.ok) {
    const allSpots = await response.json();
    dispatch(getAllSpots(allSpots.Spots));
    return allSpots;
  }
};

export const getUserSpots = () => async (dispatch) => {
  const response = await fetch(`/api/spots/current`);
  if (response.ok) {
    const userSpots = await response.json();

    dispatch(getAUsersSpots(userSpots.UserSpots));
    return userSpots;
  }
};

export const getSpot = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(getASpot(spot));
    return spot;
  }
};

export const updateSpot = (spotInfo, spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spotInfo),
  });
  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(updateASpot(updatedSpot));
    return updatedSpot;
  }
};


export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`,
    {
      method: "DELETE",
    }
  );
  if (response.ok) {
    const res = response.json()
    dispatch(deleteASpot(spotId));
    return res;
  }

};

/**** Thunks for Reviews****/

export const createReview = (spotId, reviewInfo) => async (dispatch) => {

  const response = await fetch(`/api/spots/${spotId}/reviews`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewInfo),
  })

  if (response.ok) {
    const newReview = await response.json();
    dispatch(createAReview(newReview));
    return newReview;
  }
}


export const updateReview = (reviewInfo, reviewId) => async (dispatch) => {

  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewInfo),
  });
  if (response.ok) {
    const updatedReview = await response.json();
    dispatch(updateAReview(updatedReview));
    return updatedReview;
  }
};


export const deleteReview = (reviewId, spotId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`,
    {
      method: "DELETE",
    }
  );
  if (response.ok) {
    const res = response.json()
    dispatch(deleteAReview(reviewId, spotId));
    return res;
  }
};

/*** Thunk for Bookings *****/


export const createBooking = (spotId, bookingInfo) => async (dispatch) => {

  const response = await fetch(`/api/spots/${spotId}/bookings`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingInfo),
  })


  if (response.ok) {
    const newBooking = await response.json();
    dispatch(createABooking(newBooking));
    return newBooking;
  } else {
    return {errors: 'Booking already taken'}
  }
}


export const updateBooking = (bookingInfo, bookingId) => async (dispatch) => {

  const response = await fetch(`/api/bookings/${bookingId}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingInfo),
  });
  if (response.ok) {
    const updatedBooking = await response.json();
    dispatch(updateABooking(updatedBooking));
    return updatedBooking;
  }
};


export const deleteBooking = (bookingId, userId) => async (dispatch) => {
  const response = await fetch(`/api/bookings/${bookingId}`,
    {
      method: "DELETE",
    }
  );
  if (response.ok) {
    const res = response.json()
    dispatch(refreshUser(userId));
    return res;
  }
};

const initialState = { allSpots: {}, userSpots: {}, singleSpot: {} };

export default function reducer(state = initialState, action) {

  let newState;

  switch (action.type) {

    case GET_SPOTS:
      newState = { allSpots: { ...state.allSpots }, userSpots: { ...state.userSpots }, singleSpot: { ...state.singleSpot } }
      newState.allSpots = normalizeArray(action.payload)
      return newState
    case GET_USER_SPOTS:
      newState = { allSpots: { ...state.allSpots }, userSpots: { ...state.userSpots }, singleSpot: { ...state.singleSpot } }
      newState.userSpots = action.payload
      return newState
    case GET_SPOT:
      newState = { allSpots: { ...state.allSpots }, userSpots: { ...state.userSpots }, singleSpot: { ...state.singleSpot } }
      newState.singleSpot = action.payload
      return newState
    case CREATE_SPOT:
      newState = { allSpots: { ...state.allSpots }, userSpots: { ...state.userSpots }, singleSpot: { ...state.singleSpot } }
      newState.allSpots[action.payload.id] = action.payload
      newState.singleSpot = action.payload
      return newState
    case EDIT_SPOT:
      newState = { allSpots: { ...state.allSpots }, userSpots: { ...state.userSpots }, singleSpot: { ...state.singleSpot } }
      newState.allSpots[action.payload.id] = action.payload
      newState.singleSpot = action.payload
      return newState
    case DELETE_SPOT:
      newState = { allSpots: { ...state.allSpots }, userSpots: { ...state.userSpots }, singleSpot: { ...state.singleSpot } }
      delete newState.allSpots[action.payload];
      delete newState.userSpots[action.payload];
      newState.singleSpot = {}
      return newState
    case UPDATE_REVIEW:
      newState = { allSpots: { ...state.allSpots }, userSpots: { ...state.userSpots }, singleSpot: { ...state.singleSpot } }
      if (Object.values(newState.allSpots).length >= 1) newState.allSpots[action.payload.spotId].Reviews[action.payload.id] = action.payload
      let reviews = [...newState.singleSpot.Reviews]

      for (let i = 0; i < reviews.length; i++) {
        let review = reviews[i];
        if (review.id === action.payload.id) reviews[i] = action.payload
      }

      newState.singleSpot.Reviews = reviews
      return newState
    case CREATE_REVIEW:
      newState = { allSpots: { ...state.allSpots }, userSpots: { ...state.userSpots }, singleSpot: { ...state.singleSpot } }
      let newReviews = [...newState.singleSpot.Reviews]
      newReviews.push(action.payload)
      newState.singleSpot.Reviews = newReviews
      return newState
    case DELETE_REVIEW:
      newState = { allSpots: { ...state.allSpots }, userSpots: { ...state.userSpots }, singleSpot: { ...state.singleSpot } }
      if (Object.values(newState.allSpots).length >= 1) delete newState.allSpots[action.payload.spotId].Reviews[action.payload.reviewId]
      let reviewsArr = newState.singleSpot.Reviews
      for (let i = 0; i < reviewsArr.length; i++) {
        let review = reviewsArr[i];
        if (review.id === action.payload.reviewId) reviewsArr.splice(i, 1)
      }
      newState.singleSpot.Reviews = reviewsArr
      return newState
    case UPDATE_BOOKING:
      newState = { allSpots: { ...state.allSpots }, userSpots: { ...state.userSpots }, singleSpot: { ...state.singleSpot } }
      if (Object.values(newState.allSpots).length >= 1) newState.allSpots[action.payload.spotId].Bookings[action.payload.id] = action.payload
      let bookings = [...newState.singleSpot.Bookings]
      for (let i = 0; i < bookings.length; i++) {
        let booking = bookings[i];
        if (booking.id === action.payload.id) bookings[i] = action.payload
      }
      newState.singleSpot.Bookings = bookings
      return newState
    case CREATE_REVIEW:
      newState = { allSpots: { ...state.allSpots }, userSpots: { ...state.userSpots }, singleSpot: { ...state.singleSpot } }
      let newBookings = [...newState.singleSpot.Bookings]
      newBookings.push(action.payload)
      newState.singleSpot.Bookings = newBookings
      return newState
    default:
      return state;
  }
};


