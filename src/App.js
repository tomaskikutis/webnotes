import React, { Component } from 'react';
import NoteEdit from './NoteEdit';
import NotesList from './NotesList';
import Routes from './Routes';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {
  render() {

    var currentView;

    var fullRoute = this.props.state.currentRoute;
    var baseRoute = fullRoute.indexOf("/") === -1 ? fullRoute : fullRoute.slice(0, fullRoute.indexOf("/"));

    switch(baseRoute){
      case Routes.notesList:
      case Routes.home:
        currentView = <NotesList notes={this.props.state.notes} actions={this.props.actions} />;
        break;
      case Routes.editNote:
        currentView = <NoteEdit state={this.props.state} actions={this.props.actions} />;
        break;
      default:
        currentView = (
          <div>
            <p>Route `{this.props.state.currentRoute}` not defined</p>
            <button className="btn btn-default" onClick={function(){this.props.actions.goToRoute(Routes.home)}.bind(this)}>Click here to go to the homepage</button>
          </div>
        );
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
