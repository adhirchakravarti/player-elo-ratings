import { call, put, take, delay, race, select } from "redux-saga/effects";
import moment from "moment";
import axiosGetRequest from "../../utils/axiosGetRequest";
import {
  START_POLLING,
  STOP_POLLING,
  POLL_DELAY,
  TIMESTAMP_PATH,
} from "./constants";
import { stopPolling, getMatches, showNotification } from "./actions";
import { selectLastUpdate } from "./selectors";

function* workerPollSaga(action) {
  while (true) {
    try {
      const path = TIMESTAMP_PATH;
      const response = yield call(axiosGetRequest, path);
      if (response instanceof Error) {
        throw response;
      }
      const { lastUpdated: retrievedTimestamp } = response;
      const selectedTimeStamp = yield select(selectLastUpdate);
      if (
        selectedTimeStamp !== "" &&
        moment(retrievedTimestamp).valueOf() >
          moment(selectedTimeStamp).valueOf()
      ) {
        yield put(
          showNotification({
            message: "Update check - Update Available, Retrieving...",
            type: "info",
          })
        );
        yield put(getMatches());
      } else if (selectedTimeStamp === "") {
        yield put(
          showNotification({
            message: "Retrieving Matches...",
            type: "info",
          })
        );
        yield put(getMatches());
      } else {
        yield put(
          showNotification({
            message: "Update check - Up to date",
            type: "info",
          })
        );
      }
      yield delay(POLL_DELAY);
    } catch (error) {
      console.warn(error);
      yield put(
        showNotification({
          message: `${error.toString()}`,
          type: "error",
        })
      );
      yield put(stopPolling(error));
    }
  }
}

export default function* watchPollSaga() {
  while (true) {
    yield take(START_POLLING);
    yield race([call(workerPollSaga), take(STOP_POLLING)]);
  }
}
