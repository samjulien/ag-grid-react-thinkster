import { createStore, applyMiddleware } from "redux";

import columnReducer from "./reducers/columnReducer";
import logger from "./middleware/logger";

const initialColumns = [
  {
    colId: "athlete",
    field: "athlete"
  },
  {
    colId: "sport",
    field: "sport"
  },
  {
    colId: "age",
    field: "age"
  },
  {
    colId: "year",
    field: "year"
  }
];

const initialState = {
  columnDefs: initialColumns
};

export default createStore(
  columnReducer,
  initialState,
  applyMiddleware(logger)
);
