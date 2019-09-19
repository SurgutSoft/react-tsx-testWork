import React from 'react';
import Description from './Description';
import Matrix from './components/Matrix';
import 'antd/dist/antd.css';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <div>
        <Description countBy={3} />

        <Matrix />
      </div>
    )
  }
}

export default App;
