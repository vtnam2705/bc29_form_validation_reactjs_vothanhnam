import { ADD_USER, UPDATE_USER } from "../type/FormType";

const addAction = (value) => {
    return {
        type: ADD_USER,
        payload: value,
    }
}


const updateAction = (value) => {
    return {
        type: UPDATE_USER,
        payload: value,
    }
}

export {
    addAction,
    updateAction,
};