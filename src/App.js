import React, { Component } from 'react';
import CreateNote from './CreateNote';
import NotesList from './NotesList';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>

        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="btn btn-default navbar-btn x-navbar-right" aria-label="New note">
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              </button>
              <a className="navbar-brand" href="#">WebNotes</a>
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          <CreateNote actions={this.props.actions} />
          <NotesList notes={this.props.notes} />
        </div>

      </div>
    );
  }
}

export default App;
