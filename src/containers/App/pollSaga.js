import { call, put, take, delay, race, select } from "redux-saga/effects";
import moment from "moment";
import axiosGetRequest from "../../utils/axiosGetRequest";
import {
  START_POLLING,
  STOP_POLLING,
  POLL_DELAY,
  TIMESTAMP_PATH,
} from "./constants";
import {
  stopPolling,
  getMatches,
  calculatePlayerRatings,
  getLatestTimeStamp,
  showNotification,
} from "./actions";
import { selectLastUpdate } from "./selectors";

function* workerPollSaga(action) {
  while (true) {
    try {
      const path = TIMESTAMP_PATH;
      const response = yield call(axiosGetRequest, path);
      if (response.error) {
        throw response.error;
      }
      const { lastUpdated: retrievedTimestamp } = response;
      const selectedTimeStamp = yield select(selectLastUpdate);
      if (
        selectedTimeStamp !== "" &&
        moment(retrievedTimestamp).valueOf() >
          moment(selectedTimeStamp).valueOf()
      ) {
        yield put(getMatches());
        yield put(
          showNotification({
            message: "Update check - Update available!",
            type: "info",
          })
        );
      } else {
        yield put(
          showNotification({
            message: "Update check - Up to date",
            type: "info",
          })
        );
      }
      // yield put(getMatchesSuccess(response));
      // yield put(calculatePlayerRatings(response));
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
