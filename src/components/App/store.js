import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import rootReducer from "./reducer";

const initialState = {
  matches: [],
  lastUpdate: "",
  playerRatingData: {},
  ratingTable: {
    columns: [],
    rowData: [],
  },
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
sagaMiddleware.run(rootSaga);

export default store;
