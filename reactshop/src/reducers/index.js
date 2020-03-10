import hkReducer from "./hkReducer";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer"
import {combineReducers} from "redux";

let reducers=combineReducers({
    hk:hkReducer,
    cart:cartReducer,
    user:userReducer
});
export default reducers;