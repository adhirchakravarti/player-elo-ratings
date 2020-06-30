import { spawn } from "redux-saga/effects";
import appSaga from "./saga";
import watchPollSaga from "./pollSaga";

function* rootSaga() {
  yield spawn(appSaga);
  yield spawn(watchPollSaga);
}

export default rootSaga;
