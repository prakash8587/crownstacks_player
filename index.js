/**
 * @format
 */
import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import Navigation from './src/navigation/Navigation';
import {name as appName} from './app.json';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import Reducer from './src/redux/reducer/reducer';
import createSagaMiddleware from 'redux-saga';
import songSaga from './src/redux/saga/saga';

const sagaMiddleware = createSagaMiddleware();
let store = createStore(Reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(songSaga);

export class AppRoot extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => AppRoot);
