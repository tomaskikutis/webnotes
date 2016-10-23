import React, { Component } from 'react';
import CreateNote from './CreateNote';
import NotesList from './NotesList';
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {

    var currentView;

    switch(this.props.state.currentRoute){
      case Routes.notesList:
        currentView = <NotesList notes={this.props.state.notes} />;
        break;
      case Routes.editNote:
        currentView = <CreateNote actions={this.props.actions} />;
        break;
      default:
        currentView = <p>Route `{this.props.state.currentRoute}` not defined</p>;
    }

    var backButton = this.props.state.currentRoute === Routes.home ? "" : (
      <button onClick={function(){this.props.actions.goToPreviousRoute()}.bind(this)} type="button" className="btn btn-default navbar-btn x-navbar-left" aria-label="Back">
        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      </button>
    );

    return (
      <div>

        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button onClick={function(){this.props.actions.goToRoute(Routes.editNote)}.bind(this)} type="button" className="btn btn-default navbar-btn x-navbar-right" aria-label="New note">
                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
              </button>
              {backButton}
              <a className="navbar-brand" href="#">WebNotes</a>
            </div>
          </div>
        </nav>

        <div className="container-fluid">
          {currentView}
        </div>

      </div>
    );
  }
}

export default App;
