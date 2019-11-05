import React from 'react';
import Chart from './components/Charts'
import configureStore from './redux/store/ConfigureStore';
import { Provider } from 'react-redux';
import './App.css';

const store = configureStore();

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Chart />
      </Provider>
    )
  }

}

export default App;
