import React, { Component } from 'react';
import Routes from './Routes';

const localStorageStateKey = 'state';

class Store extends Component {
  constructor(props) {
    super(props);

    var savedState = localStorage.getItem(localStorageStateKey);

    this.state = savedState !== null ? JSON.parse(savedState) : {
      notesLastId: 0,
      notes: [],
      currentRoute: Routes.notesList,
      routesHistory: []
    };

    this.actions = {
      createNote: this.actionCreateNote.bind(this),
      goToRoute: this.actionGoToRoute.bind(this),
      goToPreviousRoute: this.actionGoToPreviousRoute.bind(this)
    };
  }
  setStateAndPersist(nextState){
    this.setState(nextState, this.persistState);
  }
  persistState(){
    localStorage.setItem(localStorageStateKey, JSON.stringify(this.state));
  }
  actionGoToRoute(nextRoute){
    if(this.state.currentRoute === nextRoute){
      return;
    }
    this.setStateAndPersist({
      currentRoute: nextRoute,
      routesHistory: this.state.routesHistory.concat(this.state.currentRoute)
    });
  }
  actionGoToPreviousRoute(){
    if(this.state.routesHistory.length < 1){
      return;
    }
    var previousRoute = this.state.routesHistory[this.state.routesHistory.length - 1];

    this.setStateAndPersist({
      currentRoute: previousRoute,
      routesHistory: this.state.routesHistory.slice(0, -1)
    });
  }
  actionCreateNote(text){
    this.setStateAndPersist({
      notes: this.state.notes.concat({
        id: ++this.state.notesLastId,
        text: text,
        lastUpdatedOn: new Date().toISOString()
      })
    });
  }
  render() {
    return <this.props.App state={this.state} actions={this.actions} />;
  }
}

export default Store;
