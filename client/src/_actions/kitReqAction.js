import axios from "axios";
import { setAlert } from "./alertAction";
import * as types from "./types";

// Get current kitrequest
export const getCurrentKitReq = id => async dispatch => {
    try {
        const res = await axios.get(`/api/kitrequest/${id}`);
        console.log(res.data);

        dispatch({
            type: types.GET_KIT_REQ,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: types.KIT_REQ_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get User KitReqs
export const getKitReqs = () => async dispatch => {
    try {
        const res = await axios.get("/api/kitrequest");
        console.log(res.data);
        dispatch({
            type: types.GET_KIT_REQS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.KIT_REQ_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};

//Get All KitReqs
export const getAllKitReqs = () => async dispatch => {
    try {
        const res = await axios.get("/api/kitrequest/getAll");
        console.log(res.data.data);
        dispatch({
            type: types.GET_ALL_KIT_REQS,
            payload: res.data.data
        });
    } catch (err) {
        console.log(err);
        // dispatch({
        //   type: types.KIT_REQ_ERROR,
        //   payload: { msg: err.response.data, status: err.response.status }
        // });
    }
};

// Add kitrequest
export const addKitReq = (formData, history) => async dispatch => {
    console.log(formData);

    try {

        dispatch({
            type: types.ADD_KIT_REQ,
            sendingPayload: true
        });

        const res = await axios.post("/api/kitrequest", formData);
        dispatch({
            type: types.ADD_KIT_REQ,
            payload: res.data,
            sendingPayload: false

        });

        dispatch(setAlert("KitReq Added!", "success"));
        history.push("/");

    } catch (err) {
        // const errors = err.response.data.errors;

        if (err) {
            dispatch(setAlert("Something went wrong, try again", "danger"));
        }

        dispatch({
            type: types.KIT_REQ_ERROR
        });
    }
};

// Edit kitrequest
export const editKitReq = (formData, history, id) => async dispatch => {
    try {
        const res = await axios.patch(`/api/kitrequest/${id}`, formData);

        dispatch({
            type: types.GET_KIT_REQ,
            payload: res.data
        });


        history.push("/");
        dispatch(setAlert("KitReq Updated", "success"));
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: types.KIT_REQ_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Delete kitrequest
export const deleteKitReq = id => async dispatch => {
    if (window.confirm("Are you sure?")) {
        try {
            await axios.delete(`/api/kitrequest/${id}`);
            dispatch({
                type: types.DELETE_KIT_REQ,
                payload: id
            });
            dispatch(setAlert("KitReq Deleted!", "danger"));
        } catch (err) {
            dispatch({
                type: types.KIT_REQ_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }
};

//Set Current kitrequest
export const setCurrentKitReq = kitrequest => async dispatch => {
    dispatch({
        type: types.SET_CURRENT_KIT_REQ,
        payload: kitrequest
    });
};

// Clear kitrequest
export const clearKitReq = () => async dispatch => {
    dispatch({ type: types.CLEAR_KIT_REQ });
};

//Filter kitrequest
export const filterstate = text => async dispatch => {
    dispatch({ type: types.FILTER_KIT_REQ, payload: text });
};

// Clear Filter
export const clearFilter = () => async dispatch => {
    dispatch({ type: types.CLEAR_FILTER });
};
