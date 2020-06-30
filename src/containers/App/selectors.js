import { initialState } from "./reducer";

const selectAppState = (state) => state || initialState;

const selectLastUpdate = (state) => state.lastUpdate;

export { selectAppState, selectLastUpdate };
