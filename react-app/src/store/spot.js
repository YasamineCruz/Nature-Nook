import { normalizeArray } from "../component-resources";

const CREATE_SPOT = "spots/CREATE_A_SPOT";
const GET_SPOTS = "spots/GET_ALL_SPOTS";
const GET_USER_SPOTS = "spots/GET_ALL_USER_SPOTS";
const GET_SPOT = "spots/GET_A_SPOT";
const EDIT_SPOT = 'spots/UPDATE_SPOT'
const DELETE_SPOT = 'spots/DELETE_A_SPOT'


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

export const  updateASpot = (updatedSpot) => ({
  type: EDIT_SPOT,
  payload: updatedSpot,
});

export const deleteASpot = (spotId) => ({
  type: DELETE_SPOT,
  payload: spotId,
});


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
    console.log(spot)
    dispatch(getASpot(spot));
    return spot;
  }
};

export const updateSpot = (spotInfo, spotId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${spotId}`, {
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


const initialState = { allSpots: {}, userSpots: {}, singleSpot: {}};

export default function reducer(state = initialState, action) {

  let newState;

  switch (action.type) {
    
    case GET_SPOTS:
        newState = { allSpots: {...state.allSpots}, userSpots: {...state.userSpots}, singleSpot: { ...state.singleSpot}}
        newState.allSpots = normalizeArray(action.payload)
        return newState
    case GET_USER_SPOTS:
        newState = { allSpots: {...state.allSpots}, userSpots: {...state.userSpots}, singleSpot: { ...state.singleSpot}}
        newState.userSpots = action.payload
        return newState
    case GET_SPOT:
        newState = { allSpots: {...state.allSpots}, userSpots: {...state.userSpots}, singleSpot: { ...state.singleSpot}}
        newState.singleSpot = action.payload
        return newState
    case CREATE_SPOT:
        newState = { allSpots: {...state.allSpots}, userSpots: {...state.userSpots}, singleSpot: { ...state.singleSpot}}
        newState.allSpots[action.payload.id] = action.payload
        newState.singleSpot = action.payload
        return newState
    case EDIT_SPOT:
        newState = { allSpots: {...state.allSpots}, userSpots: {...state.userSpots}, singleSpot: { ...state.singleSpot}}
        newState.allSpots[action.payload.id] = action.payload
        newState.singleSpot = action.payload
        return newState
    case DELETE_SPOT:
        newState = { allSpots: {...state.allSpots}, userSpots: {...state.userSpots}, singleSpot: { ...state.singleSpot}}
        delete newState.allSpots[action.payload];
        delete newState.userSpots[action.payload];
        newState.singleSpot = {}
        return newState
    default:
      return state;
  }
};


