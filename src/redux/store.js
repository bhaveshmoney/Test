import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import reduxThunk from "redux-thunk";
import rootReducer from "./root-reducer";

const middlewares = [reduxThunk];


const store = createStore(rootReducer, applyMiddleware(logger,...middlewares),);

export default store;
