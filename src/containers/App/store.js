import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import rootReducer from "./reducer";

export const initialState = {
  matches: [],
  lastUpdate: "",
  playerRatingData: {},
  ratingTable: {
    columns: [],
    rowData: [],
  },
  notification: false,
  notificationType: "",
  notificationMessage: "",
};

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(rootReducer, initialState, enhancer);
sagaMiddleware.run(rootSaga);

export default store;
