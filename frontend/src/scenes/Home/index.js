import React, { Component } from 'react';
import './App.css';
import Categories from './components/Categories.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>
        <section>
          <Categories />
        </section>
        <p className="App-intro">
          To start, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
