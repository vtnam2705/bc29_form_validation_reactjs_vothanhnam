import { combineReducers, createStore } from "redux";
import { FormReducer } from "./reducer/FormReducer";

const rootReducer = combineReducers({
    FormReducer,
});

export const store = createStore(rootReducer);