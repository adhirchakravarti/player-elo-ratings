import { call, put, take, delay, race } from "redux-saga/effects";
import axiosGetRequest from "../../utils/axiosGetRequest";
import {
  START_POLLING,
  STOP_POLLING,
  POLL_DELAY,
  SERVER_PATH,
} from "./constants";
import {
  stopPolling,
  getMatchesSuccess,
  calculatePlayerRatings,
} from "./actions";

function* workerPollSaga(action) {
  while (true) {
    try {
      const path = SERVER_PATH;
      const response = yield call(axiosGetRequest, path);
      if (response.error) {
        throw response.error;
      }
      yield put(getMatchesSuccess(response));
      yield put(calculatePlayerRatings(response));
      yield delay(POLL_DELAY);
    } catch (error) {
      console.warn(error);
      yield put(stopPolling(error));
    }
  }
}

export default function* watchPollSaga() {
  while (true) {
    // const data = yield take(START_POLLING);
    yield take(START_POLLING);
    yield race([call(workerPollSaga), take(STOP_POLLING)]);
  }
}
