import {createStore, applyMiddleware} from 'redux';

import fileReducer from './reducers/fileReducer';
import logger from "./middleware/logger";

const initialState = {
  files: [
    {id: 1, file: 'notes.txt',  size: 14.7},
    {id: 2, file: 'book.pdf',  size: 2.1},
    {id: 3, file: 'cv.pdf',  size: 2.4},
    {id: 4, file: 'xyz.txt',  size: 1.1},
    {id: 5, file: 'theme.mp3', size: 14.3},
    {id: 6, file: 'rock.mp3', size: 80.3},
    {id: 7, file: 'jazz.mp3', size: 90.5},
    {id: 8, file: 'abc.txt',  size: 4.3},
  ]
};

export default createStore(fileReducer, initialState, applyMiddleware(logger));