import { types } from "../types/fileTypes";

export default function fileReducer(state = {}, action) {
  const payload = action.payload;
  switch (action.type) {
    case types.NEW_FILE:
      return {
        files: [...state.files, newFile(state.files)]
      };
    case types.DELETE_FILE:
      console.log(payload);
      return {
        files: deleteFiles(state.files, payload.ids)
      };
    case types.ADD_SIZE:
      return {
        files: addSize(state.files)
      };
    case types.RANDOMIZE_SIZE:
      return {
        files: randomSize(state.files)
      };
    default:
      return state;
  }
}

const newFile = existingFiles => {
  const num = getNextUntitledFileNumber(existingFiles);
  let lastId = existingFiles[existingFiles.length - 1]?.id || 0;
  return {
    id: lastId + 1,
    file: `untitled${num > 0 ? num : ""}.txt`,
    size: Math.floor(Math.random() * 100)
  };
};

const getNextUntitledFileNumber = existingFiles => {
  const untitledNumberMapper = f => {
    const num = f.file.split(".")[0].match(/\d+/g);
    return num && num.length > 0 ? parseInt(num) : 0;
  };

  return (
    existingFiles
      .filter(f => f.file.startsWith("untitled"))
      .map(untitledNumberMapper)
      .reduce((n1, n2) => Math.max(n1, n2), -1) + 1
  );
};

const deleteFiles = function(existingFiles, ids) {
  return existingFiles.filter(f => !ids.includes(f.id));
};

const addSize = existingFiles =>
  existingFiles.map(function(file) {
    if (file.id % 2 === 0) {
      return {
        ...file,
        size: file.size + 1
      };
    } else {
      return {
        ...file
      };
    }
  });

const randomSize = existingFiles =>
  existingFiles.map(function(file) {
    return {
      ...file,
      size: Math.floor(Math.random() * 100)
    };
  });
