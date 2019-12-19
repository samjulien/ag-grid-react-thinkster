import { types } from "../types/fileTypes";

export const actions = {
  newFile(file) {
    return {
      type: types.NEW_FILE,
      payload: { file }
    };
  },
  deleteFiles(ids) {
    return {
      type: types.DELETE_FILE,
      payload: { ids }
    };
  },
  addSize() {
    return {
      type: types.ADD_SIZE
    };
  },
  randomSize() {
    return {
      type: types.RANDOMIZE_SIZE
    };
  }
};
