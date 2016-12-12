import React, { Component } from 'react';
import SearchForm from '../components/SearchForm';
import Tabs from '../components/Tabs';

class App extends Component {

  render() {

    return (
      <div>
        Hello World
      </div>
      <header>
        <SearchForm formId="form" />
        <Tabs />
      </header>
    );
  }
}

export default App;
