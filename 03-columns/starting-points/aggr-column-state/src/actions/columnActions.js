import { types } from "../types/columnTypes";

export const actions = {
  groupColumn() {
    return {
      type: types.GROUP_COLUMN,
      payload: {}
    };
  },
  updateHeaderName() {
    return {
      type: types.UPDATE_HEADER_NAME,
      payload: {}
    };
  },
  changeColumns() {
    return {
      type: types.CHANGE_COLUMNS,
      payload: {}
    };
  }
};
