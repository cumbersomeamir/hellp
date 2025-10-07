import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#2d2d2d" />
      <AppNavigator />
    </Provider>
  );
}

export default App;

