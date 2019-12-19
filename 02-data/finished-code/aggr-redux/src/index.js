import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import store from './store';
import FileView from './FileView';
import './index.css';

const rootDiv = document.getElementById('root');

const comp =
  <div>
    <div className={'btn-padding'}>
    </div>
    <Provider store={store}>
      <FileView/>
    </Provider>
  </div>;

ReactDOM.render(comp, rootDiv);

