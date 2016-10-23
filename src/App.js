import React, { Component } from 'react';
import CreateNote from './CreateNote';
import NotesList from './NotesList';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <CreateNote actions={this.props.actions} />
        <NotesList notes={this.props.notes} />
      </div>
    );
  }
}

export default App;
