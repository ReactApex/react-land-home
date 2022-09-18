import { csrfFetch } from "./csrf";

export const LOAD_CAMPSITES = "campsites/loadCampsites";

//=========================================================
// This is the action creator for the LOAD_CAMPSITES action
//=========================================================
const loadCampsites = (campsites) => {
  return {
    type: LOAD_CAMPSITES,
    campsites
  };
};

//=========================================================
// This is the thunk action creator for the LOAD_CAMPSITES action
//=========================================================
export const getCampsites = () => async (dispatch) => {
  const response = await csrfFetch("/api/campsites");

  if (response.ok) {
    const campsites = await response.json();
    dispatch(loadCampsites(campsites));
  }
};

//=========================================================
// This is the reducer for the LOAD_CAMPSITES action
//=========================================================
let newState = {};

const campsiteReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_CAMPSITES:
      newState = { ...state };
      action.campsites.forEach((campsite) => {
        newState[campsite.id] = campsite;
      });
      return newState;
    default:
      return state;
  }
};

export default campsiteReducer;
